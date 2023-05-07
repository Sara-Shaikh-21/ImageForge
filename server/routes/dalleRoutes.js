import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()
const router = express.Router()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
router.route('/').get((req, res) => {
  res.send('Hello from Dall-E!')
})
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    const image = aiResponse.data.data[0].b64_json
    console.log('sent')
    res.status(200).json({ photo: image })
    //res.send(prompt)
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }

    res.status(500).send(error?.response.data.error.message)
  }
})

export default router
