import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

export const fetchEvaluations = createAsyncThunk(
  "evaluations/fetchEvaluations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/u/evaluations");
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

// evaluations by id
export const fetchEvaluationsById = createAsyncThunk(
  "evaluations/fetchEvaluationsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/u/evaluations/${id}`);
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

//  evaluation by unitId
export const fetchEvaluationsByUnitId = createAsyncThunk(
  "evaluations/fetchEvaluationsByUnitId",
  async (unitId, { rejectWithValue }) => {
    try {
      const response = await api.get(`u/evaluations/unit/${unitId}`);
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

const evaluationsSlice = createSlice({
  name: "evaluations",
  initialState: {
    status: "idle",
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvaluations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvaluations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchEvaluations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch by id
      .addCase(fetchEvaluationsById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvaluationsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchEvaluationsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //  fetch by unitId
      .addCase(fetchEvaluationsByUnitId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvaluationsByUnitId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchEvaluationsByUnitId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default evaluationsSlice.reducer;
