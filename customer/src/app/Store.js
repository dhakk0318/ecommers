import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "../app/Redux/Slice/slice";
import searchReducer from "../app/Redux/Slice/searchSlice";
import customerReducer from "../app/Redux/Slice/customerSlice";
import cartReducer from "../app/Redux/Slice/cartSlice";
import profileReducer from "../app/Redux/Slice/profileSlice";

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    customer: customerReducer,
    search: searchReducer,
    cart: cartReducer,
    profiles: profileReducer,
  },
});

export default store;
