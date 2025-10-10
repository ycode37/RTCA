import mongoose from "mongoose";

import message from "../models/message.js";
import User from "../models/user.js";
import { io, userSocketMap } from "../app.js";

const { Promise } = mongoose;
//get all users except loggenin user
export const getUserforSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count no of messages not seen
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    return res.status(200).json({ users: filteredUsers, unseenMessages });
  } catch (error) {
    return res.status(500).json * { message: "Internal Server Error" };
  }
};

//Get all messages for selected User:

export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: myId },
      ],
    });
    await message.updateMany(
      { senderId: selectedUserId, receiverId: myId },
      { seen: true }
    );
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markMessageasSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await message.findByIdAndUpdate(id, { seen: true });
    return res.status(200).json({ message: "Good" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(200).json({ newMessage });
  } catch (error) {}
};
