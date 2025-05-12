import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios" // 


export const fetchSubcategory = createAsyncThunk(
  "subcategories/fetch",
  async (difficultyId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `u/user-subcategory/category/difficulty/${difficultyId}`
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

export const fetchCreateUserSubcategory = createAsyncThunk(
  "subcategories/fetchCreate",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("u/user-subcategory", data);
      const responseData = response.data;

      // Validasi: pastikan ada objek data
      if (!responseData || !responseData.data) {
        throw new Error("Format response tidak valid");
      }

      return responseData; // responseData.data kalau kamu hanya butuh datanya saja
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.error || error.message || "Terjadi kesalahan"
      );
    }
  }
);


const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    status: "idle",
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload
      })
      .addCase(fetchSubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //   create
      .addCase(fetchCreateUserSubcategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCreateUserSubcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchCreateUserSubcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      });
  },
});

export default subcategoriesSlice.reducer;

