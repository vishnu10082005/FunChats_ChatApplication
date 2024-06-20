import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Signup from './Forms/Signup'
import Login from './Forms/Login'
import Chat from './chat'

const AllRoutes = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/chats' element={<Chat/>}/>
    </Routes>
    </div>
  )
}

export default AllRoutes
