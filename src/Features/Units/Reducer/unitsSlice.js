import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// Ambil semua units
export const fetchUnits = createAsyncThunk(
  "units/fetchUnits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/u/units");

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

// Ambil detail unit berdasarkan ID
export const fetchUnitsById = createAsyncThunk(
  "unitsById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/units/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Gagal mengambil data unit");
    }
  }
);

const unitsSlice = createSlice({
  name: "units",
  initialState: {
    status: "idle",
    error: null,
    data: [],
    detail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch semua units
      .addCase(fetchUnits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch unit berdasarkan ID
      .addCase(fetchUnitsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnitsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload.data;
      })
      .addCase(fetchUnitsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default unitsSlice.reducer;
