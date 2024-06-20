import React, { useState } from 'react'
import "./chat.css"
const Chat = () => {
    const [chats,setChats]=useState([])
    // const 
    return (
        <div className='Chat'>
            {/* <h1>Hello World</h1> */}
            <div className='Left-side-chat'>
                <div className="Chat-container">
                    <h2>Chats</h2>
                    {/* Converstaions */}
                    <div className="Chat-list">
                        Conversations
                    </div>
                </div>
            </div>
            {/* Right Side chat Container */}
            <div className="Right-side-chat"></div>
        </div>
    )
}

export default Chat
