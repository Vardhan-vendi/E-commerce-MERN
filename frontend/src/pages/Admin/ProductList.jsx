import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/productApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";

const ProductList = () => {
  const navigate = useNavigate();
  const { data: responseData, isLoading: productsLoading, refetch } = useGetAllProductsQuery();
  const { data: categoriesData = [], isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();

  // Safely extract the products array from the backend response structure
  const products = Array.isArray(responseData)
    ? responseData
    : responseData?.products && Array.isArray(responseData.products)
    ? responseData.products
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error || "Delete failed");
      }
    }
  };

  if (productsLoading || categoriesLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getProductsByCategory = (categoryId) => {
    return products.filter((p) => {
      const pCat = p.category?._id || p.category;
      return pCat === categoryId;
    });
  };

  return (
    /* Outer page wrapper (scrollbar hidden, responsive padding) */
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      
      {/* Header section (flex-wrap for mobile responsiveness) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight flex items-center flex-wrap gap-3">
          <span>Product Dashboard</span>
          <span className="text-sm font-bold border border-white/45 text-white bg-white/5 px-2.5 py-1 rounded-lg">
            {products.length}
          </span>
        </h2>
      </div>

      {/* Main vertical content area */}
      <div className="flex-1 space-y-8 sm:space-y-10 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
        {categories.map((cat) => {
          const categoryProducts = getProductsByCategory(cat._id);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat._id} className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-purple-300 flex items-center gap-2 border-l-4 border-purple-500 pl-3">
                {cat.name}
                <span className="text-xs bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-full text-slate-300">
                  {categoryProducts.length}
                </span>
              </h3>

              {/* Horizontal category scrollbar with native mobile swipe snap-scrolling */}
              <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
                {categoryProducts.map((product) => (
                  <div
                    key={product._id}
                    className="w-56 sm:w-64 flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 p-4 rounded-2xl flex flex-col justify-between shadow-lg hover:-translate-y-1 transition-all duration-300 snap-start"
                  >
                    {/* Image Container */}
                    <div className="w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-purple-500/20 bg-purple-950/20 relative mb-3">
                      {product.image ? (
                        <img
                          src={product.image}
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

                    {/* Metadata */}
                    <div className="space-y-1 mb-4">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                        Brand: <span className="text-purple-300">{product.brand}</span>
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Stock: {product.countInStock} available
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/product/update/${product._id}`)}
                        className="flex-1 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-[11px] sm:text-xs font-semibold rounded-lg shadow transition-all active:scale-95 text-white"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id, product.name)}
                        className="px-2.5 sm:px-3 py-1.5 bg-red-950/20 border border-red-500/40 hover:bg-red-900/40 hover:border-red-400 text-[11px] sm:text-xs font-semibold rounded-lg text-red-400 transition-all active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {products.length === 0 && (
          <div className="w-full text-center py-20 border border-dashed border-purple-500/20 rounded-2xl bg-purple-950/5">
            <p className="text-slate-400 text-sm">No products found.</p>
          </div>
        )}
      </div>

      {/* Floating Plus Button (Responsive placement closer to the screen edges on mobile) */}
      <Link
        to="/admin/product/create"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
        title="Add Product"
      >
        <svg
          className="w-5 sm:w-6 h-5 sm:h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
    </div>
  );
};

export default ProductList;