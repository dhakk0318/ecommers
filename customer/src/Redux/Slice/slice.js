import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  subcategories: {}, // Store subcategories as an object with categoryId as keys
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesAction: (state, action) => {
      state.categories = action.payload; // Store categories
    },
    fetchSubcategoriesAction: (state, action) => {
      const { categoryId, subcategories } = action.payload;
      state.subcategories[categoryId] = subcategories; // Store subcategories by category ID
    },
  },
});

// Export the action creators
export const { fetchCategoriesAction, fetchSubcategoriesAction } = categorySlice.actions;
export const { reducer: categoryReducer } = categorySlice;
