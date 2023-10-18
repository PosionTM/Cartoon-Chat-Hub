import React from "react"

const InputWindow = ({ userText, sendUserText }) => {

    // Add a state check to disable button if text area is below 1 character
    // Add a counter to show the maximum character limit and current character count
    const textArea = document.getElementById('userText')
   
    const placeHolderText = 'type your message here'

    // Checks if there's text in text area, otherwise it doesn't send anything if send button is clicked
    const checkValidText = () => {
        const userTextArea = textArea.value
        // If there is text in the text area, if statement will run
        if (userTextArea) { 
            userText = userTextArea
            console.log(`User text area from Input Window: ${userText}`)
            sendUserText(userText)
            textArea.value = ''
        } else {
            console.log('nothing in the text area')
        }
        

        
    }

    // Render Input window
    return (
        <div className='input_window'>
            <textarea name="userText" id="userText" cols="80" rows="5" maxLength={250} placeholder={placeHolderText}></textarea>
            <button className="sendButton" onClick={checkValidText}>Send</button>
        </div>

    )
}

export default InputWindow