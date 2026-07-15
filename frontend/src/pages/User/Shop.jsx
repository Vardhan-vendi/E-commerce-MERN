import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllProductsQuery,
  useGetFilteredProductsQuery, // Added backend filter query
} from "../../redux/api/ProductApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/CategoryApiSlice.js";
import {
  setChecked,
  setRadio,
  setBrands,
  setSearchQuery,
  setSort,
  resetFilters,
} from "../../redux/features/shop/shopSlice.js";
import ProductCard from "../../components/Product/ProductCard.jsx";

const Shop = () => {
  const dispatch = useDispatch();

  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [brandsExpanded, setBrandsExpanded] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);

  // Retrieve shop filter states from Redux
  const {
    checked,
    radio,
    brands: selectedBrands,
    searchQuery,
    sort,
  } = useSelector((state) => state.shop);

  // 1. Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetAllCategoriesQuery();

  // 2. Fetch all products to dynamically extract unique brands for the filter sidebar
  const { data: allProductsData = [] } = useGetAllProductsQuery();
  const allProducts = Array.isArray(allProductsData)
    ? allProductsData
    : allProductsData?.products || [];

  const uniqueBrands = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean)),
  );

  // 3. Fetch filtered products directly from backend route using RTK Query
  const { data: filteredData = [], isLoading: productsLoading } =
    useGetFilteredProductsQuery({
      checked,
      radio,
    });

  const filteredProducts = Array.isArray(filteredData)
    ? filteredData
    : filteredData?.products || [];

  // Handle Category check/uncheck
  const handleCategoryCheck = (value, id) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(id);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
    dispatch(setChecked(updatedChecked));
  };

  // Handle Brand check/uncheck
  const handleBrandCheck = (value, brandName) => {
    let updatedBrands = [...selectedBrands];
    if (value) {
      updatedBrands.push(brandName);
    } else {
      updatedBrands = updatedBrands.filter((b) => b !== brandName);
    }
    dispatch(setBrands(updatedBrands));
  };

  // Apply Brand & Search Filter on the backend-filtered results locally
  const finalFilteredProducts = filteredProducts.filter((product) => {
    // Brand Filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Keyword Search Filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  // Apply Sort
  const sortedProducts = [...finalFilteredProducts].sort((a, b) => {
    if (sort === "price-low") {
      return a.price - b.price;
    }
    if (sort === "price-high") {
      return b.price - a.price;
    }
    if (sort === "rating") {
      return b.rating - a.rating;
    }
    return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
  });

  // Cleanup filters on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const priceRanges = [
    { name: "All Prices", value: [] },
    { name: "$0 to $50", value: [0, 50] },
    { name: "$50 to $100", value: [50, 100] },
    { name: "$100 to $200", value: [100, 200] },
    { name: "$200 to $500", value: [200, 500] },
    { name: "$500+", value: [500, 1000000] },
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row p-4 sm:p-6 gap-6 md:overflow-hidden overflow-y-auto">
      {/* ── Left Column: Filters Sidebar (Scrollbars Transparent) ── */}
      <div className="w-full md:w-64 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col space-y-6 h-auto md:h-full md:overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Filters
          </h2>
          <button
            onClick={() => dispatch(resetFilters())}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Filter by Category */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setCategoriesExpanded(!categoriesExpanded)}
            className="w-full flex items-center justify-between text-left md:pointer-events-none focus:outline-none"
          >
            <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              Categories
            </h3>
            <span className="text-purple-300 md:hidden transition-transform duration-200">
              {categoriesExpanded ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          <div className={`space-y-2 md:block ${categoriesExpanded ? "block" : "hidden"}`}>
            {categoriesLoading ? (
              <div className="space-y-2 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-white/5 rounded w-3/4" />
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
                {categories.map((c) => (
                  <label
                    key={c._id}
                    className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={checked.includes(c._id)}
                      onChange={(e) =>
                        handleCategoryCheck(e.target.checked, c._id)
                      }
                      className="accent-purple-500 rounded border-white/10 bg-transparent focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter by Brand */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setBrandsExpanded(!brandsExpanded)}
            className="w-full flex items-center justify-between text-left md:pointer-events-none focus:outline-none"
          >
            <h3 className="text-xs font-bold text-pink-400 uppercase tracking-wider">
              Brands
            </h3>
            <span className="text-pink-400 md:hidden transition-transform duration-200">
              {brandsExpanded ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          <div className={`space-y-2 md:block ${brandsExpanded ? "block" : "hidden"}`}>
            <div className="space-y-2 max-h-40 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
              {uniqueBrands.map((brandName) => (
                <label
                  key={brandName}
                  className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brandName)}
                    onChange={(e) =>
                      handleBrandCheck(e.target.checked, brandName)
                    }
                    className="accent-purple-500 rounded border-white/10 bg-transparent focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                  />
                  <span>{brandName}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Filter by Price */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setPriceExpanded(!priceExpanded)}
            className="w-full flex items-center justify-between text-left md:pointer-events-none focus:outline-none"
          >
            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Price Range
            </h3>
            <span className="text-indigo-400 md:hidden transition-transform duration-200">
              {priceExpanded ? (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          <div className={`space-y-2 md:block ${priceExpanded ? "block" : "hidden"}`}>
            <div className="space-y-2">
              {priceRanges.map((range, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white"
                >
                  <input
                    type="radio"
                    name="price-range"
                    checked={
                      JSON.stringify(radio) === JSON.stringify(range.value)
                    }
                    onChange={() => dispatch(setRadio(range.value))}
                    className="accent-purple-500 bg-transparent border-white/10 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                  />
                  <span>{range.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Column: Products Display ── */}
      <div className="flex-1 flex flex-col space-y-6 h-auto md:h-full md:overflow-hidden">
        {/* Top Action Bar (Search & Sort) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search products or brands..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 outline-none focus:border-purple-500/50 transition-colors"
            />
            <svg
              className="w-4 h-4 text-slate-500 absolute left-3 top-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Result Count and Sorting */}
          <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
            <span className="text-xs text-slate-400">
              Showing {sortedProducts.length} results
            </span>

            <select
              value={sort}
              onChange={(e) => dispatch(setSort(e.target.value))}
              className="bg-[#101011] border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-purple-500/50 cursor-pointer"
            >
              <option value="">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid (Scrollbars Transparent) */}
        <div className="flex-grow overflow-visible md:overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {sortedProducts.map((product) => (
                <div key={product._id} className="h-64 sm:h-72">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            /* No Results Empty State */
            <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-white/5 border border-white/10 rounded-2xl">
              <svg
                className="w-12 h-12 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-white">
                  No products found
                </h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
