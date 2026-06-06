import express from "express";
import { authenticate,autherizeAdmin } from "../middlewares/authenticate.js";

import {
  getAllUsers,
  userLogin,
  userLogout,
  userRegister,
  getAllUsers,
  getCurrentUserProfile,
} from "../controllers/userControllers.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.route("/").get(authenticate,autherizeAdmin,getAllUsers);
router.route('/profile').get(authenticate,getCurrentUserProfile)

export default router;
