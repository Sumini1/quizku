import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// Ambil semua readings
export const fetchReadings = createAsyncThunk(
  "readings/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/u/readings");
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData;
    } catch (error) {
      return rejectWithValue(error?.message || "Tolong login kembali");
    }
  }
);

// Ambil reading berdasarkan ID (convert tooltips)
export const fetchReadingsByIdConverTooltips = createAsyncThunk(
  "readingsById/fetch",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/readings/${id}`);
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData;
    } catch (error) {
      return rejectWithValue(error?.message || "Tolong login kembali");
    }
  }
);

const readingsSlice = createSlice({
  name: "readings",
  initialState: {
    data: [],
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
        state.data = action.payload;
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
        state.detailConvert = action.payload;
      })
      .addCase(fetchReadingsByIdConverTooltips.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default readingsSlice.reducer;
