// customerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCustomer,
  loginCustomer,
  verifyOTP,
  updateCustomer,
  logoutCustomer,
  fetchCustomerDetails,
} from "../../Redux/Action/customerActions"; // Importing actions

const initialState = {
  customer: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Customer slice
const customerSlice = createSlice({
  name: "customer",
  initialState,
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        console.log(action.payload.customer,"form slice");
        state.status = "succeeded";
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(loginCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.status = "succeeded";
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        console.log(action.payload.customer,"form slice");
        state.status = "succeeded";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload.customer;
        state.status = "succeeded";
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(logoutCustomer.fulfilled, (state) => {
        state.customer = null;
        state.status = "idle";
      })
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.status = "loading"; // Set loading state when fetching details
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.customer = action.payload; // Store the fetched customer details
        state.status = "succeeded"; // Set status to succeeded
      })
      
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.error = action.payload.message || "Failed to fetch customer details"; // Ensure meaningful error message
        state.status = "failed";
      });
      
  },
});


export default customerSlice.reducer;
