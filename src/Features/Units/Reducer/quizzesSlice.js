import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// Ambil semua quiz
export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("u/quizzes");
      const responseData = response.data;

      if (!responseData?.data || !Array.isArray(responseData.data)) {
        return rejectWithValue("Format data tidak valid");
      }

      return responseData.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      return rejectWithValue(errorMessage);
    }
  }
);

// Ambil quiz berdasarkan ID
export const fetchQuizById = createAsyncThunk(
  "quizzes/fetchQuizById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/quizzes/${id}`);
      const responseData = response.data;

      if (!responseData?.data || !Array.isArray(responseData.data)) {
        return rejectWithValue("Format data tidak valid");
      }

      return responseData.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Terjadi kesalahan";
      return rejectWithValue(errorMessage);
    }
  }
);

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: {
    status: "idle",
    error: null,
    data: [],
    detail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all quizzes
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetch quiz by ID
      .addCase(fetchQuizById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default quizzesSlice.reducer;
