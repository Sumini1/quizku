import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchQuizQuestions = createAsyncThunk(
    "quizQuestions/fetchQuizQuestions",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/question/${id}/questionsQuiz`);
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

const quizQuestionsSlice = createSlice({
    name: "quizQuestions",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchQuizQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default quizQuestionsSlice.reducer;