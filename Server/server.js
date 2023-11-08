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
const chatHistoryNoName = [
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
]

const chatHistorySpongebob = [
    {"role": "user", "content": "Hey, who are you?"},
    {"role": "assistant", "content": "Spongebob Laywerpants!"},
    {"role": "user", "content": "Really? Who's your best friend then?"},
    {"role": "assistant", "content": "Ahoy! Well that's an easy one captain! It's Patrick Star!"},
]

const chatHistoryEeyore = [
    {"role": "user", "content": "Where does the name Eeyore come from?"},
    {"role": "assistant", "content": "My mother, but it sounds like she didn't try"},
    {"role": "user", "content": "Wow that sounds mean!"},
    {"role": "assistant", "content": "I'm sorry, I'm a little sad today. I'm hoping to be happier."},
]



app.get('/api/chat-history/noname-chat', (req, res) => {
    res.json(chatHistoryNoName)
    console.log('fetched noname chat')
})

app.get('/api/chat-history/spongebob-chat', (req, res) => {
    res.json(chatHistorySpongebob)
    console.log('fetched spongebob chat')
})

app.get('/api/chat-history/eeyore-chat', (req, res) => {
    res.json(chatHistoryEeyore)
    console.log('fetched eeyore chat')
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
app.post('/api/chat-history/update/noname-chat', async (req, res) => {
    // console.log(`Chat history PRIOR to update in server: ${JSON.stringify(chatHistory)}`) // DEBUG STUFF
    const usermsg = req.body //req test
    // console.log(`\nreq.body log: ${JSON.stringify(req.body)}`) // DEBUG STUFF
    chatHistoryNoName.push(usermsg)
    await generateChatResponse(chatHistoryNoName)
    // console.log(`\nNew chat history with server: ${JSON.stringify(chatHistory)}\n`) // DEBUG STUFF
    res.json(chatHistoryNoName)
})

app.post('/api/chat-history/update/spongebob-chat', async (req, res) => {
    const usermsg = req.body
    chatHistorySpongebob.push(usermsg)
    await generateChatResponse(chatHistorySpongebob)
    res.json(chatHistorySpongebob)
})

app.post('/api/chat-history/update/eeyore-chat', async (req, res) => {
    const usermsg = req.body
    chatHistoryEeyore.push(usermsg)
    await generateChatResponse(chatHistoryEeyore)
    res.json(chatHistoryEeyore)
})


// CHAT GPT API STUFF
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}) // key required for API requests

let userMsg = 'Whats the main ingredient of pizza?' // message that sends to ChatGPT for testing

// Sending chat to chatGPT and console logging result
// COMMENTING OUT THIS TO SAVE ON TOKENS FOR NOW
async function generateChatResponse(chatConversation) {
    const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatConversation
    })


    console.log(chatCompletion.choices[0].message.content) // DEBUG PURPOSES
    chatConversation.push(chatCompletion.choices[0].message)

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



