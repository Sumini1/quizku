import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchExamsQuestions = createAsyncThunk(
    "examsQuestions/fetchExamsQuestions",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/question/${id}/questionsExam`);
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

const examsQuestionsSlice = createSlice({
  name: "examsQuestions",
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
      .addCase(fetchExamsQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamsQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExamsQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEvaluationsQuestions } = examsQuestionsSlice.actions;
export default examsQuestionsSlice.reducer;

