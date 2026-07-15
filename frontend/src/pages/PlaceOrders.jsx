import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateOrderMutation,
  usePayOrderMutation, // Imported to update paid status on backend
} from "../redux/api/orderApiSlice.js"; // Adjust import paths
import { clearCartItems } from "../redux/features/cart/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [payOrder, { isLoading: isPayingOrder }] = usePayOrderMutation();

  // Price calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // 15% tax
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const handlePlaceOrder = async () => {
    try {
      // 1. Create order in backend database
      const order = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();

      // 2. Simulate payment processing delay (mimics live gateway connection)
      toast.info("Connecting to secure payment gateway... Please wait.");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 3. Generate a mock Transaction ID
      const transactionId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;

      // 4. Mark order as Paid in the backend database
      await payOrder({
        orderId: order._id,
        details: {
          id: transactionId,
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          email_address: shippingAddress.email || "buyer@mvstore.com",
        },
      }).unwrap();

      // 5. Clear items from frontend Cart slice
      dispatch(clearCartItems());
      
      toast.success("Payment completed successfully!");

      // 6. Redirect to the Payment Success landing page
      navigate(`/payment-status?transactionId=${transactionId}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Payment transaction failed");
    }
  };

  const isProcessing = isCreatingOrder || isPayingOrder;

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent scrollbar-none [-ms-overflow-style:none]">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-l-4 border-purple-500 pl-3">
          ORDER OVERVIEW
        </h1>
        <p className="text-slate-400 text-xs mt-1">Review your details before completing payment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Delivery Details & Items */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address summary */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl space-y-2">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Shipping Details</h2>
            <p className="text-xs text-slate-300">
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Method summary */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl space-y-2">
            <h2 className="text-sm font-bold text-pink-400 uppercase tracking-wider">Payment Method</h2>
            <p className="text-xs text-slate-300">{paymentMethod}</p>
          </div>

          {/* Items checklist */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Order Items</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-xs sm:text-sm text-slate-300">
                  <span className="truncate max-w-50 sm:max-w-xs">{item.name}</span>
                  <span>
                    {item.qty} x ${item.price} = <span className="text-white font-bold">${(item.qty * item.price).toFixed(2)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing Breakdown */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-6">
          <h2 className="text-lg font-bold text-purple-300 border-b border-white/10 pb-3">
            Summary
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-slate-400">
            <div className="flex justify-between">
              <span>Items Subtotal:</span>
              <span className="text-white">${itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee:</span>
              <span className="text-white">${shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (15%):</span>
              <span className="text-white">${taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-white/5 pt-3 text-base">
              <span className="text-slate-400">Total Price:</span>
              <span className="font-black text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0 || isProcessing}
            className="w-full py-3.5 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider"
          >
            {isProcessing ? "Processing..." : "Place Order & Pay"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PlaceOrder;