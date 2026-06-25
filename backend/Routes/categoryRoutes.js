import express from "express";
import { authenticate, autherizeAdmin } from "../middlewares/authenticate.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  categoryList,
  getCategoryById,
} from "../controllers/categoryControllers.js";
import Category from "../models/CategoryModel.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, autherizeAdmin, createCategory)
  .get(categoryList);
router
  .route("/:categoryId")
  .put(authenticate, autherizeAdmin, updateCategory)
  .delete(authenticate, autherizeAdmin, removeCategory)
  .get(getCategoryById);

export default router;
