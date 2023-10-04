import React from 'react'
import { useState, useEffect } from 'react'
import ConversationWindow from './components/ConversationWindow'
import InputWindow from './components/InputWindow'

const App = () => {

    // Chat history fetch, needs to be app level state/api request due to sending 
    // if user sends a msg, how will this know to change? simplier in app level
    const [chatHistory, setChatHistory] = useState([{}])

    useEffect(() => {
        const getChatHistory = async () =>{
            const serverChatHistory = await fetchChatHistory()
            setChatHistory(serverChatHistory)
            console.log(`Successfully fetched data from useEffect: ${chatHistory}`)
        }
        getChatHistory()
    }, [])

    // Retrieves chat history from server
    const fetchChatHistory = async () => {
        const response = await fetch('http://localhost:5000/api/chat-history')
        const data = await response.json()
        console.log("Successfully retrieved fetch data: ", data) // Logging for testing purposes
        return data
    }

    // Functions and states for User text submission
    /* 
    Plan for user submission:
    FE: Upon button click, take user text from text area and update UI immediately 
    FE: Send post request to backend server to update ChatHistory

    BE: Backend server receives post (update) request, append user message to conversation history
    BE: Send chatGPT API the new conversation and await response
    BE: Backend server replies with updated chat history

    FE: Update chat history with the response from the server 
    */

    let userText = ''

    const sendUserText = async (userTextSubmitted) => {
        let userJsonText = {'role': 'user', 'content': userTextSubmitted}
        console.log(`userJsonText = ${JSON.stringify(userJsonText)}`)
        setChatHistory(chatHistory => [...chatHistory, userJsonText])
        console.log(`Chat History with user msg added in sendUserText: ${JSON.stringify(chatHistory)}`)
        // const jsonCharHistory = chatHistory.

        const response = await fetch('http://localhost:5000/api/chat-history/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userJsonText)

        })
        // .then(response => {
        //     if (!response.ok) {
        //         throw new Error('error with server response')
        //     }
        // })
        // .catch(error => {
        //     console.log('error: ', error)
        // })
        const toonResponse = await response.json()
        console.log(`Toon response: ${JSON.stringify(toonResponse)}`)
        setChatHistory(toonResponse)

    }





    return (
        <div className='container'>
            <div className='header'>
                <div className='burger_icon'>|||</div>
                <div className='sub_header'>
                    <div id='main_title'>Cartoon Chat Hub</div>
                </div>
            </div>
            <div className='people_window'> People Window </div>
            < ConversationWindow chatHistory={ chatHistory }/>
            < InputWindow userText={ userText } sendUserText={ sendUserText }/>
        </div>
    )
}

export default App
