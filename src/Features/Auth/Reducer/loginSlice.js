import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios"; // Ensure axios is imported
import Cookies from "js-cookie";

// Thunk for login
export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData, { rejectWithValue }) => {
    try {
      // Validate input: ensure identifier and password are provided
      if (!userData.identifier || !userData.password) {
        throw new Error("Email atau username serta password harus diisi");
      }

      // Send login request to API
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
      console.log("Login response:", data);

      // Check if the response indicates success
      if (data.status !== "success" || !data.data?.access_token) {
        throw new Error(data.message || "Login gagal");
      }

      // Store tokens in cookies instead of localStorage
      // Set cookies with js-cookie library (simpler than raw document.cookie)
      Cookies.set("access_token", data.data.access_token, {
        expires: 1 / 24, // 1 hour (1/24 of a day)
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", data.data.refresh_token_debug, {
        expires: 7, // 7 days
        secure: true,
        sameSite: "strict",
      });

      // Store role in localStorage (non-sensitive data)
      if (data.data.user) {
        localStorage.setItem("role", data.data.user.role);
        // console.log("Saved role:", localStorage.getItem("role")); // debug langsung
      }

      Swal.fire({
        title: "Login Berhasil",
        text: data.message || "Anda berhasil login",
        icon: "success",
        showConfirmButton: true,
      });

      return data.data; // Return user data
    } catch (error) {
      console.error("Login error:", error);

      // Handle backend error
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

// Thunk for logout
export const fetchLogout = createAsyncThunk(
  "login/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      // Get the access token from cookies
      const access_token = Cookies.get("access_token");

      if (!access_token) {
        throw new Error("Token tidak ditemukan. Sesi mungkin sudah berakhir.");
      }

      // Call logout API if needed
      // Uncomment this section if you have a backend logout endpoint
      /*
      const response = await axios.post(
        "https://quizku-production.up.railway.app/auth/logout",
        {}, // Empty body or whatever your API requires
        {
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
          },
        }
      );
      
      // Check response if needed
      const data = response.data;
      if (data.status !== "success") {
        throw new Error(data.message || "Logout gagal");
      }
      */

      // Remove cookies
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      // Clear any other stored user data
      localStorage.removeItem("role");
      localStorage.removeItem("loginCount");
      // Add any other items that need to be cleared

      Swal.fire({
        title: "Logout Berhasil",
        text: "Anda telah berhasil keluar dari sistem",
        icon: "success",
        showConfirmButton: true,
      });

      return true;
    } catch (error) {
      console.error("Logout error:", error);

      // Handle error
      Swal.fire({
        icon: "error",
        title: "Logout Gagal",
        text: error.message || "Terjadi kesalahan saat logout.",
      });

      return rejectWithValue(error.message);
    }
  }
);

// Slice for login
const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add more reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Store user data
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      })
      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null; // Reset user data
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error message
      });
  },
});

export default loginSlice.reducer;
