import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Avatar,
  Image,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { AppContext } from "../Context/Context";
const ProfileModel = ({ user, children }) => {
    // const {user} = useContext(AppContext)
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"410px"}>
          <ModalHeader fontSize="40px" fontFamily={"work sans"} display="flex" justifyContent={"center"}>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"space-between"}>
            <Image borderRadius={"full"} boxSize={"150px"} src={user.pic} alt={user.name}></Image>
            <Text fontSize={{base:"18px",md:"20px"}} fontFamily={"Work sans"}>
                Email : {user.email}
            </Text>
          </ModalBody>
        
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
