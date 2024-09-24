import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export const AppContext = createContext();

const ParentContext = ({ children }) => {
  const [AllCookies] = useCookies(["Cookies"]);
  const [islogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({}); // Initialize as an empty object
  const [selectedChat, setSelectedChat] = useState([]);
  const [isSelectChat, setSelectChat] = useState("");
  const [chats, setChats] = useState([]);
  const token = AllCookies.token;
  const getData = async () => {
    try {
      if (AllCookies.isLoggedIn) {
        setIsLogin(true);
        const Data = await axios.get(
          `http://localhost:5000/getUser/${AllCookies.uid}`
        );
        setUser(Data.data.message); // Set the user data correctly
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log("user", user);

  return (
    <AppContext.Provider
      value={{
        islogin,
        setIsLogin,
        user,
        setUser,
        setSelectedChat,
        selectedChat,
        chats,
        setChats,
        token,
        isSelectChat,
        setSelectChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ParentContext;
