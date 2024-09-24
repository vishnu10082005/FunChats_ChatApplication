import { Box, IconButton, Text } from "@chakra-ui/react";
import { AppContext } from "../Context/Context";
import React, { useContext } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModel from "../Chat/ProfileModel";
import { getSender, getSenderFull } from "../Config/ChatLogic";
import UpdateGroupChatModal from "../Chat/UpdateGroupChat/UpdateGroupChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, isSelectChat, setSelectChat } = useContext(AppContext);
  return (
    <Box>
      {isSelectChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex" 
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectChat("")}
            />
            {!isSelectChat.isGroupChat ? (
              <>
                {getSender(user, isSelectChat.users)}
                <ProfileModel user={getSenderFull(user, isSelectChat.users)} />
              </>
            ) : (
              <>
                {isSelectChat.chatName.toUpperCase()}
                {/* Uncomment this if you have the component */}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
