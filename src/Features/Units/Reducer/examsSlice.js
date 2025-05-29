import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchExams = createAsyncThunk(
    "exams/fetchExams",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/u/exams");
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

export const fetchExamsById = createAsyncThunk(
    "exams/fetchExamsById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/exams/${id}`);
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

// exams by unitId
export const fetchExamsByUnitId = createAsyncThunk(
    "exams/fetchExamsByUnitId",
    async (unitId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/exams/unit/${unitId}`);
            const responseData = response.data;
            if (!responseData.data || !Array.isArray(responseData.data)) {
                return rejectWithValue("Format data tidak valid");
            }
            return responseData;
        } catch (error) {
            return rejectWithValue("Terjadi kesalahan");
        }
    }
)

const examsSlice = createSlice({
    name: "exams",
    initialState: {
        status: "idle",
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // fetch by id
            .addCase(fetchExamsById.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchExamsById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchExamsById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // fetch by unitId
            .addCase(fetchExamsByUnitId.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchExamsByUnitId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchExamsByUnitId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default examsSlice.reducer;