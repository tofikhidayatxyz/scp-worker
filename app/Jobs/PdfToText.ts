import Bull, { JobContract } from '@ioc:Rocketseat/Bull'
import Drive from '@ioc:Adonis/Core/Drive'
import { splitPDF } from 'pdf-toolz/SplitCombine'
import pdfParse from 'pdf-parse'
import TextCleaner from 'text-cleaner'
import textRank from 'textrank'
import TextSummaryzation from './TextSummaryzation'
import TextToMp3 from './TextToMp3'
import PdfDescription from './PdfDescription'

/*
|--------------------------------------------------------------------------
| Job setup
|--------------------------------------------------------------------------
|
| This is the basic setup for creating a job, but you can override
| some settings.
|
| You can get more details by looking at the bullmq documentation.
| https://docs.bullmq.io/
*/

const MINIMUM_WORD_PER_LINE = 5
const MINIMUM_CHAR_PER_WORD_COUNT = 3
const MINIMUM_WORD_PER_PAGE = 10

export default class PdfToText implements JobContract {
  public key = 'PdfToText'

  public async handle(job) {
    const { data } = job

    console.log('[PDF TO TEXT] Start', data.uuid)

    const uuid = data.uuid

    const file = await await Drive.get(`${uuid}/book.pdf`)

    const pages = await splitPDF(file)

    let loop = 1
    // let fullPdf = ''

    const pagePassed: number[] = []

    let pagesSum: any[] = []
    let hasFirstPage = false

    Bull.add(new PdfDescription().key, {
      uuid: uuid,
      title: data.title,
      author: data.author,
      category: data.category,
      publisher: data.publisher,
      type: data.type,
      human_summary: data.human_summary,
      description: data.description,
    })

    for (const page of pages) {
      // if (loop > 10) {
      //   break
      // }
      try {
        const pdfContent = await pdfParse(page)

        const pdfClean = pdfContent.text
          .split('\n')
          .map((psub) => {
            const lines = psub.split(' ').filter((c) => {
              c = c.replace(/\d+/g, '')
              c = c.replaceAll('  ', ' ')
              if (c.length >= MINIMUM_CHAR_PER_WORD_COUNT) {
                return true
              }
              return false
            })

            if (lines.length < MINIMUM_WORD_PER_LINE) return null
            let inlineText = lines.join(' ')
            inlineText = inlineText.replace(/\s+/g, ' ')
            inlineText = inlineText.replaceAll('\n', ' ')
            inlineText = inlineText.replaceAll('\t', ' ')
            inlineText = inlineText.replaceAll('\r', ' ')
            inlineText = inlineText.replaceAll('  ', ' ')
            inlineText = inlineText.replace(/[^\x00-\x7F]/g, '')
            inlineText = TextCleaner(inlineText).stripHtml().condense().trim().valueOf()

            return inlineText
          })
          .filter(Boolean)
          .join(' ')

        // if (loop >= 2 && loop <= 100) {
        //   fullPdf += '\n' + pdfClean
        // }

        console.log('Processing -> ', loop, pdfClean.length)

        if (pdfClean.length >= MINIMUM_WORD_PER_PAGE) {
          await Drive.put(`${uuid}/texts/${loop}.txt`, pdfClean)
          pagePassed.push(loop)

          if (hasFirstPage === false) {
            hasFirstPage = true
          }

          Bull.add(new TextToMp3().key, {
            page: loop,
            uuid: uuid,
            text: pdfClean,
          })

          if (loop < 5) {
            pagesSum.push({
              page: loop,
              text: await this.getSummary(pdfClean),
            })
          }
          // Center of page
          if (
            loop > 5 &&
            loop < pages.length - 5 &&
            loop > Math.floor(pages.length) / 2 - 2 &&
            loop < Math.ceil(pages.length) / 2 + 2
          ) {
            pagesSum.push({
              page: loop,
              text: await this.getSummary(pdfClean),
            })
          }

          if (pages.length > 5 && loop < pages.length - 5) {
            pagesSum.push({
              page: loop,
              text: await this.getSummary(pdfClean),
            })
          }

          loop++
        }
      } catch (e) {
        // console.log(e)
      }
    }
    console.log('[PDF TO TEXT] Done', uuid, loop)

    const uniqByPage = pagesSum.filter((v, i, a) => a.findIndex((t) => t.page === v.page) === i)

    Bull.add(new TextSummaryzation().key, {
      uuid: uuid,
      content: uniqByPage,
      title: data.title,
      author: data.author,
      category: data.category,
      human_summary: data.human_summary,
      publisher: data.publisher,
      description: data.description,
    })
  }

  private async getSummary(text: string) {
    if (!text) return ''

    const summarizer = new textRank.TextRank(text)
    return summarizer?.summarizedArticle || ''
  }

  public async onFailed(args: any) {
    console.warn(args.stacktrace[0])
  }
}
