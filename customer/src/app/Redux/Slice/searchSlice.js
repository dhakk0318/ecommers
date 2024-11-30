import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch subcategories based on search query
export const fetchSubcategories = createAsyncThunk(
  'search/fetchSubcategories',
  async (searchQuery) => {
    const response = await axios.get(`http://localhost:3000/api/subcategories/search/${searchQuery}`);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    subcategories: [],
    status: 'idle', 
    error: null
  },
  reducers: {
    clearSearch: (state) => {
      state.subcategories = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subcategories = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
