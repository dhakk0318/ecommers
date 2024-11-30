// src/features/cart/cartActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Base URL (adjust accordingly)
const API_URL = 'http://localhost:3000/api/cart';

// Fetch Cart Items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/card/items/${cartId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Add Item to Cart
export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ cid, pid, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, {
        cid,
        pid,
        quantity,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Create Cart
export const createCart = createAsyncThunk(
  'cart/createCart',
  async (cid, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, { cid });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const rehydrateCart = createAsyncThunk(
  'cart/rehydrateCart',
  async (cartData, { rejectWithValue }) => {
    try {
      return cartData;
    } catch (error) {
      return rejectWithValue('Rehydration failed');
    }
  }
);

// src/features/cart/cartActions.js

// Update Item Quantity
export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cartId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/${cartId}`, { quantity });
      return response.data; // Assuming this will return the updated item details
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Remove Item from Cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/remove/${cartId}`);
      return cartId; // Return the cartId of the removed item
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
