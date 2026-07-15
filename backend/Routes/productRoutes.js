import express from "express";
import formidable from "express-formidable";
import { authenticate, autherizeAdmin } from "../middlewares/authenticate.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(authenticate, autherizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(getAllProducts);
router.route("/topProducts").get(fetchTopProducts);
router.route("/newProducts").get(fetchNewProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, autherizeAdmin, formidable(), updateProduct)
  .delete(authenticate, autherizeAdmin, deleteProduct);

router
  .route("/:id/reviews")
  .post(authenticate, autherizeAdmin, addProductReview);
router.route("/filtered-products").post(filterProducts);

export default router;
