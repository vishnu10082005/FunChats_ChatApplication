import React, { useContext } from 'react'
import { AppContext } from '../../Context/Context'
import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from '@chakra-ui/react';
const UserListItem = ({user,handleFunction}) => {

  return (
    <div>
      <Box width={"100%"}
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#08B2AF",
        color: "white",
      }}
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
      />
      <Box>
        <Text padding={1}>{user.name}</Text>
        <Text>{user.email}</Text>

      </Box>
    </Box>
    </div>
  )
}

export default UserListItem