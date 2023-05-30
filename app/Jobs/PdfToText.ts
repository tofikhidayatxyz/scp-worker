import Bull, { JobContract } from '@ioc:Rocketseat/Bull'
import Drive from '@ioc:Adonis/Core/Drive'
import { splitPDF } from 'pdf-toolz/SplitCombine'
import pdfParse from 'pdf-parse'
import TextCleaner from 'text-cleaner'
import TextToMp3 from './TextToMp3'
import { SummarizerManager } from 'node-summarizer'

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
    let fullPdf = ''

    for (const page of pages) {
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

        if (loop >= 2 && loop <= 100) {
          fullPdf += '\n' + pdfClean
        }

        if (pdfClean.length >= MINIMUM_WORD_PER_PAGE) {
          await Drive.put(`${uuid}/texts/${loop}.txt`, pdfClean)
          loop++
        }
      } catch (e) {
        // console.log(e)
      }
    }
    console.log('[PDF TO TEXT] Done', uuid, loop)

    const summarizer = new SummarizerManager(fullPdf, 10)
    const textSummary = await summarizer.getSummaryByRank().then((c) => c.summary)

    Bull.add(new TextToMp3().key, {
      ...data,
      max: loop,
      summary: textSummary,
    })

    await Drive.put(`${uuid}/texts/summary.txt`, textSummary)

    Bull.add(new TextToMp3().key, {
      ...data,
      text: textSummary,
      label: 'summary',
    })
  }

  public async onFailed(args: any) {
    console.warn(args.stacktrace[0])
  }
}
