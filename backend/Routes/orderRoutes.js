import express from "express";
const router = express.Router();

import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/orderControllers.js";

// Import your custom auth middlewares (authenticate for users, authorizedAdmin for admins)
// Adjust paths/names if they are different in your system
import { authenticate, autherizeAdmin } from "../middlewares/authenticate.js";

// Root paths
router
  .route("/")
  .post(authenticate, createOrder) // Create new order (User)
  .get(authenticate, autherizeAdmin, getAllOrders); // View all orders (Admin)

// Logged-in user's personal orders list
router.route("/mine").get(authenticate, getMyOrders);

// Single order operations
router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, updateOrderToPaid); // Mark paid (User)
router.route("/:id/deliver").put(authenticate, autherizeAdmin, updateOrderToDelivered); // Mark delivered (Admin)

export default router;