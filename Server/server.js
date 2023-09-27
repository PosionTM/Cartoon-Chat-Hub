import express from 'express'
import path from 'path'
import OpenAI from 'openai'
import dotenv from 'dotenv'
const app = express()
dotenv.config()



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}) // key required for API requests

let userMsg = 'Whats the main ingredient of pizza?' // message that sends to ChatGPT for testing

// Sending chat to chatGPT and console logging result
async function main() {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'user', content: userMsg
            }
        ]
    })

    console.log(chatCompletion.choices[0].message.content)
}

main(); // call function to actually send the API request

const PORT = process.env.PORT || 5000 // start server on assigned port OR port 5000

app.use(express.json()) // enable handling of raw JSON
app.use(express.urlencoded({ extended: false })) // Handle URL encoded data

// Starting up server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


/* Idea of storing history
userInput = "Whatever the user enters from the front-end"
completionText = chatCompletion.choices[0].message.content
chatHistory = []

const messages = chatHistory.map(([role, content]) =>({role, content}))
messages.push(['user', userInput ]) // save msg from user
messages.push(['assistant', completionText ]) // save msg from chatGPT
// now replace content within the API call with the messages variable and it'll act like normal ChatGPT
*/
// constructing messages based on history



/* Example of conversation from ChatGPT
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}],
  });
*/



