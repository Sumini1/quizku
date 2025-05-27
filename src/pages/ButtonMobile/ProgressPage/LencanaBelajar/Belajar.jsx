import React, { useState } from "react";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { MdStarBorderPurple500 } from "react-icons/md";

const Belajar = () => {
  const { getBorderColor, getButtonClass, getBorder } = useTheme();
  const navigate = useNavigate();

  const lencanaBelajar = [
    { id: 1, name: "Umum" },
    { id: 2, name: "Donatur" },
    { id: 3, name: "Model Utama" },
    { id: 4, name: "Agenda Spesial" },
    { id: 5, name: "Tematik Pilihan" },
    { id: 6, name: "Agenda Harian" },
  ];

  const level = [
    {
      id: 1,
      name: "Login Lv-4",
      day: 180,
      ket: "berturut-turut",
      point: 60,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 2,
      name: "Login Lv-5",
      day: "Belajar 360 hari",
      ket: "berturut-turut",
      point: 360,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 3,
      name: "Login Lv-6",
      day: "Belajar 720 hari",
      ket: "berturut-turut",
      point: 240,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 4,
      name: "Cerdas Lv-1",
      day: "Meraih nilai 90% pada",
      ket: "100 pelajaran",
      point: 60,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 5,
      name: "Ceerdas Lv-2",
      day: "Meraih nilai 90% pada",
      ket: "200 pelajaran",
      point: 120,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 6,
      name: "Cerdas Lv-4",
      day: "Meraih nilai 90% pada",
      ket: "420 pelajaran",
      point: 240,
      icon: <MdStarBorderPurple500 />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      {/* Name */}
      <div className="overflow-x-auto  mt-5 nowrap pb-4 flex gap-3  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
        {lencanaBelajar.map((item) => (
          <div
            key={item.id}
            className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
              item.id == 1 && "bg-[hsl(218,93%,50%)] text-white"
            }`}
          >
            <h5 className="font-normal text-sm">{item.name}</h5>
          </div>
        ))}
      </div>
      {/* pendapatan lencana */}
      <div className="flex flex-col gap-3 mt-5 text-lg mb-8">
        <h1 className="font-medium text-sm flex text-[#0961F5]">
          100/300{" "}
          <span className="font-semibold text-[#333] mx-2">
            Lencana telah didapatkan
          </span>
        </h1>
        <div className="flex gap-3 justify-between items-center mt-3">
          <p className="text-sm   font-normal flex items-center">
            Urutkan berdasarkan:
          </p>
          <div className="border border-gray-200 rounded-xl p-2 flex items-center">
            <select className="bg-transparent outline-none text-sm  px-2">
              <option value="Lencana tertinggi" className="text-center">
                Lencana tertinggi
              </option>
              <option value="Lencana terkecil" className="text-center">
                Lencana terkecil
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* map level belajar */}
      <div className="grid grid-cols-3 gap-3 -mt-5">
        {level.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col gap-3  gap-y-1 items-center ${
              item.id === 3 && "bg-pink-200 rounded-xl"
            }`}
          >
            <h1
              className={`text-7xl font-bold ${
                item.id === 1
                  ? "text-blue-500"
                  : item.id === 2
                  ? "text-green-500"
                  : item.id === 3
                  ? "text-purple-500 "
                  : item.id === 4
                  ? "text-yellow-500"
                  : item.id === 5
                  ? "text-rose-300"
                  : item.id === 6
                  ? "text-blue-700"
                  : ""
              }`}
            >
              {item.icon}
            </h1>
            <p className="text-xs -mt-1 font-semibold">{item.name}</p>
            <p className="text-xs flex-grow items-center text-center">
              {item.day}
            </p>
            <p className="text-xs flex-grow items-center text-center">
              {item.ket}
            </p>
            <p className="text-xs flex items-center text-center">
              <img src="/Diamond.png" alt=""  />
              <span className="text-[#0961F5] font-semibold">{item.point}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Belajar;
