

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Register
export const registerPatient = createAsyncThunk(
  "auth/register",
  async (phone, thunkAPI) => {
    try {
      return await authService.register(phone);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Login
export const loginPatient = createAsyncThunk(
  "auth/login",
  async (phone, thunkAPI) => {
    try {
      return await authService.login(phone);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create profile
export const createPatientProfile = createAsyncThunk(
  "auth/createProfile",
  async (profileData, thunkAPI) => {
    try {
      return await authService.createProfile(profileData);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get profile
export const getPatientProfile = createAsyncThunk(
  "auth/getProfile",
  async (patient_id, thunkAPI) => {
    try {
      return await authService.getProfile(patient_id);
     
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update profile ✅ FIXED
export const updatePatientProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ patient_id, profileData }, thunkAPI) => {
    try {
      return await authService.updateProfile(patient_id, profileData); // pass 2 args
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    profile: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.profile = null;
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginPatient.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(createPatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getPatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
