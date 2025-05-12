// import axios from "axios"
// import Cookies from "js-cookie";

// // Buat instance axios khusus
// const api = axios.create({
//   baseURL: "https://quizku-production.up.railway.app/api", // base URL API kamu
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Tambahkan interceptor untuk menyisipkan token ke setiap request
// api.interceptors.request.use((config) => {
//   const token = Cookies.get("access_token" || "refresh_token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // Tambahkan interceptor response untuk refresh token seperti yang kamu punya
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const newAccessToken = await store
//           .dispatch(refreshAccessToken())
//           .unwrap();
//         const originalRequest = error.config;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         console.error("Gagal refresh token:", err);
//         store.dispatch(fetchLogout());
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// import axios from "axios";
// import Cookies from "js-cookie";

// let dispatch = null; // nanti diisi dari luar
// let refreshAccessToken = null;
// let fetchLogout = null;

// export const setAuthUtils = ({ dispatchFn, refreshFn, logoutFn }) => {
//   dispatch = dispatchFn;
//   refreshAccessToken = refreshFn;
//   fetchLogout = logoutFn;
// };

// const api = axios.create({
//   baseURL: "https://quizku-production.up.railway.app/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use((config) => {
//   const accessToken = Cookies.get("access_token");
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await dispatch(refreshAccessToken()).unwrap();
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (err) {
//         console.error("Gagal refresh token:", err);
//         dispatch(fetchLogout());
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";
import Cookies from "js-cookie";

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
  baseURL: "https://quizku-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk menambahkan konfigurasi interceptor
export const setupAxiosInterceptors = (
  instanceAxios,
  fungsiRefreshToken,
  fungsiLogout
) => {
  // Flag untuk mencegah percobaan refresh token bersamaan
  let sedangMemperbarui = false;
  let promiseRefreshToken = null;

  instanceAxios.interceptors.request.use((konfigurasi) => {
    const tokenAkses = Cookies.get("access_token");
    if (tokenAkses) {
      konfigurasi.headers.Authorization = `Bearer ${tokenAkses}`;
    }
    return konfigurasi;
  });

  instanceAxios.interceptors.response.use(
    (response) => response,
    async (kesalahan) => {
      const permintaanAsli = kesalahan.config;

      // Periksa apakah kesalahan disebabkan oleh akses tidak sah (401)
      // dan permintaan belum pernah dicoba ulang
      if (kesalahan.response?.status === 401 && !permintaanAsli._retry) {
        // Cegah beberapa percobaan refresh token bersamaan
        if (sedangMemperbarui) {
          return promiseRefreshToken.then(() => {
            permintaanAsli.headers.Authorization = `Bearer ${Cookies.get(
              "access_token"
            )}`;
            return instanceAxios(permintaanAsli);
          });
        }

        permintaanAsli._retry = true;
        sedangMemperbarui = true;

        try {
          // Buat promise untuk refresh token
          promiseRefreshToken = fungsiRefreshToken();

          // Tunggu proses refresh token
          await promiseRefreshToken;

          // Perbarui permintaan asli dengan token baru
          permintaanAsli.headers.Authorization = `Bearer ${Cookies.get(
            "access_token"
          )}`;

          // Coba ulang permintaan asli
          return instanceAxios(permintaanAsli);
        } catch (kesalahanRefresh) {
          // Jika refresh gagal, logout pengguna
          console.error("Pembaruan token gagal:", kesalahanRefresh);

          // Hapus token
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");

          // Panggil aksi logout
          fungsiLogout();

          // Tolak promise untuk menyebarkan kesalahan
          return Promise.reject(kesalahanRefresh);
        } finally {
          // Atur ulang status pembaruan
          sedangMemperbarui = false;
          promiseRefreshToken = null;
        }
      }

      // Untuk jenis kesalahan lain, tolak promise
      return Promise.reject(kesalahan);
    }
  );

  return instanceAxios;
};

export default api;