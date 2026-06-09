import express from "express";
import { authenticate, autherizeAdmin } from "../middlewares/authenticate.js";

import {
  userLogin,
  userLogout,
  userRegister,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router.route("/").get(authenticate, autherizeAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticate, autherizeAdmin, deleteUserById)
  .get(authenticate, autherizeAdmin, getUserById);

export default router;
