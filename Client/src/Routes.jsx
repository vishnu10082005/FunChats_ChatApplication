import React from 'react'
import {  Route, Routes } from 'react-router-dom';
// import Login from './Login';
import Chat from './Chat';

const AllRoutes = () => {
  return (
    <div>
      <Routes>
    {/* <Route path='/' element={<Login/>} /> */}
    <Route path='chat' element={<Chat/>} />
      </Routes>
    </div>
  )
}

export default AllRoutes
