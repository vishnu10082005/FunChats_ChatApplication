import React, { useState } from 'react';
import './Profile.css'; 
import { useContext } from 'react';
import { AppContext } from '../Context/Context';
import {MessageText1, Profile, Video} from "iconsax-react"
import logo from "../Assets/chat-6030624-5058241-removebg-preview.png"
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react'
const ProfilePage = () => {

  const {islogin,user}=useContext(AppContext)
  // console.log(islogin)
  return (
    <>
    <div className="Navbar">
      <div className="Logo">
        <img src={logo} alt="" />
      </div>
      {/* <p>{user.name}</p> */}
      <div className="Features">
      <Profile size="72" color="#FF8A65"/>
      <MessageText1 size="72" color="#FF8A65"/>
      <Video size="72" color="#FF8A65"/>
      <Button colorScheme='blue'>{islogin ? "Logout" :<Link to={"/login"}> SignUp/Login </Link>}</Button>
      {/* <button ></button> */}
      </div>
      
    </div>
    </>
  );
};

export default ProfilePage;
