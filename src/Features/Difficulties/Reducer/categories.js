import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios"; //

export const fetchCategories = createAsyncThunk(
    "categories/fetch",
    async (difficultyId, { rejectWithValue }) => {
      try {
        const response = await api.get(
          `u/categories/difficulty/${difficultyId}`
        );
        const responseData = response.data;
  
        // Validasi data
        if (!responseData?.data || !Array.isArray(responseData.data)) {
          return rejectWithValue("Format data tidak valid");
        }
  
        // Kembalikan hanya data yang dibutuhkan
        return responseData.data;
      } catch (error) {
        // Tangani error dari Axios atau error lainnya
        const errorMessage =
          error.response?.data?.message || error.message || "Terjadi kesalahan";
        return rejectWithValue(errorMessage);
      }
    }
  );    

  const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
      status: "idle",
      error: null,
      data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });
  
  export default categoriesSlice.reducer;