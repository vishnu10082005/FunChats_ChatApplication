const express = require("express")
const {createChat,userChats,findChats,formCreation,loginUser,getUser} = require("../ChatController.js")
const {addMessage,getMessages} = require("../MessagesControllers.js")
const userModel = require("../Models/userSchema.js")
const route=express.Router();
route.post("/createChat",createChat)
route.get("/:userId",userChats)
route.get("/find/:firstId/:secondId",findChats)
route.post("/formcreation",formCreation)
route.post("/login",loginUser)
route.post('/addMessage',addMessage);
route.get('/message/:chatId',getMessages)
route.get('/getUser/:id',getUser)

module.exports=route