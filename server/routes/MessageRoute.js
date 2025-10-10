import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUserforSidebar,
  markMessageasSeen,
  sendMessage,
} from "../controllers/messageController.js";

const MessageRouter = express.Router();

MessageRouter.get("/users", protectRoute, getUserforSidebar);
MessageRouter.get("/:id", protectRoute, getMessages);
MessageRouter.put("/mark/:id", protectRoute, markMessageasSeen);
MessageRouter.post("/send/:id", protectRoute, sendMessage);

export default MessageRouter;
