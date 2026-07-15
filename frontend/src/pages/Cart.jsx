import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrash,
  FaShoppingCart,
  FaReceipt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { addTocart, removeFromCart } from "../redux/features/cart/cartSlice.js";
import { useGetMyOrdersQuery } from "../redux/api/orderApiSlice.js"; // Injected order history hook

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Query order history
  const { data: orders = [], isLoading: ordersLoading } = useGetMyOrdersQuery();

  const handleQtyChange = (product, qty) => {
    dispatch(addTocart({ ...product, qty }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/placeorder");
  };

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-12 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      {/* Title & Continue Shopping Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-l-4 border-purple-500 pl-3">
            SHOPPING CART
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Review and manage your selected items
          </p>
        </div>
        <Link
          to="/shopping"
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors w-fit"
        >
          ← Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
          <div className="w-20 h-20 rounded-full bg-purple-950/20 border border-purple-500/20 flex items-center justify-center shadow-lg relative">
            <FaShoppingCart className="text-purple-400 text-3xl animate-bounce" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white">Your cart is empty</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <Link
            to="/shopping"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const imageUrl = item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `http://localhost:5000${item.image.replace(/\\/g, "/")}`
                : null;

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl gap-4 hover:border-purple-500/30 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-purple-500/20 bg-purple-950/20 flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-sm font-bold text-white hover:text-purple-400 transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-400">{item.brand}</p>
                    <p className="text-sm font-semibold text-purple-300">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Selector & Delete Button */}
                  <div className="flex items-center gap-4 sm:gap-6 justify-center">
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-slate-400 text-center sm:text-left">
                        Qty
                      </label>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          handleQtyChange(item, Number(e.target.value))
                        }
                        className="bg-[#101011] border border-purple-500/30 rounded-lg py-1 px-3 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                      >
                        {[...Array(item.countInStock || 10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all mt-4"
                      title="Remove Item"
                    >
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Checkout Summary */}
          <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-6">
            <h2 className="text-lg font-bold text-purple-300 border-b border-white/10 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Items total quantity:</span>
                <span className="text-white font-medium">{totalItems}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3">
                <span className="text-slate-400">Subtotal Price:</span>
                <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* ── Section: Recently Placed Orders ── */}
      <div className="border-t border-white/10 pt-10 space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight border-l-4 border-pink-500 pl-3">
            RECENTLY PLACED ORDERS
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Track status and delivery details of your order history
          </p>
        </div>

        {ordersLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white/5 border border-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders
              .slice(-3)
              .reverse()
              .map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl gap-4 hover:border-purple-500/20 transition-colors"
                >
                  {/* Order Meta details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-semibold text-purple-300 uppercase truncate">
                        ID: {order._id}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        • {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Items:{" "}
                      <span className="text-slate-300 font-semibold">
                        {order.orderItems.length}
                      </span>{" "}
                      | Total Charged:{" "}
                      <span className="text-white font-bold">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </p>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Payment Status */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${
                        order.isPaid
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {order.isPaid ? <FaCheckCircle /> : <FaClock />}
                      <span>{order.isPaid ? "Paid" : "Unpaid"}</span>
                    </div>

                    {/* Delivery Status */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${
                        order.isDelivered
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      }`}
                    >
                      {order.isDelivered ? <FaCheckCircle /> : <FaClock />}
                      <span>
                        {order.isDelivered ? "Delivered" : "In Transit"}
                      </span>
                    </div>

                    {/* Link to Invoice receipt */}
                    <Link
                      to={`/order/${order._id}`}
                      className="p-2 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 active:scale-95"
                    >
                      <FaReceipt />
                      <span>Invoice</span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="w-full text-center py-10 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-slate-500 text-xs">
              No order history found yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
