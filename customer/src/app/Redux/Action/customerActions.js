// customerActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const createCustomer = createAsyncThunk(
  "customer/create",
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers",
        customerData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const loginCustomer = createAsyncThunk(
  "customer/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers/login",
        credentials,
        { withCredentials: true } // Add this line
      );
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers/verify-otp",
        otpData,
        { withCredentials: true } // Add this line
      );
      console.log(response.data, "from acgtion verify otp ")
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ cid, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/customers/${cid}`,
        updates
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutCustomer = createAsyncThunk(
  "customer/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers/logout"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCustomerDetails = createAsyncThunk(
  "customer/fetchDetails",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/customers/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

 