import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// Ambil semua units
export const fetchQuestionsLink = createAsyncThunk(
  "questionsLink/fetchQuestionsLink",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/a/question-links");

      // Axios tidak menggunakan response.ok
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData;
    } catch (error) {
      return rejectWithValue("Tolong login kembali");
    }
  }
);
//  question id
export const fetchQuestionsLinkByIdForEvaluations = createAsyncThunk(
  "questionsLink/fetchQuestionsLinkByIdForEvaluations",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/questions${id}/questionsEvaluation`);
      const responseData = response.data;
      if (!responseData.data || !Array.isArray(responseData.data)) {
        return rejectWithValue("Format data tidak valid");
      }
      return responseData;
    } catch (error) {
      return rejectWithValue("Terjadi kesalahan");
    }
  }
);

const questionsLinkSlice = createSlice({
  name: "questionsLink",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsLink.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchQuestionsLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   questionsEvaluation 
        .addCase(fetchQuestionsLinkByIdForEvaluations.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuestionsLinkByIdForEvaluations.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data;
        })
        .addCase(fetchQuestionsLinkByIdForEvaluations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export default questionsLinkSlice.reducer;
