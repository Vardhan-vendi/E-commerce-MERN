import express from "express";
import formidable from "express-formidable";
import { authenticate, autherizeAdmin } from "../middlewares/authenticate.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById
} from "../controllers/productControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(authenticate, autherizeAdmin, formidable(), addProduct)
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, autherizeAdmin, formidable(), updateProduct)
  .delete(authenticate, autherizeAdmin, deleteProduct);

export default router;
