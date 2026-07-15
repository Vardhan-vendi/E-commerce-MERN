import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import { addTocart } from "../../redux/features/cart/cartSlice.js"; // Added cart action import
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const { userInfo } = useSelector((state) => state.user);

  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);
  const [createReview, { isLoading: isSubmittingReview }] = useCreateReviewMutation();

  // Local state for quantity and reviews
  const [qty, setQty] = useState(1); // Added qty state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addTocart({ ...product, qty }));
    toast.success("Item added to cart successfully!");
    navigate("/cart");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a review comment.");
      return;
    }

    try {
      await createReview({
        productId: id,
        rating,
        comment,
      }).unwrap();
      toast.success("Review submitted successfully!");
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Failed to submit review");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Error loading product details.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-purple-400 hover:underline">
          Go back home
        </button>
      </div>
    );
  }

  // Parse clean image URL (handles external URLs and backend uploads)
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image.replace(/\\/g, "/")}`
    : null;

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-8 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          ← Go Back
        </button>
      </div>

      {/* Main product display card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Product Image */}
        <div className="flex items-center justify-center border border-purple-500/20 bg-purple-950/5 rounded-2xl p-4 overflow-hidden relative min-h-[300px]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full max-h-96 object-contain rounded-xl hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <span className="text-slate-500">No Image Available</span>
          )}
        </div>

        {/* Right Side: Details */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
                {product.brand}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                ${product.price}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                product.countInStock > 0 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="text-slate-400">
                Quantity Available: <span className="text-white font-medium">{product.quantity}</span>
              </div>
              <div className="text-slate-400">
                Average Rating: <span className="text-amber-400 font-bold">★ {product.rating?.toFixed(1) || "0.0"}</span>
              </div>
            </div>

            {/* Quantity Selector Dropdown */}
            {product.countInStock > 0 && (
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 bg-white/5 border border-white/5 p-3 rounded-xl">
                <span>Select Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-[#101011] border border-purple-500/35 rounded-lg py-1.5 px-4 text-xs sm:text-sm text-white outline-none focus:border-purple-400 cursor-pointer"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-xs sm:text-sm"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Feedback Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8">
        <h3 className="text-lg font-bold text-purple-300 border-l-4 border-purple-500 pl-3">
          Customer Reviews ({product.reviews?.length || 0})
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Review input form */}
          <div className="lg:col-span-1 bg-purple-950/10 border border-purple-500/20 p-5 rounded-2xl h-fit">
            <h4 className="text-sm font-semibold text-white mb-4">Write a Customer Review</h4>
            {userInfo ? (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="rating" className="text-xs text-slate-400">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="bg-[#101011] border border-purple-500/35 rounded-lg py-2 px-3 text-sm text-white outline-none focus:border-purple-400"
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label htmlFor="comment" className="text-xs text-slate-400">Comment</label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-transparent border border-purple-500/35 rounded-lg py-2.5 px-3 text-xs text-white outline-none focus:border-purple-400 resize-none"
                    placeholder="Share your thoughts about this product..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 text-white disabled:opacity-50"
                >
                  {isSubmittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <p className="text-xs text-slate-400">
                Please <span className="text-purple-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>sign in</span> to write a review.
              </p>
            )}
          </div>

          {/* Reviews list */}
          <div className="lg:col-span-2 space-y-4 max-h-[400px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2 shadow-sm"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-purple-300">{review.name}</span>
                    <span className="text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs text-amber-400">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-xs py-10 text-center border border-dashed border-white/10 rounded-xl">
                No reviews yet. Be the first to leave one!
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;