import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { addTocart, removeFromCart } from "../redux/features/cart/cartSlice.js"; // Adjust import path to your cartSlice

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve cart details from Redux state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleQtyChange = (product, qty) => {
    dispatch(addTocart({ ...product, qty }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // Navigate to login with a redirect query parameter to shipping
    navigate("/login?redirect=/shipping");
  };

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-l-4 border-purple-500 pl-3">
          SHOPPING CART
        </h1>
        <p className="text-slate-400 text-xs mt-1">Review and manage your selected items</p>
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
            to="/"
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
              // Parse clean image URL
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
                      <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">No Image</div>
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
                    <p className="text-sm font-semibold text-purple-300">${item.price}</p>
                  </div>

                  {/* Quantity & Actions wrapper */}
                  <div className="flex items-center gap-4 sm:gap-6 justify-center">
                    {/* Quantity Selector */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] text-slate-400 text-center sm:text-left">Qty</label>
                      <select
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item, Number(e.target.value))}
                        className="bg-[#101011] border border-purple-500/30 rounded-lg py-1 px-3 text-xs text-white outline-none focus:border-purple-400 cursor-pointer"
                      >
                        {[...Array(item.countInStock || 10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Delete Action */}
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
    </div>
  );
};

export default Cart;