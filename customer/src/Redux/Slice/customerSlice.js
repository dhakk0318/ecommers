import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  customer: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

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
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const verifyOTP = createAsyncThunk('customer/verifyOTP', async (otpData, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('http://localhost:3000/api/customers/verify-otp', otpData, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });
// Async thunk for OTP verification
export const verifyOTP = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/customers/verify-otp",
        otpData
      );
      return response.data; // Assuming response contains user info and token
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
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
      // Handling fetchCustomerDetails
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.customer = action.payload; // assuming payload contains customer data
        state.status = "succeeded";
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default customerSlice.reducer;
