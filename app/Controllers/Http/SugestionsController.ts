import Env from '@ioc:Adonis/Core/Env'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gpt from 'App/Libraries/open-ai'
import axios from 'axios'

const promptsTrains = [
  {
    prompts: [
      'find best book for me',
      'find best book',
      'find book',
      'find book thatrelevan to electronic',
      'find electronic book',
    ],
    description: 'Find  book or category',
    steps: [
      {
        comand: 'redirect',
        options: {
          path: '/git-for-beginer',
          queryText: 'Git for beginer',
        },
      },
      {
        command: 'find_book',
        options: {
          search: 'Git for beginer',
        },
      },
    ],
  },
  {
    prompts: [
      'Who is author of this book',
      'When this book published',
      'What is the title of this book',
      'How much bok of this page',
      'How much category of this page',
    ],
    description: 'General question about book or application',
    steps: [
      {
        command: 'general_question',
        options: {
          question: 'How much book of this page',
        },
      },
    ],
  },
]

const responseFormat = {
  steps: [
    {
      command: 'comand name',
      options: {
        search: 'keyword for search if needed',
        page: 'page of book detail if needed',
        sugestion: 'sugestion text needed',
        slug: 'slug of book detail if needed',
      },
    },
    {
      comand: 'frontend_event',
      options: {
        event: 'event id',
      },
    },
  ],
}

export default class SugestionsController {
  public async sugest({ request, response }: HttpContextContract) {
    const bookData = await axios.get(`${Env.get('BACKEND_API_ENDPOINT')}/api/v1/books`)
    // const categories = await axios.get(`${Env.get('BACKEND_API_ENDPOINT')}/api/v1/categories`)

    const finalBooksData = bookData.data?.data.map((book) => ({
      title: book.title,
      publisher: book.publisher,
      path: `/books/${book.slug}`,
      queryText: book.title,
      category: book.category_name,
    }))

    const voiceText = request.input('speech', '')
    const frontendEvents = request.input('events', [])

    // - Also you willbe able to create sugestion text for user, for example : "Do you mean Git for beginer ?"
    // - You can only return single command
    //     CATEGORY LIST: ${JSON.stringify(finalCategory)}
    const prompts = `
    Human:
    Based on the following prompts, write a command that will be executed by the application.
    You must be follow this rules
    - The command must be in the following trained comand PROMPT TRAINS Otherwise it will be ignored
    - Response must be follow this json ${JSON.stringify(responseFormat)}
    - Response MUST BE in JSON format only, I want to use JSON.parse for this
    - You can change  the USER COMAND prompt because it willbe have a lot of typo, for example : Facebook must be Book ETC, can be relevan to BOOK LIST
    - You can ignore find_book comand when you found book from book list
    - Make frontend event as priority PROMPT TRAINS list
    - Also You can make it general question about book or application
    - If you can't find result that relevant to USER COMAND, BOOKLIST, PROMPT TRAINS OR FRONTEND EVENT, you can skip it by type "skip"
    - If you found book same as USER COMAND or same context from BOOK LIST you must be return redirect
    - You can make sugestion based context for frontend_event that related to FRONTEND EVENT list
    - If you want to use redirect comand you must be makesure the books is exist
    - If you can't find book from book list you can return as find_book comand
    - redirect comand is only for available book in BOOK LIST unless you can use find_book instead
    - Priority 
        - FRONTEND EVENTS
        - BOOK LIST
        - PROMPT TRAINS

    PROMPT TRAINS: ${JSON.stringify(promptsTrains)}
    BOOK LIST: ${JSON.stringify(finalBooksData)}
    USER COMAND: "${voiceText}"
    FRONTEND EVENTS: ${JSON.stringify(frontendEvents)}
    Asisstant:
    `

    const responseInJson: string = await Gpt.ask(prompts)

    try {
      const responseInObject = JSON.parse(responseInJson || '')
      if (responseInObject === 'skip') {
        return response.json({
          action: 'skip',
        })
      }
      return response.json({
        action: 'sugest',
        data: responseInObject,
      })
    } catch (_e) {
      return response.json({
        action: 'skip',
      })
    }
  }

  public async describe({ request, response }: HttpContextContract) {
    const prompts = `
    Human:
    Based on this json ${JSON.stringify(request.all())}
    Please describe about the web page
    You must be follow this rules
    - Must be clear
    - Must be short
    - Must be readable
    - Must be very humanize not like machine
    - Example:
        - "This page has a lot of book that relevant to your search "
        - "Im so sorry we can't find book that relevant to your search"
    Asisstant:
    `
    const gptResponse: string = await Gpt.ask(prompts)

    return response.json({
      action: 'describe',
      data: gptResponse,
    })
  }

  public async question({ request, response }: HttpContextContract) {
    const data = request.input('data', {})
    const question = request.input('question', '')

    const prompts = `
    Human:
    Please answer the question "${question}" based on this data
    ${JSON.stringify(data)}
    If you can't answer the question, you can skip it by type "skip"
    `
    const gptResponse: string = await Gpt.ask(prompts)

    return response.json({
      action: 'question',
      data: gptResponse,
    })
  }
}
