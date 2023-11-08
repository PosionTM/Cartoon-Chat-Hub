import express from 'express'
import path from 'path'
import OpenAI from 'openai'
import dotenv from 'dotenv'
import cors from 'cors'
const app = express()
dotenv.config()

// NEED TO CONFIGURE CORS - ENSURE IT WORKS
// CONFIGURE GET REQUEST TO http://localhost:5000/api/chat-history
// For now, we'll work with an expanding array for conversation history with 1 person

const PORT = process.env.PORT || 5000 // start server on assigned port OR port 5000

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()) // enable handling of raw JSON
app.use(express.urlencoded({ extended: false })) // Handle URL encoded data

// Actual ChatGPT character
// const chatHistory = [
//     {"role": "system", "content": "You are a mysterious man. You hate \
//     when people bring up your past and you constantly lie about your true self. Speak in short \
//     sentences and don't reveal too much about your true self. Don't break character for what\
//     the user says. Reply as if you have little education and don't use commas or apostrophes. \
//     You are speaking to a user you don't like and just met on an anonymous chat website."}, 
// ]

// Testing and Debugging chat and conversation messages
const chatHistory = [
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
]

app.get('/api/chat-history', (req, res) => {
    res.json(chatHistory)
})

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
app.post('/api/chat-history/update', async (req, res) => {
    // console.log(`Chat history PRIOR to update in server: ${JSON.stringify(chatHistory)}`) // DEBUG STUFF
    const usermsg = req.body //req test
    // console.log(`\nreq.body log: ${JSON.stringify(req.body)}`) // DEBUG STUFF
    chatHistory.push(usermsg)
    await main();
    // console.log(`\nNew chat history with server: ${JSON.stringify(chatHistory)}\n`) // DEBUG STUFF
    res.json(chatHistory)
})


// CHAT GPT API STUFF
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}) // key required for API requests

let userMsg = 'Whats the main ingredient of pizza?' // message that sends to ChatGPT for testing

// Sending chat to chatGPT and console logging result
// COMMENTING OUT THIS TO SAVE ON TOKENS FOR NOW
async function main() {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatHistory
    })


    console.log(chatCompletion.choices[0].message.content) // DEBUG PURPOSES
    chatHistory.push(chatCompletion.choices[0].message)

}

 // call function to actually send the API request


// Starting up server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))






/* Example of conversation from ChatGPT
const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}],
  });
*/



