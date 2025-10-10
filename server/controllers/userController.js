import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPass,
    });

    // Remove password from response
    const userResponse = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    };

    const token = generateToken(newUser._id);

    return res.json({
      success: true,
      userData: userResponse,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    const userData = await User.findOne({ email });
    
    if (!userData) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isPassword = await bcrypt.compare(password, userData.password);
    if (!isPassword) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    // Remove password from response
    const userResponse = {
      _id: userData._id,
      fullName: userData.fullName,
      email: userData.email,
      profilePic: userData.profilePic,
    };

    const token = generateToken(userData._id);
    return res.json({ 
      success: true,
      message: "Login Successful",
      token,
      userData: userResponse 
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;
    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName },
        { new: true }
      ).select("-password");
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          fullName,
        },
        { new: true }
      ).select("-password");
    }
    return res
      .status(200)
      .json({ success: true, message: "User Updated Successfully", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
