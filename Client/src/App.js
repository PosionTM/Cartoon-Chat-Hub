import React from "react";
import ConversationWindow from "./components/ConversationWindow";

const App = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="burger_icon">|||</div>
                    <div className="sub_header">
                        <div id="main_title">Cartoon Chat Hub</div>
                    </div>
            </div>
            <div className="people_window"> People Window </div>
            < ConversationWindow />
            <div className="input_window">Input Window</div>
        </div>
    )
}

export default App;