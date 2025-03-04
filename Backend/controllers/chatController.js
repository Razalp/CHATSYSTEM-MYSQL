// controllers/chatController.js
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const message = await Message.sendMessage(senderId, receiverId, content);
    
    // Emit the message through Socket.IO
    req.io.to(receiverId).emit('message', message);
    req.io.to(senderId).emit('message', message);
    
    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await Message.getMessagesBetweenUsers(user1, user2);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};