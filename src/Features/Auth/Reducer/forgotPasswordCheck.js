import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchForgotPassword = createAsyncThunk(
  "forgotPassword/fetchForgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://quizku-production.up.railway.app/auth/forgot-password/check",
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
      console.log("Response dari server:", data); // Debugging

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim email reset password");
      }

      return data; // Redux akan menangani hasil sukses
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan");
    }
  }
);

// forgot password reset
export const fetchForgotPasswordReset = createAsyncThunk(
  "forgotPassword/fetchForgotPasswordReset",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://quizku-production.up.railway.app/auth/forgot-password/reset",
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
      console.log("Response dari server:", data); // Debugging

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim email reset password");
      }

      return data; // Redux akan menangani hasil sukses
    } catch (error) {
      return rejectWithValue(error.message || "Terjadi kesalahan");
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    forgotPasswordData: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setForgotPasswordData: (state, action) => {
      state.forgotPasswordData = action.payload;
    },
    resetForgotPassword: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        console.log("Redux: Forgot Password success = true"); // Debugging
      })
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        console.log("Redux: Forgot Password error =", action.payload); // Debugging
      })
      // reset passwor
      .addCase(fetchForgotPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchForgotPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        console.log("Redux: Forgot Password success = true"); // Debugging
      })
      .addCase(fetchForgotPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        console.log("Redux: Forgot Password error =", action.payload); // Debugging
      });
  },
});

export const { setForgotPasswordData, resetForgotPassword } =
  forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
