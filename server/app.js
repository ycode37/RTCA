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

//initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online User
export const userSocketMap = {};

//socket connection Handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconneced", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/auth", userRouter);
app.use("/api/messages", MessageRouter);

await connectDB();

app.use("/api/status", (req, res) => res.send("Server is Live"));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
