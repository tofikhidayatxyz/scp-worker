import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bull from '@ioc:Rocketseat/Bull'
import PdfToText from 'App/Jobs/PdfToText'

export default class DispatchPdfsController {
  public async dispatch({ request }: HttpContextContract) {
    Bull.add(new PdfToText().key, request.all())

    return {
      message: 'Job added to queue',
    }
  }
}
