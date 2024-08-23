const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const chats = require("./data"); // Assuming data.js exports an array of chat objects
const Chat = require("./Models/chatModel");
const router = require("./Routes/ChatRoutes")
const User = require("./Models/userModel");
const Message = require("./Models/messageModel");
const jwt = require("jsonwebtoken")
const app = express();
const bodyparser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
// const jwtSecret = 
app.use(cors());
app.use(express.json());
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({ extended: true }));
app.use(router)
// MongoDB connection
mongoose
  .connect("mongodb+srv://Vishnu:vishnu2005@cluster0.z1rrgh7.mongodb.net/funchats", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  app.post('/signUp', async (req, res) => {
    const data = req.body;
    try {
      const checkUser = await User.findOne({ email: data.email });
      if (checkUser) {
        res.send({ message: false });
      } else {
        const newUser = new User(data);
        await newUser.save();
        res.send({ message: true });
      }
    } catch (error) {
      console.error(error);
      res.send({ message: error });
    }
  });
  
  

  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && user.password === password) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ success: true, Message: true, token: token, userId: user._id });
      } else {
        res.json({ success: false, Message: false, error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  });

  const authenticateToken = (req, res, next) => {
    const token = req.query.token;
  
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = decoded; 
      console.log(req.user)
      next(); 
    } catch (error) {
      return res.status(403).json({ success: false, message: "Invalid token." });
    }
  };
  
  

app.get("/getUser/:id",async(req,res)=>{
  try {
  
    const user = await User.findById(req.params.id);
    res.send({message:user});
  } catch (error) {
    res.send({message:false,Error:error})
  }
})
app.get("/allUsers", authenticateToken, async (req, res) => {
  try {
    const keyWord = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
          ]
        }
      : {};

    const users = await User.find(keyWord).find({_id: { $ne : req.user.userId}});
        // console.log("userid",req.user)
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// Chat Routes


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = authenticateToken