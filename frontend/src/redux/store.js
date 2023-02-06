import { configureStore } from "@reduxjs/toolkit";
import categoryReducers from "./Slices/Category/category"
import userReducers from "./Slices/Users/user"
import post from "./Slices/Post/post"
export const store = configureStore({
  reducer: {
   users : userReducers,
   category : categoryReducers,
   post
  },

});
