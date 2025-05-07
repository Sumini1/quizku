import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://quizku-production.up.railway.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log("Response dari server:", data);

      if (!response.ok) {
        throw new Error(
          data.error || "Registrasi gagal, periksa kembali input Anda"
        );
      }

      Swal.fire({
        title: "Register Successfully",
        icon: "success",
        text: "Akun berhasil dibuat!",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log("Error pada try catch", error);

      Swal.fire({
        title: "Register Failed",
        icon: "error",
        text: error.response.data.message || "Terjadi kesalahan, coba lagi.",
        showConfirmButton: true,
      });

      return rejectWithValue(error.message || "Registrasi gagal");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    registerData: null, // Untuk menyimpan data halaman pertama
    isLoading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Action untuk menyimpan data registrasi dari halaman pertama
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    resetRegister: (state) => {
      state.registerData = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        // Reset register data setelah berhasil
        state.registerData = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Terjadi kesalahan saat registrasi";
      });
  },
});

export const { setRegisterData, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
