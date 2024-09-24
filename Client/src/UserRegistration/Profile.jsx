import React, { useState } from 'react';
import './Profile.css'; 
import { useContext } from 'react';
import { AppContext } from '../Context/Context';
import {MessageText1, Profile, Video} from "iconsax-react"
import logo from "../Assets/chat-6030624-5058241-removebg-preview.png"
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, useDisclosure } from '@chakra-ui/react'

// import useNavigate
const ProfilePage = () => {
  const navigate=useNavigate();
  const {islogin,user}=useContext(AppContext)
  // console.log(islogin)
  return (
    <>
    <div className="Navbar">
      <div className="Logo">
        <img src={logo} alt="" />
      </div>
      {/* <p>{user.name}</p> */}
      {islogin && <div className="Features">
      <Profile size="72" color="#FF8A65"/>
      {/* <Link  to={"/chat"}> */}
      <MessageText1 onClick={()=>{
        navigate("/chat")
      }} size="72" color="#FF8A65"/>
      {/* </Link> */}
      <Video size="72" color="#FF8A65"/>
      {/* <button ></button> */}
      </div>}
      <Button w={islogin ? "10%" : "20%"} colorScheme='orange'>{islogin ? "Logout" : <Link to={"/login"}> SignUp/Login </Link>}</Button>
      
    </div>
    
    </>  
  );
};

export default ProfilePage;
