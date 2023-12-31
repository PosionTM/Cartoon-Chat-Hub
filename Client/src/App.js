import React from 'react'
import { useState, useEffect } from 'react'
import ConversationWindow from './components/ConversationWindow'
import InputWindow from './components/InputWindow'
import PeopleWindow from './components/PeopleWindow'

const App = () => {

    
    const [chatHistory, setChatHistory] = useState([{}])
    // load chat history from backend server upon page load
    useEffect(() => {
        const fetchData = async () => {
        await getChatHistory() 
    }
    fetchData()
    }, [selectedToon])



    // Retrieves chat history from server
    const fetchChatHistory = async () => {
        let chatAddress;
        console.log("from fetchChatHistory: ", selectedToon)
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
        return data
    }

    const getChatHistory = async () =>{
        const serverChatHistory = await fetchChatHistory()
        setChatHistory(serverChatHistory)
    }



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

    // People Window Code, selecting a toon from the people panel will execute the code below
    const [selectedToon, setSeletedToon] = useState(30)
    
    const selectToon = (toon_id) => {
        console.log("clicked a div in ppl window!") // Log for DEBUGGING
        let toonIDInt = parseInt(toon_id)
        setSeletedToon(toonIDInt)
        getChatHistory()
        console.log("At the end of selectToon function: ", selectedToon) // Debugging purpose
        
    }

    // Delete Chat History Button Function
    const deleteHistory = async () => {
        console.log("delete chat button function activated")

        // selecting chat to delete
        let updateAddress;
        switch(selectedToon) {
            case 10: 
                updateAddress = 'http://localhost:5000/api/chat-history/delete/spongebob-chat'
                break
            case 20: 
                updateAddress = 'http://localhost:5000/api/chat-history/delete/eeyore-chat'
                break
            case 30: 
                updateAddress = 'http://localhost:5000/api/chat-history/delete/noname-chat'
                break
                
        }

        const response = await fetch(updateAddress, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const newChat = await response.json()
        setChatHistory(newChat)

    }


    // Rendering entire app
    return (
        <div className='container'>
            <div className='header'>
                <div className='burger_icon'>|||</div>
                <div className='sub_header'>
                    <div id='main_title'>Cartoon Chat Hub </div>

                    <div className='deleteButtonContainer'> 
                    <button className="deleteButton" onClick={deleteHistory}>Delete Chat</button>
                    </div>

                </div>
            </div>
            < PeopleWindow selectToon={ selectToon } selectedToon={ selectedToon }/>
            < ConversationWindow chatHistory={ chatHistory } selectedToon={ selectedToon }/>
            < InputWindow userText={ userText } sendUserText={ sendUserText }/>
        </div>
    )
}

export default App
