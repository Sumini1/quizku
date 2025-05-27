import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchQuestions = createAsyncThunk(
    "questions/fetchQuestions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/u/questions");
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

// question quizz
export const fetchQuestionsById = createAsyncThunk(
    "questions/fetchQuestionsById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/questions/${id}/questionsQuiz`);
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

const questionSlice = createSlice({
    name: "questions",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {  
                state.loading = false;
                state.error = action.payload;
            })  
            .addCase(fetchQuestionsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestionsById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchQuestionsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default questionSlice.reducer;
