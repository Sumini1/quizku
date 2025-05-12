import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { RiLockPasswordFill, RiCheckboxCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchForgotPasswordReset } from "../Reducer/forgotPasswordCheck";

const NewPassword = () => {
  const { getBorder, getButtonClass, middleTheme } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    confirm_password: "",
  });

  // Set overflow:hidden hanya saat halaman ini aktif
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Pulihkan scroll saat keluar dari halaman
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = (event) => {
    event.preventDefault(); // Mencegah refresh halaman
    // Validasi password sebelum membuka modal
    if (formData.new_password !== formData.confirm_password) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }
    console.log("Opening modal..."); // Debugging
    setIsModalOpen(true);
  };

  const handleLogin = async () => {
    const { email, new_password } = formData;

    // Simpan data registrasi ke Redux store untuk digunakan di halaman berikutnya
    dispatch(
      fetchForgotPasswordReset({
        email: email,
        new_password: new_password,
      })
    );
    navigate("/login");
  };

  // Track which fields are focused or filled
  const [focusedFields, setFocusedFields] = useState({
    identifier: false,
    password: false,
  });
  const handleFocus = (field) => {
    setFocusedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field) => {
    setFocusedFields((prev) => ({
      ...prev,
      [field]: formData[field] !== "",
    }));
  };
  return (
    <div className="w-full mx-auto h-screen overflow-auto md:p-0 flex flex-col">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-auto flex flex-col ${middleTheme()} `}
      >
        <div className="flex items-center gap-3 mt-5 px-5">
          <FaArrowLeft className="text-2xl cursor-pointer" />
          <h1 className="text-lg font-semibold">Password Baru</h1>
        </div>

        <div className="flex flex-col mt-12 mx-5 text-lg h-full">
          <h2 className="font-medium text-xl mb-5 md:text-lg md:mb-3">
            Proses Pemulihan Akun Sedikit Lagi...
          </h2>
          <p className="mb-20 text-lg md:text-base">
            Mohon tuliskan password baru
          </p>

          <form
            onSubmit={handleResetPassword}
            className="flex flex-col justify-center gap-5 w-full md:mt-10"
          >
            <div
              className={`flex gap-2 items-center rounded-xl p-2 relative ${getBorder()}`}
            >
              <MdEmail className="ml-2" />
              <div className="flex-grow relative">
                <label
                  className={`absolute block text-sm transition-all duration-200 ${
                    focusedFields.identifier
                      ? `-top-5 left-0 text-xs text-blue-500 bg-white px-1`
                      : "top-1 left-2 text-gray-500"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  onChange={handleChange}
                  onFocus={() => handleFocus("identifier")}
                  onBlur={() => handleBlur("identifier")}
                  className="flex-grow pr-10 p-1 bg-transparent rounded-xl outline-none md:p-0"
                />
              </div>
            </div>

            <div
              className={`flex gap-2 items-center rounded-xl p-2 relative ${getBorder()}`}
            >
              <RiLockPasswordFill className="ml-2" />
              <div className="flex-grow relative">
                <label
                  className={`absolute block text-sm transition-all duration-200 ${
                    focusedFields.identifier
                      ? `-top-5 left-0 text-xs text-blue-500 bg-white px-1`
                      : "top-1 left-2 text-gray-500"
                  }`}
                >
                  Password Baru
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="new_password"
                  placeholder=""
                  onChange={handleChange}
                  onFocus={() => handleFocus("new_password")}
                  onBlur={() => handleBlur("new_password")}
                  className="flex-grow pr-10 p-1 md:p-0 bg-transparent rounded-xl outline-none"
                />
              </div>

              <div
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl md:text-lg" />
                ) : (
                  <FiEye className="text-xl md:text-lg" />
                )}
              </div>
            </div>

            <div
              className={`flex gap-2 items-center rounded-xl p-2 relative ${getBorder()}`}
            >
              <RiLockPasswordFill className="ml-2" />
              <div className="flex-grow relative">
                <label
                  className={`absolute block text-sm transition-all duration-200 ${
                    focusedFields.identifier
                      ? `-top-5 left-0 text-xs text-blue-500 bg-white px-1`
                      : "top-1 left-2 text-gray-500"
                  }`}
                >
                  Komfirmasi Password Baru
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder=""
                  onChange={handleChange}
                  onFocus={() => handleFocus("confirm_password")}
                  onBlur={() => handleBlur("confirm_password")}
                  className="flex-grow pr-10 p-1 bg-transparent rounded-xl outline-none md:p-0"
                />
              </div>

              <div
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl" />
                ) : (
                  <FiEye className="text-xl" />
                )}
              </div>
            </div>

            <div className="w-full flex justify-center mt-32 md:mt-64">
              <button
                type="submit"
                className={`p-3 w-full max-w-md mx-auto border-none md:p-3 rounded-xl ${getButtonClass()}`}
              >
                Kirim
              </button>
            </div>
          </form>
        </div>

        {isModalOpen && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-7"
            style={{ zIndex: 50 }}
          >
            <div className="bg-[#DCFFD9] p-5 rounded-xl flex flex-col items-center gap-4">
              <HiBadgeCheck
                className={`text-7xl border-none rounded-full text-[#28A745]`}
              />
              <p className="text-lg font-semibold">Password Berhasil Dirubah</p>
              <div className="text-center mb-2">
                <p>Alhamdulillah pemulihan akun selesai</p>
                <p>Silahkan kembali login untuk melanjutkan pembelajaran</p>
              </div>
              <button
                onClick={handleLogin}
                className={`p-3 w-full border-none rounded-xl text-[#FFF] bg-[#28A745]`}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
