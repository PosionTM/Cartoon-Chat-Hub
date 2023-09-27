import React from 'react'
import { useState, useEffect } from 'react'
import ConversationWindow from './components/ConversationWindow'

const App = () => {

    // Chat history fetch, needs to be app level state/api request due to sending 
    // if user sends a msg, how will this know to change? simplier in app level
    const [chatHistory, setChatHistory] = useState([{}])

    useEffect(() => {
        const getChatHistory = async () =>{
            const serverChatHistory = await fetchChatHistory()
            setChatHistory(serverChatHistory)
        }
        getChatHistory()
    }, [])

    // Retrieves chat history from server
    const fetchChatHistory = async () => {
        const response = await fetch('http://localhost:5000/api/chat-history')
        const data = await response.json()
        console.log("Successfully retrieved data: ", data) // Logging for testing purposes
        return data
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
            <div className='input_window'>Input Window</div>
        </div>
    )
}

export default App
