import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { useDispatch } from "react-redux";
import { MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { fetchLogin } from "../Reducer/loginSlice";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";

import Button from "../../../Components/ListButton/Button";

const Login = () => {
  const { getBorder, getButtonClass, getBorderClass, middleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // Login dengan email
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = formData;

    // Kirim login request ke Redux
    const resultAction = await dispatch(fetchLogin({ identifier, password }));

    if (fetchLogin.fulfilled.match(resultAction)) {
      console.log("✅ Login Response:", resultAction.payload);
      const { user } = resultAction.payload;

      if (user) {
        // Role sudah disimpan dalam loginSlice

        // Simpan dan increment loginCount
        let loginCount = parseInt(localStorage.getItem("loginCount")) || 0;
        loginCount++;
        localStorage.setItem("loginCount", loginCount.toString());

        // Navigate berdasarkan loginCount
        navigate(loginCount === 1 ? "/survey-satu" : "/beranda");

        console.log("Login Count:", loginCount);
      } else {
        console.error("❌ Data user tidak ditemukan dalam response");
      }
    } else {
      console.error("❌ Login gagal atau response tidak sesuai");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handleChange input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className=" w-full  mx-auto h-screen overflow-hidden  md:p-0 flex flex-col">
      <div
        className={`flex flex-col justify-center h-screen px-5 max-w-md mx-auto ${middleTheme()}`}
      >
        <h1 className="text-2xl font-semibold absolute top-5">EduLearn</h1>

        <div className="flex flex-col mt-10">
          <h2 className="text-xl font-semibold mb-2 tracking-wide leading-[1.6]">
            Ahlan Wa Sahlan
          </h2>
          <p className="mb-7 text-base font-medium">
            Alhamdulillah bisa bertemu kembali, Login untuk melanjutkan
            pembelajaran
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full items-center"
          >
            {/* Input Email / Username */}
            <div
              className={`relative w-full border-2 rounded-xl  ${getBorder()} ${
                formErrors.email ? "border-red-500" : ""
              }`}
            >
              {/* Icon */}
              <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

              {/* Input */}
              <input
                type="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChangeInput}
                placeholder="Email / Username"
                className="w-full text-sm py-4 pl-10 pr-3 rounded-xl outline-none bg-transparent "
              />
            </div>
            {formErrors.identifier && (
              <p className="text-red-500 text-xs -mt-4 ml-2">
                {formErrors.identifier}
              </p>
            )}
            {/* Input Password */}
            <div
              className={`relative w-full border-2 rounded-xl ${getBorder()} ${
                formErrors.password ? "border-red-500" : ""
              }`}
            >
              {/* Icon */}
              <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

              {/* Input */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChangeInput}
                placeholder="Konfirmasi Password"
                className="w-full text-sm py-4 pl-10 pr-3 rounded-xl outline-none bg-transparent"
              />

              <div
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <FiEyeOff className="text-lg" />
                ) : (
                  <FiEye className="text-lg" />
                )}
              </div>
            </div>
            {formErrors.password && (
              <p className="text-red-500 text-xs -mt-4 ml-2">
                {formErrors.password}
              </p>
            )}
            <Link to="/forgot-password" className="self-end">
              <h5 className="text-sm underline text-[#0961F5]">
                Lupa Password?
              </h5>
            </Link>
            <Button type="submit" className={`${getButtonClass()} text-base`}>
              Login dengan Email
            </Button>
            <div className="flex items-center gap-3 w-full">
              <hr className="flex-grow border-[1px] border-gray-500" />
              <span className="text-gray-500">Atau</span>
              <hr className="flex-grow border-[1px] border-gray-500" />
            </div>
            <div className="flex items-center w-full justify-end">
              <Button
                // onClick={handleLogin}
                className={`${getBorderClass()} text-base font-medium  flex items-center justify-center`}
              >
                <FcGoogle className="mr-2 text-xl" />
                Login dengan Google
              </Button>
            </div>
            <p className="text-center mt-5 text-base font-medium">
              Belum Punya Akun?{" "}
              <Link
                to="/register-email"
                className="font-semibold text-[#2F80ED] underline"
              >
                Daftar Disini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
