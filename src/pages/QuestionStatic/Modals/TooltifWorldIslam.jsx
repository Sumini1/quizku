import React, { useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";

const TooltifWordIslam = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const { theme, getButtonClass, getIconTheme } = useTheme();
  const getThemeClass = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white"
      : "bg-[#EEE] text-[#333]";
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Kontainer Modal */}
      <div
        className={`p-5 rounded-lg shadow-lg  w-full relative  ${getThemeClass()}`}
      >
        <div className="mb-4 ">
          {/* Header Modal */}
          <h1 className="text-xl  font-semibold mb-3">
            Makna <span className={getIconTheme()}>Iman</span>
          </h1>

          {/* Isi Modal */}
          <p className="text-[16px]  font-[400] mb-2">
            Dalil yang paling jelas dan langsung tentang urutan rukun iman
            adalah Hadis Jibril alaihissalam pada hadis riwayat Muslim (No. 8)
            yang berbunyi :
          </p>
          <p className="text-[16px]  font-[400] mb-2">
            Dari Umar bin Khattab radhiyallahu 'anhu, ia berkata: Suatu hari
            kami duduk bersama Rasulullah ﷺ, lalu datang seorang laki-laki
            berpakaian sangat putih dan berambut sangat hitam (Jibril). Ia
            bertanya: "Wahai Muhammad, kabarkan kepadaku tentang iman."
            Rasulullah ﷺ menjawab:
          </p>
          <p className="text-[16px] font-[400]  ">
            "Iman adalah engkau beriman kepada Allah, malaikat-malaikat-Nya,
            kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman
            kepada takdir yang baik maupun yang buruk." Hadis ini secara
            eksplisit menyebutkan urutan rukun iman yang menjadi dasar keyakinan
            umat Islam.
          </p>
        </div>
        <button
          onClick={onClose}
          className={`mt-4 w-full font-[400] py-2 px-2 rounded-xl text-[16px] ${getButtonClass()}`}
        >
          Selesai Membaca
        </button>
      </div>
    </div>
  );
};

export default TooltifWordIslam;
