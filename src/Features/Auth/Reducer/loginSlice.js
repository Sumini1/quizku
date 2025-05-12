import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

// Thunk untuk login
export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData, { rejectWithValue }) => {
    try {
      if (!userData.identifier || !userData.password) {
        throw new Error("Email atau username serta password harus diisi");
      }

      const response = await axios.post(
        "https://quizku-production.up.railway.app/auth/login",
        {
          identifier: userData.identifier,
          password: userData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data;

      if (data.status !== "success" || !data.data?.access_token) {
        throw new Error(data.message || "Login gagal");
      }

      Cookies.set("access_token", data.data.access_token, {
        expires: 1 / 24,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", data.data.refresh_token_debug, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      if (data.data.user) {
        localStorage.setItem("role", data.data.user.role);
      }

      Swal.fire({
        title: "Login Berhasil",
        text: data.message || "Anda berhasil login",
        icon: "success",
        showConfirmButton: true,
      });

      return data.data;
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text:
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat login.",
      });

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk untuk logout
export const fetchLogout = createAsyncThunk(
  "login/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      const access_token = Cookies.get("access_token");

      if (!access_token) {
        throw new Error("Token tidak ditemukan. Sesi mungkin sudah berakhir.");
      }

      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      localStorage.removeItem("role");

      Swal.fire({
        title: "Logout Berhasil",
        text: "Anda telah berhasil keluar dari sistem",
        icon: "success",
        showConfirmButton: true,
      });

      return true;
    } catch (error) {
      console.error("Logout error:", error);

      Swal.fire({
        icon: "error",
        title: "Logout Gagal",
        text: error.message || "Terjadi kesalahan saat logout.",
      });

      return rejectWithValue(error.message);
    }
  }
);

// Thunk untuk refresh token
export const refreshAccessToken = createAsyncThunk(
  "login/refreshAccessToken",
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = Cookies.get("refresh_token");

      if (!refresh_token) {
        throw new Error("Refresh token tidak ditemukan.");
      }

      const response = await axios.post(
        "https://quizku-production.up.railway.app/auth/refresh-token",
        { refresh_token },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;

      if (data.status !== "success" || !data.data?.access_token) {
        throw new Error(data.message || "Gagal memperbarui token.");
      }

      Cookies.set("access_token", data.data.access_token, {
        expires: 1 / 24,
        secure: true,
        sameSite: "strict",
      });

      return data.data.access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return rejectWithValue(error.message || "Gagal memperbarui token.");
    }
  }
);

// Slice untuk login
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        Cookies.set("access_token", action.payload, {
          expires: 1 / 24,
          secure: true,
          sameSite: "strict",
        });
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
