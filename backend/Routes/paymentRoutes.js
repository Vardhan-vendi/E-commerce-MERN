import express from "express";
const router = express.Router();

import { initiatePhonePePayment, phonePeCallback } from "../controllers/paymentController.js";
import { authenticate } from "../middlewares/authenticate.js";

// Endpoint to start/initiate checkout redirect (User authentication required)
router.post("/phonepe/initiate", authenticate, initiatePhonePePayment);

// Webhook endpoint called by PhonePe servers upon payment completion (Public)
router.post("/phonepe/callback", phonePeCallback);

export default router;