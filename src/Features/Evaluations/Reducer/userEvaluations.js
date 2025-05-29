import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const saveUserEvaluationsProgress = createAsyncThunk(
  "userEvaluations/saveUserEvaluationsProgress",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data to API:", data); // Debug log
      const response = await api.post("/u/user-evaluations", data);
      const responseData = response.data;

      // More flexible response handling
      if (responseData.error) {
        return rejectWithValue(responseData.error);
      }

      return responseData;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);

      // Return more specific error message
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message || "Terjadi kesalahan");
      }
    }
  }
);

const userEvaluationsSlice = createSlice({
  name: "userEvaluations",
  initialState: {
    status: "idle",
    error: null,
    data: [],
  },
  reducers: {
    // Add a reducer to clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserEvaluationsProgress.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(saveUserEvaluationsProgress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(saveUserEvaluationsProgress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = userEvaluationsSlice.actions;
export default userEvaluationsSlice.reducer;
