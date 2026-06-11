import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";



const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please enter the required credentials...");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "user Alreaddy exist .please login ..",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    generateToken(newUser._id, res);
    console.log(`${newUser.username} registered`);
    return res.status(201).json({
      message: "user successfully registered ",
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    res.status(500);
    throw new Error("Failed to register user. Data was not saved.");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please enter the required credentials...");
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(401);
    throw new Error("user not found ,please login....");
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    res.status(401);
    throw new Error("invalid password...");
  }

  generateToken(existingUser._id, res);
  return res.status(200).json({
    message: "user successfully login ",
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
});

const userLogout = asyncHandler(async (req, res) => {
  res.cookie("userToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });

  // best practice than above one
  //  res.clearCookie("userToken",{
  //    httpOnly: true,
  //     secure: process.env.NODE_ENV !== "development",
  //     sameSite: "strict",
  //  })

  res.status(200).json({
    message: "user successfully logged out...",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("user not found");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.user:", req.user);
  const currentUser = await User.findById(req.user._id);
  if (currentUser) {
    currentUser.username = req.body.username || currentUser.username;
    currentUser.email = req.body.email || currentUser.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      currentUser.password = hashedPassword;
    }

    const updatedUser = await currentUser.save();
    console.log(updatedUser.email);
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(401);
      throw new Error("can not delete admin");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "user deleted" });
  } else {
    res.status(400);
    throw new Error("no user found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("user not exist");
  }
});

export {
  userRegister,
  userLogin,
  userLogout,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
};
