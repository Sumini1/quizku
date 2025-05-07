import React, { useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";

const TooltifWordRukun = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const { theme, getIconTheme, getButtonClass } = useTheme();
  const getThemeClass = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white"
      : "bg-[#EEE] text-[#333";
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5">
      {/* Kontainer Modal */}
      <div
        className={`p-6 rounded-lg shadow-lg  w-full relative ${getThemeClass()}`}
      >
        <div>
          {/* Header Modal */}
          <h1 className="text-xl font-semibold mb-4 ">
            Makna <span className={`${getIconTheme()}`}>Rukun</span>
          </h1>

          {/* Isi Modal */}
          <p className="text-sm  leading-relaxed">
            Tingkatan dasar Islam adalah langkah awal untuk memahami ajaran
            Islam secara mendalam. Ini termasuk pengenalan terhadap keyakinan,
            ibadah, dan akhlak yang menjadi dasar kehidupan seorang muslim.
          </p>
          <h1 className="text-md font-semibold mt-5 mb-3">
            Untuk siapa tingkatan ini ?
          </h1>
          <ol type="1" className="list-decimal pl-5 text-sm  leading-relaxed">
            <li>Muslim yang ingin belajar dari dasar</li>
            <li>
              Muallaf yang membutuhkan ilmu dan praktek dasar secara cepat
            </li>
            <li>Peserta diluar agama islam yang ingin belajar ilmu islam</li>
          </ol>
          <h1 className="text-md font-semibold mt-5 mb-3">
            Apa yang perlu dipersiapkan ?
          </h1>
          <p className="text-sm  leading-relaxed">
            Cukup persiapkan diri karena materi dari dasar akan dibahas semudah
            mungkin
          </p>
        </div>
        <button
          onClick={onClose}
          className={`mt-4 w-full font-medium py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline ${getButtonClass()}`}
        >
          Selesai Membaca
        </button>
      </div>
    </div>
  );
};

export default TooltifWordRukun;
