import React, { useContext } from 'react'
import { AppContext } from '../Context/Context'
import { Box } from "@chakra-ui/layout";
import SingleChat from '../ChatPage/SingleChat';

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {isSelectChat,setSelectChat} = useContext(AppContext)
  return (
    <Box
      d={{ base: isSelectChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
