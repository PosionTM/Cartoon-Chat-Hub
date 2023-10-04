import React from 'react'

const ConversationWindow = ({ chatHistory }) => {
    if (chatHistory == null) {
        return (
            <div className='conversationSpace'>
                Conversation Window loading...
            </div>
        )
    }

    // Neeed to accept prop from app.js for chat history
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
        </div>
        </div>
        </div>
    )
}

export default ConversationWindow
