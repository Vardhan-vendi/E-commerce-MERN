import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import userReducer from './features/User/userSlice.js'
import favoritesReducer from './favourites/favoritesSlice.js'
import cartReducer from './features/cart/cartSlice.js'
import shopReducer from './features/shop/shopSlice.js'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user : userReducer,
    favorites: favoritesReducer,
    cart : cartReducer,
    shop: shopReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools : true
});


setupListeners(store.dispatch)

export default store;