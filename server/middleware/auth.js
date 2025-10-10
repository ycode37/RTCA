import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      console.log("No token provided in headers:", Object.keys(req.headers));
      return res.status(401).json({ message: "No token provided" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded, userId:", decoded.userId);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", user ? user.fullName : "Not found");

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res.status(500).json({ message: "Internal Server Error: " + error.message });
  }
};

export const checkAuth = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
