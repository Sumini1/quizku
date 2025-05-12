import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  api from "../../Auth/Reducer/axios";
// Fetch category difficulties
export const fetchDifficulties = createAsyncThunk(
  "difficulties/fetch",
  async (_, { rejectWithValue }) => {
    try {
      // Modified: Check if the endpoint path is correct
      // Adjust this path according to your API documentation
      const response = await api.get("/u/difficulties"); // Removed 'api/' prefix

    

      const responseData = response.data;

      // Validate response structure
      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData;
    } catch (error) {
      console.error("Error fetching difficulties:", error);

      // Enhanced error logging
      if (error.response) {
        console.error(`Status: ${error.response.status}`, error.response.data);

        // Special handling for method not allowed
        if (error.response.status === 405) {
          const message =
            "Method Not Allowed: API hanya menerima metode lain selain GET";
          return rejectWithValue({ message, details: error.response.data });
        }
      }

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Alternative implementation if GET is not supported
export const fetchDifficultiesPost = createAsyncThunk(
  "difficulties/fetchPost",
  async (_, { rejectWithValue }) => {
    try {
      // Try using POST if GET is not allowed
      const response = await api.post("/u/difficulties", {});
      const responseData = response.data;

      if (!responseData.data || !Array.isArray(responseData.data)) {
        throw new Error("Format data tidak valid");
      }

      return responseData;
    } catch (error) {
      console.error("Error fetching difficulties with POST:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Slice untuk category difficulties
const difficultiesSlice = createSlice({
  name: "difficulties",
  initialState: {
    status: "idle",
    error: null,
    data: [],
    detail: null,
  },
  reducers: {
    resetCategoryDifficulties: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = [];
      state.detail = null;
    },
    clearDifficultiesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET method
      .addCase(fetchDifficulties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDifficulties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchDifficulties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { message: "Terjadi kesalahan" };
      })
      // POST method (alternative)
      .addCase(fetchDifficultiesPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDifficultiesPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchDifficultiesPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { message: "Terjadi kesalahan" };
      });
  },
});

export const { resetCategoryDifficulties, clearDifficultiesError } =
  difficultiesSlice.actions;
export default difficultiesSlice.reducer;
