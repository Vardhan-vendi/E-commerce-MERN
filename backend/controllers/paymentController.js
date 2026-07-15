import crypto from "crypto";
import axios from "axios";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import Order from "../models/OrderModel.js";

// Load merchant credentials from environment variables or use sandbox UAT defaults
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || "PGOMT";
const SALT_KEY = process.env.PHONEPE_SALT_KEY || "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || "1";

// PhonePe API URL (Testing/UAT Environment)
// Production URL: https://api.phonepe.com/apis/hermes/pg/v1/pay
const PHONEPE_API_URL = "https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay";

// @desc    Initiate PhonePe Payment Request
// @route   POST /api/payment/phonepe/initiate
// @access  Private
const initiatePhonePePayment = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    // PhonePe transactions require amount in Paise (1 INR = 100 Paise)
    const amountInPaise = Math.round(order.totalPrice * 100);
    const merchantTransactionId = `MT${Date.now()}`;

    // Payload format specified by PhonePe
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: `MUID${req.user._id.toString().slice(-10)}`,
      amount: amountInPaise,
      redirectUrl: `http://localhost:5173/payment-status?transactionId=${merchantTransactionId}`, // Frontend success page redirect
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.BACKEND_URL || "http://localhost:5000"}/api/payment/phonepe/callback`, // Webhook endpoint
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    // Convert payload to Base64
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");

    // Generate SHA256 Checksum Signature
    const stringToSign = base64Payload + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
    const checksum = sha256 + "###" + SALT_INDEX;

    // Send payment request to PhonePe
    const response = await axios.post(
      PHONEPE_API_URL,
      { request: base64Payload },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
        },
      }
    );

    if (response.data && response.data.success) {
      // Temporarily store transaction ID in the order to match callbacks
      order.paymentResult = {
        id: merchantTransactionId,
        status: "PENDING",
      };
      await order.save();

      // Return the PhonePe payment page redirect URL to the frontend
      res.status(200).json({
        success: true,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
      });
    } else {
      res.status(400);
      throw new Error("PhonePe payment initiation failed");
    }
  } catch (error) {
    console.error("PhonePe Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: error.message });
  }
});

// @desc    PhonePe Callback Webhook (Handles transaction updates from PhonePe)
// @route   POST /api/payment/phonepe/callback
// @access  Public
const phonePeCallback = asyncHandler(async (req, res) => {
  try {
    const { response } = req.body;

    // Decode base64 response payload
    const decodedPayload = JSON.parse(Buffer.from(response, "base64").toString("utf-8"));
    const { success, code, data } = decodedPayload;

    if (success && code === "PAYMENT_SUCCESS") {
      const { merchantTransactionId, transactionId } = data;

      // Find the corresponding order matching this transaction
      const order = await Order.findOne({ "paymentResult.id": merchantTransactionId });

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: transactionId, // Update to final transaction reference
          status: "SUCCESS",
          update_time: new Date().toISOString(),
        };
        await order.save();

        return res.status(200).send({ success: true, message: "Payment updated successfully" });
      }
    }

    res.status(400).send({ success: false, message: "Payment confirmation failed" });
  } catch (error) {
    console.error("PhonePe Callback Error:", error.message);
    res.status(500).send({ error: error.message });
  }
});

export { initiatePhonePePayment, phonePeCallback };