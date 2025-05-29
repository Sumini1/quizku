import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const saveUserSurveys = createAsyncThunk(
    "userSurveys/saveUserSurveys",
    async (data, { rejectWithValue }) => {
        try {
            console.log("Sending data to API:", data); // Debug log
            const response = await api.post("/u/user-surveys", data);
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
    reducers: {
        setUserSurveysData: (state, action) => {
            state.data = action.payload;
        }
    },
   extraReducers: (builder) => {
        builder
            .addCase(saveUserSurveys.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveUserSurveys.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(saveUserSurveys.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUserSurveysData } = userSurveysSlice.actions;
export default userSurveysSlice.reducer;