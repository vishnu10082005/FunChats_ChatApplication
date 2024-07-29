import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
const Login = () => {
  const [name, setName] = useState();
    console.log(name);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const postDetails=(pics)=>{

    }
    const submitHandler=()=>{

    }
  return (
    <div>
      <VStack spacing={"5px"}>
        <FormControl id="Email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter Your Email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        </FormControl>
        <FormControl id="Password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter Your Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        </FormControl>
       
      </VStack>
    </div>)
}

export default Login
