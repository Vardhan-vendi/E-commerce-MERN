import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],   // list of selected categories
  brands: [],       // list of selected brands
  checked: [],      // list of checked category IDs
  radio: [],        // price range selection (e.g. [min, max])
  brand: "",        // currently filtered single brand
  searchQuery: "",  // search search text
  sort: "",         // sorting order (e.g., "low-to-high", "newest")
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    resetFilters: (state) => {
      state.categories = [];
      state.brands = [];
      state.checked = [];
      state.radio = [];
      state.brand = "";
      state.searchQuery = "";
      state.sort = "";
    },
  },
});

export const {
  setCategories,
  setBrands,
  setChecked,
  setRadio,
  setBrand,
  setSearchQuery,
  setSort,
  resetFilters,
} = shopSlice.actions;

export default shopSlice.reducer;