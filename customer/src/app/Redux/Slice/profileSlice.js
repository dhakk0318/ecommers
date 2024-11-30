// // src/slices/profileSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { fetchProfiles, addProfile, updateProfile } from '../Action/profileActions';

// // Create slice
// const profileSlice = createSlice({
//   name: 'profiles',
//   initialState: {
//     profiles: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfiles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProfiles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.profiles = action.payload;
//       })
//       .addCase(fetchProfiles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addProfile.fulfilled, (state, action) => {
//         state.profiles.push(action.payload); // Add new profile
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         const index = state.profiles.findIndex((profile) => profile.cid === action.payload.cid);
//         if (index !== -1) {
//           state.profiles[index] = action.payload; // Update profile
//         }
//       });
//   },
// });

// export default profileSlice.reducer;

// src/slices/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchProfiles, addProfile, updateProfile, fetchCustomerData } from '../../Redux/Action/profileActions';

// Create slice
const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [],
    customer: null, // Add customer field to store name and cid
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex((profile) => profile.cid === action.payload.cid);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(fetchCustomerData.fulfilled, (state, action) => {
        state.customer = action.payload; // Store customer name and cid
      });
  },
});

export default profileSlice.reducer;
