import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchUserUnits = createAsyncThunk(
    "userUnits/fetchUserUnits",
    async (themeId, { rejectWithValue }) => {
        try {
            const response = await api.get(
              `/u/user-units/themes-or-levels/${themeId}`
            );
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

// by id
export const fetchUserUnitsById = createAsyncThunk(
    "userUnits/fetchUserUnitsById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/u/user-units/${id}`);
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

const userUnitsSlice = createSlice({
    name: "userUnits",
    initialState: {
        status: "idle",
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserUnits.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserUnits.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchUserUnits.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // fetch by id
            .addCase(fetchUserUnitsById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserUnitsById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchUserUnitsById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default userUnitsSlice.reducer;