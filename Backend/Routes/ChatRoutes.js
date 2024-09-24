const express = require("express");
const Chat = require("../Models/chatModel");
const router = express.Router();
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
require("dotenv").config();
const authenticateToken = (req, res, next) => {
  const token = req.query.token;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    // res.send({error: error})
    console.log(error);
    return res
      .status(403)
      .json({ success: false, message: "Invalid token.", error });
  }
};

router.post("/chatAccess", authenticateToken, async (req, res) => {
  const  {userId}  = req.query;
  if (!userId) {
    console.log("UserId not send with the request.");
    res.status(400).json({ success: false });
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user.userId } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.userId, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.send({ fullChat });
      console.log("Full Chat ",fullChat);
    } catch (error) {
      res.send({ error });
      console.log(error)
    }
  }
});

router.get("/getChatAccess", authenticateToken, async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

router.get("/fetchChats", authenticateToken, async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.userId } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.send(results);
      });
  } catch (error) {
    res.send(error);
  }
});

// Group Formation
router.post("/group", authenticateToken, async (req, res) => {
  // Check if required fields are present
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .json({ message: "Please fill all the required fields" });
  }

  // Directly use req.body.users assuming it is already an array
  const users = req.body.users;

  if (users.length < 2) {
    return res.status(400).json({ message: "More than 2 users required" });
  }
  users.push(req.user.userId);
  console.log(users);

  try {
    // Create the group chat
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user.userId,
    });
    const fullgroupedChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("latestMessage");

    res.status(200).json(fullgroupedChat);
  } catch (error) {
    res.send(error);
  }
});

router.put("/renameGroup", authenticateToken, async (req, res) => {
  //rename
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not found");
  } else {
    res.json(updatedChat);
  }
});
router.put("/groupRemove", authenticateToken, async (req, res) => {
  //remove from group
  const { chatId, userId } = req.body;
  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!removed) {
      res.status(404).json({ message: "Chat not found" });
    } else {
      res.json(removed);
    }
  } catch (error) {
    console.log("error", error);
    res.send({ error: error });
  }
});
router.put("/groupadd", authenticateToken, async (req, res) => {
  //Add to group
  const { chatId, userId } = req.body;
  try {
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!added) {
      res.status(404).json("Error");
    } else {
      res.json(added);
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
