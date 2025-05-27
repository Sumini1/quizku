// src/features/Reducer/evaluationsQuestionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchEvaluationsQuestions = createAsyncThunk(
  "evaluationsQuestions/fetchEvaluationsQuestions",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/question/${id}/questionsEvaluation`);
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        return rejectWithValue("Format data tidak valid");
      }

      return responseData.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Terjadi kesalahan"
      );
    }
  }
);

const evaluationsQuestionsSlice = createSlice({
  name: "evaluationsQuestions",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearEvaluationsQuestions: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvaluationsQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvaluationsQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvaluationsQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEvaluationsQuestions } = evaluationsQuestionsSlice.actions;
export default evaluationsQuestionsSlice.reducer;
