import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Reference to the User who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user", // Adjust reference to match your User model name
    },

    // Array of ordered products
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product", // Adjust reference to match your Product model name
        },
      },
    ],

    // Shipping Address Details
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Payment Info
    paymentMethod: {
      type: String,
      required: true,
      enum: ["PhonePe", "PayPal", "Stripe", "Cash On Delivery"], // Enforces allowed values
      default: "PhonePe", // Sets PhonePe as default
    },

    // Detailed response from payment gateway (PayPal, Stripe, etc.)
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // Pricing calculations
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    // Payment status tracking
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    // Delivery status tracking
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
