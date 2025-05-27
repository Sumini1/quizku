import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../../../Context/ThemeContext";
import gambar1 from "../../../../../assets/beranda/gambar1.png";

const BeritaTerbaru = () => {
  const navigate = useNavigate();
  const { getBorderColor, getButtonClass, getBorder, getTextTitle1, middleTheme } =
    useTheme();
  return (
    <div className="flex flex-col min-h-screen  w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}  p-5`}
      >
        <div onClick={() => navigate(-1)} className="flex gap-2 items-center">
          <FaArrowLeft className="items-center flex text-xl" />
          <h1 className="font-semibold text-lg items-center flex">
            Materi Terbaru
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col mt-8">
          <img src={gambar1} alt="" />
          <div className="flex justify-between mt-3">
            <h1 className={`${getTextTitle1()} font-medium`}>Dasar Islam</h1>
            <p className="text-xs font-normal">12 April 2025</p>
          </div>
          <h1 className="text-xs font-base mt-3">Keimanan (1)</h1>
          <div className="text-sm font-normal mt-3 gap-5 gap-y-3 flex flex-col">
            <p>
              Dalil yang paling jelas dan langsung tentang urutan rukun iman
              adalah Hadis Jibril alaihissalam pada hadis riwayat Muslim (No. 8)
              yang berbunyi{" "}
            </p>
            <p>
              Dari Umar bin Khattab radhiyallahu 'anhu, ia berkata: Suatu hari
              kami duduk bersama Rasulullah ﷺ, lalu datang seorang laki-laki
              berpakaian sangat putih dan berambut sangat hitam (Jibril). Ia
              bertanya: "Wahai Muhammad, kabarkan kepadaku tentang iman."
              Rasulullah ﷺ menjawab:
            </p>
            <p>
              "Iman adalah engkau beriman kepada Allah, malaikat-malaikat-Nya,
              <span className={`underline ${getTextTitle1()} mx-1 ml-1`}>
                kitab-kitab-Nya,
              </span>
              rasul-rasul-Nya, hari akhir, dan engkau beriman kepada takdir yang
              baik maupun yang buruk." Hadis ini secara eksplisit menyebutkan
              urutan rukun iman yang menjadi dasar keyakinan umat Islam.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaTerbaru;
