import React from 'react'

const ConversationWindow = ({ chatHistory }) => {
    if (chatHistory == null) {
        return (
            <div className='conversation_window'>
                Conversation Window loading...
            </div>
        )
    }

    // Neeed to accept prop from app.js for chat history
    return (
        <div className='conversation_window'>
            {chatHistory.map((chatHistory) => (
                <div className='message'>
                {chatHistory.role}: {chatHistory.content}
                </div >

            ))}
        </div>
    )
}

export default ConversationWindow
