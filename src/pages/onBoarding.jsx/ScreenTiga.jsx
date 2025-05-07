import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import screenTiga from "../../assets/onBoarding/screen-tiga.png";

const ScreenTiga = () => {
  const navigate = useNavigate();
  const { getButtonClass, getDotClass, middleTheme } = useTheme();

  // Just control scrolling for this page specifically
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when leaving page
    };
  }, []);

  return (
    <div className=" w-full  mx-auto h-screen overflow-hidden  md:p-0 flex flex-col">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-hidden  flex flex-col ${middleTheme()}`}
      >
        <div className="flex flex-col flex-grow items-center justify-center">
          {/* Gambar di Atas */}
          <img
            src={screenTiga}
            alt="Quiz 2"
            className="w-[300px] h-[200px] object-contain -mt-20 md:-mt-40"
          />

          {/* Teks di Tengah */}
          <div className="mt-16 w-full px-5">
            <h2 className="text-xl font-semibold  mb-5">
              Belajar Islam dan Bahasa Arab Sesuai Keinginanmu
            </h2>
            <p className="text-lg font-medium">
              Mau belajar dari dasar ? Ingin memperdalam berbagai cabang ilmu
              islam seperti Fiqh Syafi’i ? atau mau memilih belajar tingkat
              lanjut ?
            </p>
          </div>
        </div>

        {/* Navigasi Dots */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 items-center text-xl">
          <GoDotFill className={getDotClass(0)} />
          <GoDotFill className={getDotClass(1)} />
          <GoDotFill className={getDotClass(2)} />
        </div>

        {/* Tombol Fixed di Bawah */}
        <div className="fixed bottom-0 left-0 right-0 px-5 py-3  max-w-md mx-auto">
          <button
            onClick={() => navigate("/login")}
            className={`w-full py-3 rounded-xl text-white border-none cursor-pointer  ${getButtonClass()}`}
          >
            Mulai Belajar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenTiga;
