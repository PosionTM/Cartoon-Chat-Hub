import React from 'react'
import { useEffect, useRef } from 'react'

const ConversationWindow = ({ selectedToon, chatHistory }) => {


    // Scroll down when new message appears
    const lastMsg = useRef(null)
    const scrollDown = () => {
        lastMsg.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollDown()
    }, [chatHistory])

    // Selecting toon icon based on selected toon
    let toonIcon = "/images/hooded_figure_art.png"; // default icon is NoName toon Icon

    if (selectedToon == 10) {toonIcon = "/images/spongebob_portrait.png"}
    else if (selectedToon == 20) {toonIcon = "/images/eeyore_portrait2.png"}
    else {toonIcon = "/images/hooded_figure_art.png"} // default icon is NoName toon Icon

    // user icon
    let userIcon = "/images/default_user.png" // default user icon


    // Chat rendering
    if (chatHistory == null) {
        return (
            <div className='conversationSpace'>
                Conversation Window loading...
            </div>
        )
    }
    
    return (
        <div className='conversationSpace'>
        <div className='chatWindow'>
        <div className='chatContainer'>
            {chatHistory.map((history, index) => {
                 if (history.role == "assistant") {
                    return (
                        <div className='assistantMessage' key={index}>
                        {history.content} 
                        <img src={toonIcon} alt="user iocn" className="person_icon"/> 
                        </div >
                        
                    )
                    

                 } else if (history.role == "user") {
                    return (
                        <div className='userMessage' key={index}>
                        <img src={userIcon} alt="user iocn" className="person_icon"/> 
                        {history.content}
                        </div >
                    )

                 }
            })}
        <div ref={lastMsg} />
        </div>
        </div>
        </div>
    )
}

export default ConversationWindow
