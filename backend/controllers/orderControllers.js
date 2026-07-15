import { asyncHandler } from "../middlewares/asyncHandler.js";
import Order from "../models/OrderModel.js";
import ProductModel from "../models/ProductsModel.js";
import "../models/userModels.js"; 
import mongoose from "mongoose";


const createOrder = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    // Fallback dummy values to prevent database validation errors if shipping address is empty
    const finalShippingAddress = {
      address: shippingAddress?.address || "123 Main St",
      city: shippingAddress?.city || "New York",
      postalCode: shippingAddress?.postalCode || "10001",
      country: shippingAddress?.country || "USA",
    };

    // Create a new order instance
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        name: item.name,
        qty: Number(item.qty),
        image: item.image || "/uploads/placeholder.png", // Fallback if image is missing to prevent validation crash
        price: Number(item.price),
        product: item._id, // Map frontend _id to product mongoose ID
      })),
      user: req.user._id, // Logged in user ID from auth middleware
      shippingAddress: finalShippingAddress,
      paymentMethod: paymentMethod || "PhonePe",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/order/mine
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email",
    );

    if (order) {
      // Safe check to prevent population crashes if order.user is null
      const orderUserId = order.user?._id
        ? order.user._id.toString()
        : order.user?.toString();

      if (
        orderUserId &&
        orderUserId !== req.user._id.toString() &&
        !req.user.isAdmin
      ) {
        res.status(403);
        throw new Error("Not authorized to view this order");
      }

      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    // THIS WILL PRINT THE EXACT CRASH ERROR IN YOUR TERMINAL CONSOLE
    console.error("--- GET ORDER BY ID ERROR ---");
    console.error(error);

    res.status(404).json({ error: error.message });
  }
});

// @desc    Update order to paid
// @route   PUT /api/order/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      // Save details from payment gateway callback
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Update order to delivered
// @route   PUT /api/order/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get all orders (Admin dashboard)
// @route   GET /api/order
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
