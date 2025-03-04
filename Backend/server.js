import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { initSocket } from './config/socket.io.js';
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middleware
app.use(express.json());

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));