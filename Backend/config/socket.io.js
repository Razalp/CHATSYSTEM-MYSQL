import { Server } from "socket.io";


let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Adjust this in production
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO connection handling
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a room based on user ID
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Handle sending messages
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, content } = data;

      try {
        // Save message to database (ensure Message.sendMessage exists)
        const message = await Message.sendMessage(senderId, receiverId, content);

        // Emit to sender
        socket.emit("message", message);

        // Emit to receiver
        io.to(receiverId).emit("message", message);
      } catch (error) {
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
