import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./UserRegistration/Login";
import Signup from "./UserRegistration/Signup";
const Forms = () => {
  return (
    <div>
      <Container maxW={"xl"}>
        <Box
          d="flex"
          justifyContent={"center"}
          p={3}
          bg={"yellow"}
          w={"100%"}
          m={"40px 0 15px 0"}
          textAlign={"center"}
        >
          <Text fontSize="4xl" fontFamily="sans-serif" color={"black"}>
            Fun Chat's
          </Text>
        </Box>
        <Box
          bg={"yellow"}
          width={"100%"}
          p={4}
          borderRadius={"1g"}
          borderWidth={"1px"}
        >
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em"   color={"white"}>
              <Tab  >Login</Tab>
              <Tab  >Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login></Login>
              </TabPanel>
              <TabPanel>
                <Signup></Signup>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Forms;
