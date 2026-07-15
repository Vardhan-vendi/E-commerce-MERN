import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons
import {
  addToFavorites,
  removeFromFavorites,
  selectFavoriteProducts,
} from "../../redux/favourites/favoritesSlice.js";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current list of favorites
  const favorites = useSelector(selectFavoriteProducts) || [];

  // Check if this product is already favorited
  const isFavorite = favorites.some((fav) => fav._id === product._id);

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // CRITICAL: Stops the card click event so it doesn't navigate to the product page!
    if (isFavorite) {
      dispatch(removeFromFavorites(product._id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image.replace(/\\/g, "/")}`
    : null;

  return (
    <div
      onClick={handleProductClick}
      className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 p-4 rounded-2xl flex flex-col justify-between cursor-pointer shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
    >
      {/* Product Image Area */}
      <div className="w-full h-32 sm:h-40 rounded-xl overflow-hidden border border-purple-500/20 bg-purple-950/20 relative mb-3">
        {/* Heart Icon Toggle Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 left-2 p-2 rounded-full bg-[#101424]/60 backdrop-blur-md border border-white/10 text-white hover:text-red-500 hover:scale-110 active:scale-95 transition-all z-20"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 w-4 h-4 transition-colors" />
          ) : (
            <FaRegHeart className="w-4 h-4 hover:text-red-400" />
          )}
        </button>

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-purple-900/80 border border-purple-500/40 text-[10px] font-semibold text-purple-200 px-2.5 py-0.5 rounded-full">
          ${product.price}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
          {product.name}
        </h4>
        <p className="text-[10px] sm:text-xs text-slate-400 truncate">
          {product.brand}
        </p>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-amber-400">
          <span>★</span>
          <span>{product.rating?.toFixed(1) || "0.0"}</span>
          {product.numReviews !== undefined && (
            <span className="text-slate-500 text-[10px] ml-1">
              ({product.numReviews})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
