import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import logo from "../../assets/onBoarding/logo.png";

const Home = () => {
  const navigate = useNavigate();
  const { getButtonClass, getDotClass, middleTheme } = useTheme();
  // console.log("middleTheme ", middleTheme());

  // Just control scrolling for this page specifically
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when leaving page
    };
  }, []);

  return (
    <div className=" w-full  mx-auto h-screen overflow-auto  md:p-0 flex flex-col">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-auto  flex flex-col ${middleTheme()}`}
      >
        <div className="flex flex-col flex-grow items-center justify-center">
          {/* Gambar di Atas */}
          <img
            src={logo}
            alt="Quiz 2"
            className="w-[300px] h-[200px] object-contain -mt-20 md:-mt-40"
          />

          {/* Teks di Tengah */}
          <div className="mt-28 w-full px-5">
            <h2 className="text-xl font-semibold mb-2">
              Mulai Perjalanan Menuntut Ilmu
            </h2>
            <p className="text-lg  font-medium">
              Kami menyediakan sistem belajar yang menarik agar peserta merasa
              senang
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
            onClick={() => navigate("/screen-dua")}
            className={`w-full py-3 rounded-xl text-white border-none cursor-pointer ${getButtonClass()}`}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
