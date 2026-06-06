import jwt from "jsonwebtoken";
import { asyncHandler } from "./asyncHandler";
import User from "../models/userModels.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.userToken;
  if (token) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("not authenticated, token failed");
    }
  } else {
    res.status(401);
    throw new Error("no token found,not authenticated");
  }
});

const autherizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    res.status(200).json({
      Message: "welcome admin",
    });
    next();
  } else {
    res.status(401).send("not autherized as admin");
  }
};


export {authenticate,autherizeAdmin}