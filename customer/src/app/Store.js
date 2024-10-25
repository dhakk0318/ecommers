import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from '../Redux/Slice/slice';
import searchReducer from '../Redux/Slice/searchSlice';
import customerReducer from '../Redux/Slice/customerSlice'; // Import without curly braces
 const store = configureStore({
  reducer: {
    categories: categoryReducer,
    customer: customerReducer,
    search: searchReducer,
   },
});

export default store;
