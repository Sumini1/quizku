import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchTestExams = createAsyncThunk(
    "testExams/fetchTestExams",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/u/test-exams");
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

const testExamsSlice = createSlice({
    name: "testExams",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTestExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestExams.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTestExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default testExamsSlice.reducer;