const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chats = require('./data'); // Assuming data.js exports an array of chat objects
const Chat = require('./Models/chatModel');
const User = require('./Models/userModel');
const Message = require('./Models/messageModel');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://Vishnu:vishnu2005@cluster0.z1rrgh7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// GET endpoint for chats
app.get("/api/chats", async (req, res) => {
  res.send(chats);
});

// Uncommented version of your commented GET endpoint for fetching chats from the database
// app.get('/chats', async (req, res) => {
//   try {
//     const chats = await Chat.find();
//     res.status(200).json(chats);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching chats', error });
//   }
// });
app.get("chat/:id",async(req,res)=>{
    const singleChat=await chats.find(c=>c._id===req.params.id)
    console.log(singleChat)
    res.send(singleChat)
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
