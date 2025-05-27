import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PiNotePencilBold } from "react-icons/pi";
import { useTheme } from "../../../../../Context/ThemeContext";
import { FaChalkboardUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const SaranMasukan = () => {
  const navigate = useNavigate();
  const { getTextTitle1, getButtonClass, getBorder, middleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("saran"); // Menyimpan tab aktif

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Saran dan Masukan</h1>
        </div>

        <div className={`flex gap-4 mx-5 mt-10 justify-center ${getBorder()}`}>
          <div
            onClick={() => setActiveTab("saran")}
            className={`
      flex items-center gap-2 p-2 px-10 rounded-full transition-all duration-300
      ${
        activeTab === "saran"
          ? `border-none ${getButtonClass()} w-1/2`
          : "bg-transparent border-gray-300 w-[190px]"
      } cursor-pointer
    `}
          >
            <PiNotePencilBold className="w-[20px] h-[20px]" />
            <span>Saran</span>
          </div>

          <div
            onClick={() => setActiveTab("masukan")}
            className={`
      flex items-center gap-2 p-2 px-9 rounded-full transition-all duration-300
      ${
        activeTab === "masukan"
          ? `border-none ${getButtonClass()} w-1/2`
          : "bg-transparent border-gray-300 w-[190px]"
      } cursor-pointer
    `}
          >
            <FaChalkboardUser
              className={`w-[20px] h-[20px] ${
                activeTab === "masukan" && "text-white"
              }`}
            />
            <span>Masukan</span>
          </div>
        </div>
        {/* Input */}

        {/* Saran */}
        {activeTab === "saran" && (
          <div className="flex flex-col gap-3 p-5 ">
            <p>
              Pendapat yang berupa ide, rekomendasi atau langkah kedepan.
              Contohnya penambahan fitur atau materi tertentu.
            </p>
            <textarea
              placeholder="Tulis kritik dan saranmu disini..."
              className={`w-full h-32 p-2 rounded-md ${getBorder()}`}
            ></textarea>
            <p>Bolehkah kami menghubungi anda untuk tindakan lebih lanjut?</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Boleh</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Maaf, belum bisa</span>
              </label>
            </div>
            <div
              onClick={() => navigate("/progress/donasi-sekarang")}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-5 px-5 py-4"
            >
              <button className={`${getButtonClass()} border-none p-3 w-full`}>
                Kirim
              </button>
            </div>
          </div>
        )}

        {/* masukan */}
        {activeTab === "masukan" && (
          <div className="flex flex-col gap-3 p-5 ">
            <p>
              Pendapat yang berupa ide, rekomendasi atau langkah kedepan.
              Contohnya penambahan fitur atau materi tertentu.
            </p>
            <textarea
              placeholder="Tulis kritik dan saranmu disini..."
              className={`w-full h-32 p-2 rounded-md ${getBorder()}`}
            ></textarea>
            <p>Bolehkah kami menghubungi anda untuk tindakan lebih lanjut?</p>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Boleh</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span>Maaf, belum bisa</span>
              </label>
            </div>
            <div
              onClick={() => navigate("/progress/donasi-sekarang")}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-5 px-5 py-4"
            >
              <button className={`${getButtonClass()} border-none p-3 w-full`}>
                Kirim
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaranMasukan;
