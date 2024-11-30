// src/actions/profileActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Existing actions
export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/customer/profiles"
    );
    return response.data;
  }
);

export const addProfile = createAsyncThunk(
  "profiles/addProfile",
  async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    const response = await axios.post(
      "http://localhost:3000/api/customer/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  async (profileData) => {
    const formData = new FormData();
    Object.keys(profileData).forEach((key) => {
      formData.append(key, profileData[key]);
    });

    const response = await axios.put(
      `http://localhost:3000/api/customer/profile/${profileData.cid}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const fetchCustomerData = createAsyncThunk(
  "profiles/fetchCustomerData",
  async (_, { getState }) => {
    const token = getState().auth?.token; // Assuming token is stored in auth slice of state
    const response = await axios.get(
      "http://localhost:3000/api/customers/protected",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        withCredentials: true, // Include credentials if using cookies for authentication
      }
    );
    return response.data;
  }
);
