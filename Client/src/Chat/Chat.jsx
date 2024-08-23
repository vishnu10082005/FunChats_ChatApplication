import React, { useEffect } from 'react'
import axios from "axios"
const Chat = () => {
  const fetchChats=async()=>{
    const data= await axios.get("http://localhost:5000/api/chats")
    console.log(data)
  }
  useEffect(()=>{
    fetchChats();
  })
  return (
    <div>
      hii chat 
    </div>
  )
}

export default Chat
