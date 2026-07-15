import { createSlice } from "@reduxjs/toolkit";

// Load initial favorites from localStorage
const getFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: getFavoritesFromLocalStorage(),
  reducers: {
    addToFavorites: (state, action) => {
      // Check if product is already in favorites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state));
      }
    },
    removeFromFavorites: (state, action) => {
      // Filter out by product _id
      const updatedState = state.filter((product) => product._id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(updatedState));
      return updatedState;
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } = favoritesSlice.actions;

// Selector to get favorite products list
export const selectFavoriteProducts = (state) => state.favorites;

export default favoritesSlice.reducer;