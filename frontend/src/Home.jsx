import React, { useState, useEffect } from "react";
import {
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetAllProductsQuery,
} from "./redux/api/productApiSlice.js";
import ProductCarousel from "./components/Product/ProductCarousel.jsx"; 
import ProductCard from "./components/Product/ProductCard.jsx";

const Home = () => {
  // Fetch data from Redux queries
  const { data: topProducts = [], isLoading: topLoading } = useGetTopProductsQuery();
  const { data: newProducts = [], isLoading: newLoading } = useGetNewProductsQuery();
  const { data: allProductsData = [], isLoading: allLoading } = useGetAllProductsQuery();

  // Safely extract all products array
  const allProducts = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products || [];

  // Fallback: Use topProducts first, if empty, fall back to allProducts
  const featuredProducts =
    topProducts.length > 0 ? topProducts.slice(0, 5) : allProducts.slice(0, 5);

  // Static Premium Mock slides to guarantee the carousel ALWAYS exists instantly
  const mockSlides = [
    {
      _id: "mock-welcome",
      name: "Welcome to MV Store",
      brand: "Exclusive Collection",
      price: 0,
      rating: 5,
      description:
        "Discover our curated collections of premium fashionwear, high-end electronics, and smart gadgets.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      _id: "mock-tech",
      name: "Upgrade Your Tech Gear",
      brand: "Next-Gen Devices",
      price: 299,
      rating: 4.9,
      description:
        "Unleash high-fidelity sound, stunning displays, and next-generation smart accessories at exclusive prices.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    },
    {
      _id: "mock-trends",
      name: "Redefine Your Style",
      brand: "Summer Trends",
      price: 79,
      rating: 4.8,
      description:
        "Step out in comfort and class with premium cotton wear, lightweight jackets, and matching footwear.",
      image:
        "https://images.unsplash.com/photo-1441984969733-d018a3a31c5d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const slidesToRender = featuredProducts.length > 0 ? featuredProducts : mockSlides;

  const SectionLoader = () => (
    <div className="flex gap-6 overflow-x-hidden py-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="w-56 sm:w-64 h-56 rounded-2xl bg-white/5 animate-pulse"
        />
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-10 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      
      {/* ── Large Centered Premium Brand Header ── */}
      <div className="flex flex-col items-center justify-center py-8 select-none space-y-4">
        {/* Centered Brand Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer">
          <span className="text-white font-black text-2xl tracking-tighter">MV</span>
        </div>
        
        {/* Large Logo Text Wordmark */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)] uppercase">
          MV <span className="text-white font-light">STORE</span>
        </h1>
        
        {/* Luxury Subtext Rule Lines */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-[9px] uppercase tracking-[0.45em] text-slate-400 font-bold">
            PREMIUM COLLECTION
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>

      {/* Featured Products Carousel Slider */}
      {topLoading || allLoading ? (
        <div className="w-full h-72 sm:h-80 rounded-3xl bg-white/5 animate-pulse" />
      ) : (
        <ProductCarousel products={slidesToRender} />
      )}

      {/* Top Rated Products Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-300 border-l-4 border-purple-500 pl-3">
          Top Rated Products
        </h3>
        {topLoading ? (
          <SectionLoader />
        ) : (
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
            {topProducts.map((product) => (
              <div key={product._id} className="w-56 sm:w-64 flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Arrivals Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-pink-400 border-l-4 border-pink-500 pl-3">
          New Arrivals
        </h3>
        {newLoading ? (
          <SectionLoader />
        ) : (
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
            {newProducts.map((product) => (
              <div key={product._id} className="w-56 sm:w-64 flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Explore Our Collection Section */}
      <div id="explore" className="space-y-6 pt-4">
        <h3 className="text-lg font-semibold text-indigo-300 border-l-4 border-indigo-500 pl-3">
          Explore Our Collection
        </h3>
        {allLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;