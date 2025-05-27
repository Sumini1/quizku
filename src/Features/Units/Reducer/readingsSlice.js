import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// Ambil semua readings (langsung array)
export const fetchReadings = createAsyncThunk(
  "readings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/u/readings");
      const responseData = response.data;

      if (!Array.isArray(responseData)) {
        throw new Error("Format data tidak valid");
      }

      return responseData; // langsung array
    } catch (error) {
      return rejectWithValue(error?.message || "Tolong login kembali");
    }
  }
);

// readings by unitId (masih gunakan data: [...] dari response)
export const fetchReadingsByUnitId = createAsyncThunk(
  "readingsByUnitId/fetch",
  async (unitId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/readings/${unitId}`);
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData.data; // hanya array
    } catch (error) {
      return rejectWithValue(error?.message || "Tolong login kembali");
    }
  }
);

// Ambil reading berdasarkan ID (untuk convert tooltips)
export const fetchReadingsByIdConverTooltips = createAsyncThunk(
  "readingsById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/readings/${id}`);
      const responseData = response.data;

      if (!responseData.data || typeof responseData.data !== "object") {
        throw new Error("Format data tidak valid");
      }

      return responseData.data;
    } catch (error) {
      return rejectWithValue(error?.message || "Tolong login kembali");
    }
  }
);

const readingsSlice = createSlice({
  name: "readings",
  initialState: {
    data: [], // semua readings
    status: "idle",
    error: null,
    detailConvert: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all readings
      .addCase(fetchReadings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReadings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // langsung array
      })
      .addCase(fetchReadings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch reading by ID (convert tooltips)
      .addCase(fetchReadingsByIdConverTooltips.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReadingsByIdConverTooltips.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detailConvert = action.payload; // object
      })
      .addCase(fetchReadingsByIdConverTooltips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch readings by unitId
      .addCase(fetchReadingsByUnitId.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReadingsByUnitId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload; // langsung array
      })
      .addCase(fetchReadingsByUnitId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default readingsSlice.reducer;
