import Env from '@ioc:Adonis/Core/Env'
import puppeteer from 'puppeteer'
import { delay } from './Utilities'

export default class Pdf {
  public static async renderPlainPdf(
    html: string,
    delayMs: number = 0,
    waitElement: string | null = null
  ): Promise<Buffer> {
    return new Promise(async (resolve) => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disabled-setupid-sandbox'],
        executablePath: Env.get('CHROMIUM_PATH'),
      })
      const page = await browser.newPage()

      await page.setContent(html, {
        waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
      })

      if (delayMs) {
        console.log('Wait by delay')
        await delay(delayMs)
        console.log('Wait by delay done')
      }

      if (waitElement) {
        await page.waitForSelector(waitElement)
      }

      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

      await page.close()
      await browser.close()

      resolve(pdfBuffer)
    })
  }
}