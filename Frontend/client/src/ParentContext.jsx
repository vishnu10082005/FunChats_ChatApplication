import React, { createContext, useEffect, useState } from 'react'
// import { Cookies } from 'js-cookie';
import axios from "axios";
import Cookies from 'js-cookie';
export const AppContext = createContext()
// import { setAuthCookies } from './Cookiee.js';

const ParentContext = ({children}) => {
  const [islogin,setIslogin]=useState(false);
  const [login,setlogin]= useState(false)
  const [user, setUser] = useState("")
  const [checkuser,setCheckuser]=useState("")
  const getData = async () => {
    setIslogin(Cookies.get('login'))
    if (islogin) {
      setCheckuser(Cookies.get('useruid'))
      try {
        const userData = await axios.get(`http://localhost:3000/getUser/${checkuser}`)
        setUser(userData.data.email)
        console.log(userData.data.email)
        setlogin(true)
        // navigate("/login");
      } catch (error) {
        alert("error")
      }
    }
  }
  useEffect(() => {
    getData();
  })

  return <AppContext.Provider value={{login,setlogin,user, setUser}}>
    {children}
  </AppContext.Provider>
}

export default  ParentContext