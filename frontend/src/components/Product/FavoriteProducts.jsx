import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFavoriteProducts } from "../../redux/favourites/favoritesSlice.js";
import ProductCard from "../Product/ProductCard.jsx";

const Favorites = () => {
  const navigate = useNavigate();

  // Retrieve favorites list from Redux
  const favoriteProducts = useSelector(selectFavoriteProducts) || [];

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-10 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      {/* Centered Brand Title Header */}
      <div className=" py-6 select-none">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-l-4 border-purple-500 pl-3">
          FAVORITE PRODUCTS
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2">
          Your personal wishlist of premium items
        </p>
      </div>

      {/* Favorites Display */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State Illustration / Message */
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg relative">
            <span className="text-slate-500 text-4xl select-none animate-pulse">
              ♥
            </span>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white">
              Your wishlist is empty
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Explore our premium collections and add items you love to your
              favorites list.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
          >
            Go to Store
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
