
//customer action
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to create a customer
export const createCustomer = createAsyncThunk('customer/create', async (customerData) => {
  const response = await axios.post('http://localhost:3000/api/customers', customerData);
  return response.data;
});

// Async thunk to login a customer
export const loginCustomer = createAsyncThunk('customer/login', async (credentials) => {
  const response = await axios.post('http://localhost:3000/api/customers/login', credentials);
  return response.data;
});

// Async thunk to verify OTP
export const verifyOTP = createAsyncThunk('customer/verifyOTP', async (otpData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/customers/verify-otp', otpData, {
      withCredentials: true, // This line is crucial
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});


// Async thunk to update customer
export const updateCustomer = createAsyncThunk('http://localhost:3000/api/customers/update', async ({ cid, updates }) => {
  const response = await axios.patch(`/api/customers/${cid}`, updates);
  return response.data;
});

// Async thunk to logout customer
export const logoutCustomer = createAsyncThunk('http://localhost:3000/api/customers/logout', async () => {
  const response = await axios.post('/api/customers/logout');
  return response.data;
});

