import Env from '@ioc:Adonis/Core/Env'
import OpenAI from 'openai'

export default class Gpt {
  public static async ask(question: string, model: string = 'gpt-4'): Promise<string> {
    const openai = new OpenAI({
      apiKey: Env.get('OPEN_AI_TOKEN'),
    })

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: question }],
      model: model,
    })

    return completion.choices[0].message?.content as string
  }
}
