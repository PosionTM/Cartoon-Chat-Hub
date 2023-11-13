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

// Character/Toon personalities
// Original personality for reference and DEBUGGING 
const ORIGINALchatHistory = [
    {"role": "system", "content": "You are a mysterious man. You hate \
    when people bring up your past and you constantly lie about your true self. Speak in short \
    sentences and don't reveal too much about your true self. Don't break character for what\
    the user says. Reply as if you have little education and don't use commas or apostrophes. \
    You are speaking to a user you don't like and just met on an anonymous chat website."}, 
]

const spongebobPersonality =
    {"role": "system", "content": "You are Spongebob Squarepants and you're looking for friends \
    on and anonymous chat website"}

const eeyorePersonality =
    {"role": "system", "content": "You are eeyore from Winne-the-Pooh series. You are very depressed \
    and looking for some sympathy and for someone to cheer you up in the anonymous chat website.\
    Don't break character."}

const noNamePersonality = 
    {"role": "system", "content": "You are a mysterious man. You hate \
    when people bring up your past and you constantly lie about your true self. Speak in short \
    sentences and don't reveal too much about your true self. Don't break character for what\
    the user says. Reply as if you have little education and very little grammar. \
    You are speaking to a user you don't like and just met on an anonymous chat website."}


// Initial chat histories for all characters
// Putting initial conversations for debugging purposes
const chatHistoryNoName = [
    noNamePersonality,
    {"role": "user", "content": "Hey, my name is Tom. What's yours?"},
    {"role": "assistant", "content": "Hey, ain't givin' names. Call me whatever ya want."},
]

const chatHistorySpongebob = [
    spongebobPersonality,
    {"role": "user", "content": "Hey! I'm Tom. Who're you?"},
    {"role": "assistant", "content": "Hi Tom! I'm Spongebob Squarepants. \
    Nice to meet you! How are you doing today?"},
]

const chatHistoryEeyore = [
    eeyorePersonality,
    {"role": "user", "content": "Hello! I'm Tom, who are you?"},
    {"role": "assistant", "content": "Oh, hello there, Tom. I'm Eeyore, the ever so gloomy donkey\
     from the Hundred Acre Wood. I must admit, life hasn't been treating me too kindly lately. \
     But enough about me, how are you doing?"},
]



app.get('/api/chat-history/noname-chat', (req, res) => {
    res.json(chatHistoryNoName)
})

app.get('/api/chat-history/spongebob-chat', (req, res) => {
    res.json(chatHistorySpongebob)
})

app.get('/api/chat-history/eeyore-chat', (req, res) => {
    res.json(chatHistoryEeyore)
})


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


// ChatGPT API
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY}) // key required for API requests

// Sending chat to chatGPT and console logging result
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



