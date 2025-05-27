import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import shapire from "../../../../assets/progress/shapire.png";

const Penghargaan = () => {
  const { theme, middleTheme, getButtonClass } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex flex-col p-5">
          <div className="flex gap-2 items-center">
            <FaArrowLeft onClick={() => navigate(-1)} />
            <h1 className="font-semibold text-xl">Level Donatur</h1>
          </div>

          {/* Image container with improved centering */}
          <div className="flex flex-col gap-3 items-center justify-center mt-24 flex-grow">
            <img
              src={shapire}
              alt="shapire"
              className="mx-auto w-10 h-10" // Ensures horizontal centering
            />
            <h2 className="text-xl font-mediumb">Sapphire Lv-3</h2>
            <p className="text-lg font-normal">Donasi pembuatan 30 soal</p>
            <h1 className="text-lg font-semibold">"Muhammad Rizky Setyanto"</h1>
            <p>3/4/2025</p>
          </div>
          <div className="max-w-md mx-auto fixed bottom-5 left-0 right-0 px-4">
            <button className={`${getButtonClass()} border-none p-3 w-full`}>
              Bagikan Lencana
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Penghargaan;
