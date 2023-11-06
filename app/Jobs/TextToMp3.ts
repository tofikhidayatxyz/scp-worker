import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'
import { JobContract } from '@ioc:Rocketseat/Bull'
import axios from 'axios'
import * as googleTTS from 'google-tts-api'
import { delay } from 'App/Libraries/utils'
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

export default class TextToMp3 implements JobContract {
  public key = 'TextToMp3'
  public concurrency = 1

  public async handle(job) {
    const { data } = job

    console.log('[TEXT TO MP3] Start', data.uuid, data.page)
    if (!data?.text?.length || data?.text?.length < 10) {
      console.log('[TEXT TO MP3] CANOT PROCESS', {
        uuid: data.uuid,
        text: data.text,
        page: data.page,
      })
      return
    }
    const audioBuff = await this.createAudioBuff(data.text)

    if (audioBuff) {
      await Drive.put(`${data.uuid}/audios/${data.page}.mp3`, audioBuff)
    }

    let type = 'page'
    if (data.page === 'summary') {
      type = 'summary'
    }
    if (data.page === 'description') {
      type = 'description'
    }

    await axios.post(`${Env.get('BACKEND_WEBHOOK_ENDPOINT')}/webhook/audio`, {
      uuid: data.uuid,
      type: type,
      audio_id: data.page,
      format: 'mp3',
    })

    console.log('[TEXT TO MP3] Finish', data.uuid, data.page)
    await delay(500)
  }

  public async onFailed(job, error) {
    console.log('[TEXT TO MP3] FAILED', {
      job,
      error,
    })
  }

  public async createAudioBuff(text: string, slow: boolean = false): Promise<Buffer | null> {
    return new Promise(async (resolve) => {
      let loop = 0
      let max = 100000
      while (true) {
        try {
          const results = await googleTTS.getAllAudioBase64(text, {
            lang: 'en',
            slow: slow || false,
            host: 'https://translate.google.com',
            splitPunct: ',.?;:!',
          })

          let bufferData: any = []

          for (const res of results) {
            bufferData.push(Buffer.from(res.base64 as any, 'base64'))
          }

          const buf = Buffer.concat(bufferData)

          return resolve(buf)
        } catch (e) {
          console.log('TTS ERROR', {
            message: e.message,
          })
          await delay(2000)
        }
        if (loop > max) {
          return resolve(null)
        }
        loop++
      }
    })
  }
}
