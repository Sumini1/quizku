import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../../Features/Auth/Reducer/axios";

export const saveUserCreate = createAsyncThunk(
  "userProfile/saveUserCreate",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data to API:", data); // Debug log

      // Validate data before sending
      const cleanData = {};
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          cleanData[key] = data[key];
        }
      });

      console.log("Cleaned data to send:", cleanData);

      const response = await api.put("/u/users-profiles", cleanData);
      console.log("API Response:", response);

      const responseData = response.data;

      // More flexible response handling
      if (responseData.error || responseData.status === "error") {
        return rejectWithValue(responseData.message || responseData.error);
      }

      return responseData;
    } catch (error) {
      console.error("Full API Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Data:", error.response?.data);

      // Return more specific error message
      if (error.response?.status === 500) {
        return rejectWithValue(
          "Server error: " +
            (error.response?.data?.message || "Internal server error")
        );
      } else if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response?.status) {
        return rejectWithValue(
          `HTTP ${error.response.status}: ${error.response.statusText}`
        );
      } else {
        return rejectWithValue(error.message || "Terjadi kesalahan");
      }
    }
  }
);

// userprofiles get me
export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching user profile...");
      const response = await api.get("/u/users-profiles/me");
      console.log("Get profile response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Get Profile API Error:", error);
      console.error("Get Profile Error Response:", error.response?.data);

      if (error.response?.status === 404) {
        return rejectWithValue("Profil belum dibuat");
      } else if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          error.message || "Terjadi kesalahan saat mengambil profil"
        );
      }
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Added setUser reducer for manual user data updates
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Added clearError reducer to clear errors manually
    clearError: (state) => {
      state.error = null;
    },
    // Added clearUser reducer to clear user data
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // saveUserCreate cases
      .addCase(saveUserCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUserCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Changed from 'data' to 'user'
      })
      .addCase(saveUserCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // getUserProfile cases
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // Changed from 'data' to 'user'
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { setUser, clearError, clearUser } = userProfileSlice.actions;

export default userProfileSlice.reducer;
