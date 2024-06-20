import React from 'react'
import "./Home.css"
import Navbar from './Forms/Navbar'
const Home = () => {
  return (
    <div >
      {/* <Navbar></Navbar> */}
      <div className="Add">
      <div className="emogi">
        <img width={'600px'} src="https://thumbs.dreamstime.com/b/happy-together-d-emoji-friends-two-yellow-round-symbols-icons-white-background-drop-shadow-156902802.jpg" alt="" />
      </div>
      <div>
        <h1 className="welcome-text">Welcome to FunChat's!</h1>
        <p className='intro-text'>Connect, Chat, and Make Friends!
          Discover a new way to meet friends around the world. Whether you're looking for new friends or just someone to chat with, FunChat's is the place for you.</p>
      </div>
      </div>
      <p>
      </p>
    </div>
  )
}

export default Home
