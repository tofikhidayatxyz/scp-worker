import Env from '@ioc:Adonis/Core/Env'
import Drive from '@ioc:Adonis/Core/Drive'
import { JobContract } from '@ioc:Rocketseat/Bull'
import axios from 'axios'
import * as googleTTS from 'google-tts-api'

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

  public async handle(job) {
    const { data } = job

    console.log('[TEXT TO MP3] Start', data.uuid)

    if (data.text && data.label) {
      try {
        const results = await googleTTS.getAllAudioBase64(data.text, {
          lang: data?.lang || 'en',
          slow: data?.slow || false,
          host: 'https://translate.google.com',
          splitPunct: ',.?;:!',
        })

        let bufferData: any = []

        for (const res of results) {
          bufferData.push(Buffer.from(res.base64 as any, 'base64'))
        }

        const buf = Buffer.concat(bufferData)

        await Drive.put(`${data.uuid}/audios/${data.label}.mp3`, buf)
      } catch (e) {}
    } else {
      for (let i = 1; i <= data.max; i++) {
        try {
          console.log('[TEXT TO MP3] sub', i)
          const textFile = await Drive.get(`${data.uuid}/texts/${i}.txt`)

          const results = await googleTTS.getAllAudioBase64(textFile.toString(), {
            lang: data?.lang || 'en',
            slow: data?.slow || false,
            host: 'https://translate.google.com',
            splitPunct: ',.?;:!',
          })

          let bufferData: any = []

          for (const res of results) {
            bufferData.push(Buffer.from(res.base64 as any, 'base64'))
          }

          const buf = Buffer.concat(bufferData)

          await Drive.put(`${data.uuid}/audios/${i}.mp3`, buf)
          console.log('[TEXT TO MP3] done', i)
        } catch (e) {}
      }
      try {
        await axios.post(Env.get('BACKEND_WEBHOOK_ENDPOINT'), {
          uid: data.uuid,
          summary: data.summary,
          maxAudio: data.max,
          format: 'mp3',
        })
      } catch (e) {
        console.log(e)
      }
    }
    console.log('[TEXT TO MP3] done', data.uuid)
    // Do somethign with you job data
  }
}
