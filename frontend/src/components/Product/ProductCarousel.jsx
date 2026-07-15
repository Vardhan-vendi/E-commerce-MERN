import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCarousel = ({ products = [] }) => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!products.length) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % products.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [products.length]);

  if (!products.length) return null;

  const currentProduct = products[activeSlide];

  // Fix: Check if image is an external URL (starts with http/https) or local backend path
  const imageUrl = currentProduct?.image
    ? currentProduct.image.startsWith("http")
      ? currentProduct.image
      : `http://localhost:5000${currentProduct.image.replace(/\\/g, "/")}`
    : null;

  return (
    /* Added relative and flex-shrink-0 to prevent collapsing in flex layouts */
    <div className="relative border w-full h-[400px] sm:h-[450px] flex-shrink-0 rounded-3xl overflow-hidden bg-[#101424] shadow-2xl flex border-white/10">

      {/* LEFT: Text & Info */}
      <div className="w-1/2 p-6 sm:p-10 flex flex-col justify-center text-white z-10">
        <p className="uppercase text-xs tracking-widest text-purple-400 font-bold">
          {currentProduct.brand}
        </p>

        <h1 className="text-2xl sm:text-4xl font-bold mt-3 leading-tight line-clamp-2">
          {currentProduct.name}
        </h1>

        <div className="flex items-center gap-4 mt-4 text-xs sm:text-sm">
          <span className="bg-purple-600 px-3 py-1 rounded-full text-white text-[10px] sm:text-xs">
            ★ {currentProduct.rating?.toFixed(1) || "5.0"}
          </span>
          <span className="font-semibold text-purple-300">
            {currentProduct.price > 0 ? `$${currentProduct.price}` : "Featured"}
          </span>
          <span className="text-slate-400">Stock: {currentProduct.countInStock || 0}</span>
        </div>

        <p className="mt-5 text-xs sm:text-sm text-gray-300 line-clamp-3">
          {currentProduct.description}
        </p>

        <button
          onClick={() => navigate(`/product/${currentProduct._id}`)}
          className="mt-8 w-fit px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold uppercase tracking-wider"
        >
          Buy Now
        </button>
      </div>

      {/* RIGHT: Product Image */}
      <div className="relative w-1/2 h-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={currentProduct.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-xs">
            No Image
          </div>
        )}
        {/* Angled faded overlay divider */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#101424]" />
      </div>

      {/* Dots (Positioned correctly at the bottom of the relative carousel) */}
      <div className="absolute bottom-5 left-6 sm:left-10 flex gap-2 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`transition-all duration-10 outline-none ${
              activeSlide === index
                ? "w-6 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
                : "w-2 h-2 rounded-full bg-gray-500 hover:bg-gray-400"
            }`}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default ProductCarousel;