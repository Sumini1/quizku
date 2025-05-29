import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const saveUserExamsProgress = createAsyncThunk(
  "userExams/saveUserExamsProgress",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Sending data to API:", data); // Debug log
      const response = await api.post("/u/user-exams", data);
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

const initialState = {
  status: "idle",
  error: null,
  data: [],
};

const userExamsSlice = createSlice({
  name: "userExams",
  initialState, // ✅ ini yang wajib
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserExamsProgress.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(saveUserExamsProgress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(saveUserExamsProgress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});


export const { clearError } = userExamsSlice.actions;
export default userExamsSlice.reducer;