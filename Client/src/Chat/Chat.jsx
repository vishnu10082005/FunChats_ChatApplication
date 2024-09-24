import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { AppContext } from '../Context/Context'
import { Box } from '@chakra-ui/react';
import SideDrawer from './SideDrawer';
import MyChats from './MyChats';
import ChatBox from './ChatBox';
const Chat = () => {
  const {user}=useContext(AppContext);
  const [fetchAgain, setFetchAgain] = useState(false);
  
  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box display="flex" justifyContent={"space-between"} width={"100%"} height={"91.5vh"} padding={"10px"}>

        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  )
}

export default Chat
