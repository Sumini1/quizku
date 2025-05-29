import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchQuestionsSurvey = createAsyncThunk(
  "questionsSurvey/fetchQuestionsSurvey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/u/survey-questions");
      
     const responseData = response.data;

     // Kalau data langsung array (bukan nested dalam `.data`)
     if (!Array.isArray(responseData)) {
       return rejectWithValue("Format data tidak valid");
     }

     return responseData;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Terjadi kesalahan"
      );
    }
  }
);

const questionsSurveySlice = createSlice({
  name: "questionsSurvey",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsSurvey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsSurvey.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuestionsSurvey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionsSurveySlice.reducer;
