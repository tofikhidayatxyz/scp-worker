import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'
import Bull, { JobContract } from '@ioc:Rocketseat/Bull'
// import conversion from 'phantom-html-to-pdf'
import Gpt from 'App/Libraries/open-ai'
import axios from 'axios'
import { getEncoding } from 'js-tiktoken'
import _ from 'lodash'
import TextToMp3 from './TextToMp3'
// import htmlToPdf from 'html-pdf'
import View from '@ioc:Adonis/Core/View'
// import fs from 'node:fs'
import Pdf from 'App/Helper/Pdf'

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

export default class TextSummaryzation implements JobContract {
  public key = 'TextSummaryzation'

  public async handle(job) {
    const { data } = job

    console.log('[TEXT SUMMARIXATION] TextSummaryzation starting ...')

    const maxToken = 15500

    const textData = _.chunk(
      data.content
        .filter((r) => r?.text?.length)
        .map((r) => r.text)
        .join(' ')
        .split(' '),
      100
    ).map((r) => r.join(' '))

    let chunks: string[] = []

    // let loop = 0

    for (let text of textData) {
      // console.log(`Process ${loop} -> ${textData.length}`)
      let latestIndex = chunks?.length - 1 || 0
      latestIndex = latestIndex < 0 ? 0 : latestIndex
      const latestIndexToken = this.countToken(chunks[latestIndex] || '')
      if (latestIndexToken > maxToken) {
        chunks.push(text)
      } else {
        chunks[latestIndex] += ` ${text}`
      }
      // loop++
    }

    const gptPrompt = `
    Human:
    Make synopsis and summarization for this ${data.type}
    title : "${data.title}"
    author : "${data.author}"
    category : "${data.category}"
    publisher : "${data.publisher}"
    description : "${data.description}"
    You must be follow this rules:
    - content with minimum 1500 words
    - focus on the content of ${data.type} and prevent halucination
    - don't copy paste from other source
    - Write in <article> format in html
    - don't use <h1> to <h3> tag
    - don't use <img> tag
    - I will render it to pdf and audio so you must be careful
    - Should be not included author name, publisher name, and category name
    - Should be not included any link

    ${chunks[0]}
    Assistant:
    `

    console.log('[TEXT SUMMARIXATION] Summaryzation start')
    const gptResponse = await Gpt.ask(gptPrompt, 'gpt-3.5-turbo-16k')
    console.log('[TEXT SUMMARIXATION] Summaryzation done')

    await Drive.put(`${data.uuid}/texts/summary.txt`, gptResponse)

    Bull.add(new TextToMp3().key, {
      page: 'summary',
      uuid: data.uuid,
      text: gptResponse,
    })

    // Rouge test
    console.log('[TEXT SUMMARIXATION] Rouge test start')
    const rougeResponse = await axios.post(`http://194.233.70.165:8000/rouge`, {
      hypotesis: gptResponse,
      reference: data.human_summary,
    })
    console.log('[TEXT SUMMARIXATION] Rouge test done')

    // Send summary to backend
    await axios.post(`${Env.get('BACKEND_WEBHOOK_ENDPOINT')}/webhook/summary`, {
      uuid: data.uuid,
      summary: gptResponse,
      rouge: rougeResponse.data,
    })

    // 
    console.log('[TEXT SUMMARIXATION] Render summary to pdf')
    const pdfBuffer = await this.renderSummaryPdf(data.uuid, data.title, gptResponse)
    Drive.put(`${data.uuid}/summary.pdf`, pdfBuffer as Buffer)

    console.log('[TEXT SUMMARIXATION]  Summaryzation finish')
  }

  public countToken(text: string) {
    if (text?.length === 0) return 0
    const enc = getEncoding('gpt2')
    return enc.encode(text)?.length
  }

  public async onFailed(args: any) {
    console.warn(args.stacktrace[0])
  }

  public async renderSummaryPdf(_uuid: string, title: string, content: string) {
    return new Promise(async (resolve) => {
      const htmlData = await View.render('book-summary', { title, content })
      const pdfBuff = await Pdf.renderPlainPdf(htmlData, 500)
      resolve(pdfBuff)

      // console.log(htmlData.length)
      // conversion({ html: htmlData }, async (_err, pdf) => {
      //   let output = fs.createWriteStream(`./tmp/${uuid}.pdf`)
      //   console.log(pdf.logs, _err);
      //   console.log(pdf.numberOfPages);
      //   pdf.stream.pipe(output);
      //   const fileBuf = await fs.readFileSync(`./tmp/${uuid}.pdf`)
      //   resolve(fileBuf)
      // });
    })
  }
}
