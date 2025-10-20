import Drive from '@ioc:Adonis/Core/Drive'
import Bull, { JobContract } from '@ioc:Rocketseat/Bull'
import Gpt from 'App/Libraries/open-ai'
import TextToMp3 from './TextToMp3'

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

export default class PdfDescription implements JobContract {
  public key = 'PdfDescription'

  public async handle(job) {
    const { data } = job

    const gptPrompt = `
    Human:
    Write humanize description for this ${data.type}:
    title : "${data.title}"
    author : "${data.author}"
    category : "${data.category}"
    publisher : "${data.description}"
    description : "${data.description}"
    You must be follow this rules:
    - content with minimum 100  words and max 500 words
    - focus on the content of ${data.type} and prevent halucination
    - Just need text, no need to add image
    - I will render it to audio so you must be careful
    Assistant:
    `

    const gptResponse = await Gpt.ask(gptPrompt, 'gpt-3.5-turbo-16k')

    await Drive.put(`${data.uuid}/texts/description.txt`, gptResponse as string)

    Bull.add(new TextToMp3().key, {
      page: 'description',
      uuid: data.uuid,
      text: gptResponse,
    })

    console.log('[PDF DESCRIPTION] Finish', data.uuid)
  }
}
