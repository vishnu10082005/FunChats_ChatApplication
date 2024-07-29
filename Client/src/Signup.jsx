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

const Signup = () => {
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
        <FormControl id="Name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter Your Name"  onChange={(e)=>{setName(e.target.value)}}/>
        </FormControl>
        <FormControl id="Email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter Your Email"  onChange={(e)=>{setEmail(e.target.value)}}/>
        </FormControl>
        <FormControl id="Password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter Your Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        </FormControl>
        <FormControl id="Image" isRequired>
          <FormLabel>Upload You Image</FormLabel>
          <Input type="file" p={1.5} accept="image/*" onChange={(e)=>{postDetails(e.target.files[0])}}/>
        </FormControl>
        <Button colorScheme="blue"
        width={'100%'}
        style={{marginTop:15}}
        onClick={submitHandler}>
        Signup
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
