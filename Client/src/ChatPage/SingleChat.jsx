import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AppContext } from "../Context/Context";
import React, { useContext, useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModel from "../Chat/ProfileModel";
import { getSender, getSenderFull } from "../Config/ChatLogic";
import UpdateGroupChatModal from "../Chat/UpdateGroupChat/UpdateGroupChat";
import axios from "axios";
import "../App.css";
import ScrollableChat from "../Chat/ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, isSelectChat, setSelectChat, token } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const toast = useToast();
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `http://localhost:5000/sendMessage?token=${token}`,
          {
            content: newMessage,
            chatId: isSelectChat,
          }
        );
        // socket.emit("new message", data);
        setMessages([...messages, data]);
        console.log(messages);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!isSelectChat) return;
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/getMessages/${isSelectChat._id}?token=${token}`
      );
      setMessages(data);
      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [isSelectChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Type Logic
  };

  return (
    <>
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
            h={"90%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              ></Spinner>
            ) : (
              <></>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <><ScrollableChat messages={messages}/></>
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
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
    </>
  );
};

export default SingleChat;
