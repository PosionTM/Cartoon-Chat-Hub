import React from 'react'
import { useState, useEffect } from 'react'
import ConversationWindow from './components/ConversationWindow'
import InputWindow from './components/InputWindow'
import PeopleWindow from './components/PeopleWindow'

const App = () => {

    
    const [chatHistory, setChatHistory] = useState([{}])
    // load chat history from backend server upon page load
    useEffect(() => {
        getChatHistory()
    }, [])

    const getChatHistory = async () =>{
        const serverChatHistory = await fetchChatHistory()
        setChatHistory(serverChatHistory)
        console.log(`Successfully fetched data from useEffect: ${chatHistory}`) // Debugging
    }

    // Retrieves chat history from server
    const fetchChatHistory = async () => {
        let chatAddress;
        console.log(selectedToon)
        switch(selectedToon) {
            case 10: 
                chatAddress = 'http://localhost:5000/api/chat-history/spongebob-chat'
                break
            case 20: 
                chatAddress = 'http://localhost:5000/api/chat-history/eeyore-chat'
                break
            case 30: 
                chatAddress = 'http://localhost:5000/api/chat-history/noname-chat'
                break
                
        }
        const response = await fetch(chatAddress)
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

    let userText = '' // Placeholder for user input, used for InputWindow Component

    // Sends user text to backend server, waits for response from chatGPT API
    const sendUserText = async (userTextSubmitted) => {
        let userJsonText = {'role': 'user', 'content': userTextSubmitted}
        console.log(`userJsonText = ${JSON.stringify(userJsonText)}`) // Log for DEBUGGING
        setChatHistory(chatHistory => [...chatHistory, userJsonText])
        console.log(`Chat History with user msg added in sendUserText: ${JSON.stringify(chatHistory)}`) // Log for DEBUGGING

        let updateAddress;
        switch(selectedToon) {
            case 10: 
                updateAddress = 'http://localhost:5000/api/chat-history/update/spongebob-chat'
                break
            case 20: 
                updateAddress = 'http://localhost:5000/api/chat-history/update/eeyore-chat'
                break
            case 30: 
                updateAddress = 'http://localhost:5000/api/chat-history/update/noname-chat'
                break
                
        }

        const response = await fetch(updateAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userJsonText)

        })
        const toonResponse = await response.json()
        setChatHistory(toonResponse)

    }

    // People Window Code
    const [selectedToon, setSeletedToon] = useState(30)
    
    const selectToon = (toon_id) => {
        console.log("clicked a div in ppl window!") // Log for DEBUGGING
        let toonID = parseInt(toon_id)
        setSeletedToon(toonID)
        getChatHistory()
        
    }


    // Rendering entire app
    return (
        <div className='container'>
            <div className='header'>
                <div className='burger_icon'>|||</div>
                <div className='sub_header'>
                    <div id='main_title'>Cartoon Chat Hub</div>
                </div>
            </div>
            < PeopleWindow selectToon={ selectToon } selectedToon={ selectedToon }/>
            < ConversationWindow chatHistory={ chatHistory } selectedToon={ selectedToon }/>
            < InputWindow userText={ userText } sendUserText={ sendUserText }/>
        </div>
    )
}

export default App
