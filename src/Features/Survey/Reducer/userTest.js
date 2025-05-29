import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const saveUserSurveysProgress = createAsyncThunk(
    "userSurveys/saveUserSurveysProgress",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Sending data to API:", data); // Debug log
            const response = await api.post("/u/user-test-exams", data);
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

const userSurveysSlice = createSlice({
    name: "userSurveys",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveUserSurveysProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveUserSurveysProgress.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(saveUserSurveysProgress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSurveysSlice.reducer;