import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoute.js";
import MessageRouter from "./routes/MessageRoute.js";

const app = express();
const server = http.createServer(app);

// Store online User
export const userSocketMap = {};

// Check if running in serverless environment (Vercel)
const isServerless =
  process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME;

// Initialize socket.io server only in non-serverless environments
export let io = null;

if (!isServerless) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  // Socket connection Handler
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
}

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/messages", MessageRouter);

// Connect to database
connectDB();

app.use("/api/status", (req, res) => res.send("Server is Live"));

// socket.io endpoint handler for serverless - returns error message
app.all("/socket.io/*", (req, res) => {
  res.status(503).json({
    error: "WebSocket not supported",
    message:
      "Real-time features require a non-serverless deployment. Please deploy to Render, Railway, or similar platforms for WebSocket support.",
  });
});

if (!isServerless) {
  const PORT = process.env.PORT || 5001;
  server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
}

// Export for Vercel serverless
export default app;
