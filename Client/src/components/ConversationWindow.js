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
                        {history.role}: {history.content}
                        </div >
                        
                    )
                    

                 } else if (history.role == "user") {
                    return (
                        <div className='userMessage' key={index}>
                        {history.role}: {history.content}
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
