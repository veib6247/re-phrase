import { Configuration, OpenAIApi } from 'openai'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) // query.userInput

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration)

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Say this is a test',
    temperature: 0,
    max_tokens: 7,
  })
  // return { input: query.userInput }
  return response.data
})
