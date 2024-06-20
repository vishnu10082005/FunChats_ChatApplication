const express= require("express")
const messageModel=require("./Models/messageSchema.js")
const addMessage=async(req,res)=>{
    const {chatId,senderId,text}=req.body;
    const message=new messageModel({
        chatId,
        senderId,
        text
    })
    try {
        const result=await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.send(error)
    }
}
const getMessages=async(req,res)=>{
    const {chatId}=req.params;
    try {
        const result=await messageModel.find({chatId});
        // res.status(200).json(result);
        res.status(200).json(result);
        // res.send.json({message:true})
    } catch (error) {
        res.send(error)
    }
}
module.exports={addMessage,getMessages};