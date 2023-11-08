import React from 'react'
import { useEffect, useRef } from 'react'

const ConversationWindow = ({ chatHistory }) => {


    // Scroll down when new message appears
    const lastMsg = useRef(null)
    const scrollDown = () => {
        lastMsg.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollDown()
    }, [chatHistory])


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
                        <img src="/images/hooded_figure_art.png" alt="user iocn" className="person_icon"/> 
                        </div >
                        
                    )
                    

                 } else if (history.role == "user") {
                    return (
                        <div className='userMessage' key={index}>
                        <img src="/images/default_user.png" alt="user iocn" className="person_icon"/> 
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
