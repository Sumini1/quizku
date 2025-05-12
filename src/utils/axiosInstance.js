import axios from "axios";
import Cookies from "js-cookie";

// Fungsi untuk mengambil token dari cookies
const getToken = () => {
  return Cookies.get("token"); // Ganti 'token' dengan nama cookie yang sesuai
};

// Fungsi untuk menambahkan token ke header axios
const api = axios.create({
  baseURL: "https://quizku-production.up.railway.app/api/", // Ganti dengan URL base API
});

// Interceptor untuk menambahkan Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi untuk refresh token
const refreshToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) {
    throw new Error("Refresh token tidak ditemukan");
  }

  try {
    const response = await api.post("/auth/refresh-token", { refreshToken });
    const { token, newRefreshToken } = response.data;

    // Simpan token baru dan refresh token baru ke cookies
    Cookies.set("token", token, { expires: 1 }); // Token valid untuk 1 hari
    Cookies.set("refreshToken", newRefreshToken, { expires: 7 }); // Refresh token valid untuk 7 hari

    return token;
  } catch (error) {
    throw new Error("Gagal me-refresh token");
  }
};

// Gunakan refresh token ketika status 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
      return api(originalRequest); // Ulangi request yang gagal dengan token baru
    }
    return Promise.reject(error);
  }
);

export default api;
