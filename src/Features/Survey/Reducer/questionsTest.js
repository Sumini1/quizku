import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchQuestionsTest = createAsyncThunk(
    "questionsTest/fetchQuestionsTest",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/question/${id}/questionsTest`);
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

)

const questionsTestSlice = createSlice({
    name: "questionsTest",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsTest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestionsTest.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchQuestionsTest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default questionsTestSlice.reducer;