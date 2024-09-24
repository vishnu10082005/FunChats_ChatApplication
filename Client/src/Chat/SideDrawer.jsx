import {
  Box,
  Button,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { AppContext } from "../Context/Context";
import ProfileModel from "./ProfileModel";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ChatLoading from "./ChatLoading";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import UserListItem from "./UserList/UserListItem";
// import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const { user, setUser, setSelectedChat, selectedChat } =
    useContext(AppContext);
  const [AllCookies] = useCookies(["Cookies"]);

  const navigate = useNavigate();
  console.log(searchTerm);
  const toast = useToast();
  const token = AllCookies.token;
  const logoutHandler = () => {
    // isLoggedIn
    document.cookie =
      "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser({});
    navigate("/");
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      toast({
        title: "Warning",
        description: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setIsLoadingChat(true);
      const token = AllCookies.token;
      console.log(token);
      const { data } = await axios.get(
        `http://localhost:5000/allUsers?token=${token}&search=${searchTerm}`
      );
      console.log(data);
      setIsLoadingChat(false);
      setSearchResults(data.users);
    } catch (error) {
      toast({
        title: "Error Description",
        description: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    setIsLoadingChat(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/chatAccess?token=${token}&userId=${userId}`
      );
      console.log(data);
      setSelectedChat(data);
      setIsLoadingChat(false);
      onClose();
    } catch (error) {
      console.log(error, "Axios Post error");
      toast({
        title: "Error Fetching Chats",
        // description: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip
          label="Search Users to chat"
          aria-label="A tooltip"
          hasArrow
          placement="bottom-end"
        >
          <Button variant="ghost" onClick={onOpen} width={"10%"}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work sans"}>
          Fun Chats
        </Text>
        <Box display="flex" alignItems="center" alignContent={"center"}>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} p={2}>
              <Avatar size={"xs"} cursor="pointer" name={user.name} mr={2} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>

              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={2} justifyContent={"space-between"}>
              <Input
                placeholder="Search by user name"
                width="auto"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button w={"20%"} onClick={handleSearch}>
                {" "}
                Go{" "}
              </Button>
            </Box>
            {isLoadingChat ? (
              <ChatLoading />
            ) : (
              searchResults.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
