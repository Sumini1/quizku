import React, { useState, useEffect } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { FiEye, FiEyeOff, FiLoader } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setForgotPasswordData } from "../Reducer/forgotPasswordCheck";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const {
    getBorder,
    getButtonClass,
    getTextTitle,
    getThemeClass,
    getIconTheme,
    middleTheme,
  } = useTheme();

  const [formData, setFormData] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.forgotPassword);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      Swal.fire("Error", "Email harus diisi!", "error");
      return false;
    }

    return true;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Simpan data registrasi ke Redux store untuk digunakan di halaman berikutnya
    dispatch(
      setForgotPasswordData({
        email: formData.email,
      })
    );

    // Navigasi ke halaman pertanyaan keamanan
    navigate("/pertanyaan-keamanan/forgot-password");
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
    <div className="w-full  mx-auto h-screen overflow-hidden  md:p-0 flex flex-col md:justify-center md:items-center">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-hidden  flex flex-col ${middleTheme()} `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mt-5  px-5">
          <FaArrowLeft className="text-xl cursor-pointer" />
          <h1 className="text-2xl font-semibold">Pertanyaan</h1>
        </div>

        <div className="p-5 flex flex-col md:justify-center  md:mx-auto md:mt-44 md:w-full md:m-0">
          <h2 className="text-xl font-medium mt-10 md:mt-0 md:text-base">
            Insya Allah kami bantu pemulihan akun
          </h2>
          <p className="mb-7 text-lg font-medium mt-20 md:mt-0 md:text-base">
            Mohon tuliskan Email terdaftar
          </p>
          <form
            onSubmit={handleContinue}
            className="flex flex-col gap-5 w-full"
          >
            {/* Email Input */}
            <div
              className={`flex gap-2 items-center border-2 rounded-xl p-2 ${getBorder()} bg-transparent`}
            >
              <MdEmail className="mx-1" />
              <div className="flex-grow relative">
                <label
                  className={`absolute block text-sm transition-all duration-200 ${
                    focusedFields.identifier
                      ? `-top-5 left-0 text-sm text-blue-500 bg-white px-1`
                      : "top-1 left-2 text-gray-500"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder=""
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("identifier")}
                  onBlur={() => handleBlur("identifier")}
                  className="flex-grow p-2 text-sm bg-transparent rounded-xl outline-none md:p-1"
                />
              </div>
            </div>
            {/* Login Link and Submit Button */}
            <div className="fixed left-5 right-5 bottom-5 items-center max-w-md flex flex-col justify-center mx-auto  md:justify-center  md:mx-auto md:mt-0 md:sticky md:w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`p-3 w-full mt-2 border-none rounded-xl ${getButtonClass()}`}
              >
                {isLoading ? (
                  <FiLoader className="animate-spin inline-block mr-2 text-base font-medium mb-2" />
                ) : (
                  "Lanjutkan"
                )}
              </button>
              <p className="flex justify-center mt- text-base font-medium">
                Sudah memiliki akun?{" "}
                <span
                  className="underline cursor-pointer text-[#2F80ED] mx-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>

        {/* Loading Modal */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-md flex flex-col items-center gap-4">
              <HiBadgeCheck
                className={`${getIconTheme()} text-5xl border-none rounded-full`}
              />
              <p className="text-lg font-semibold">Mohon tunggu...</p>
              <p className="text-sm text-gray-500">
                Sedang memproses verifikasi
              </p>
              <FiLoader
                style={{ animation: "spin 2s linear infinite" }}
                className={`text-4xl ${getIconTheme()}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
