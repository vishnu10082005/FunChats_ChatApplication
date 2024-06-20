const chatModel=require("./Models/ChatSchema.js")
const userModel=require("./Models/userSchema.js")
///// To create the new Chat in the model
const createChat=async(req,res)=>{
    const newChat= new chatModel({
        members:[req.body.senderId,req.body.receiverId]
    });
    try {
        const result=await newChat.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error)
    }
}
///// To create the chat
const userChats=async(req,res)=>{
    try {
        const chat=await chatModel.find({
            members: {$in:[req.params.userId]}
        })
        res.send(chat)
    } catch (error) {
        res.send(error);
    }
}
const findChats=async(req,res)=>{
    try {
        const chat=await chatModel.find({
            members: {$all:[req.params.firstId,req.params.secondId]}
        })
        res.send(chat);
    } catch (error) {
        res.send(error);
    }
}
const formCreation=async (req, res) => {
    const { email } = req.body; 
    try {
      ////Checking if the user exists or not.........
      const user = await userModel.findOne({ email: email });
      if (user && user.email === email) {
        res.json({ success: false, Message: "This user alreday exist please login with the another user name" })}
      else{
        const newData = new userModel(req.body);
        const savedData = await newData.save();
        res.json({ success: true, data: savedData ,userUid:savedData._id});
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  };
 const loginUser= async (req, res) => {
    try {
      const{password,email}=req.body;
      const user = await userModel.findOne({ email: email,password:password });
      if (user && user.password === password && user.email===email) {
        res.json({ success: true, Message: "Login Success",userId:user._id });
      } else {
        res.json({ Message:"Login Failed"});
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  const getUser=async(req,res)=>{
    const id=req.params.id;
    try {
      const user=await userModel.findById(id);
      if (user){
        res.send(user)
      }
    } catch (error) {
      res.send(error);
    }
  }
module.exports={createChat,userChats,findChats,loginUser,formCreation,getUser}
