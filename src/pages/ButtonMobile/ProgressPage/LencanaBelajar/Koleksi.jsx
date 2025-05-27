import React, { useState } from "react";
import { MdStarBorderPurple500 } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Koleksi = () => {
  const { getBorderColor, getButtonClass, getBorder } = useTheme();
  const navigate = useNavigate();

  const lencanaKoleksi = [
    {
      icon: <img src="/papper.png" alt="" />,
      name: "Lencana Belajar",
      symbol: <RiArrowRightSLine />,
    },
    {
      icon: <img src="/papper.png" alt="" />,
      name: "Lencana Donatur",
      symbol: <RiArrowRightSLine />,
    },
  ];

  const levelKoleksi = [
    {
      id: 1,
      name: "Cerdas Lv-1",
      day: 180,
      ket: "berturut-turut",
      point: 60,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 2,
      name: "Cerdas Lv-2",
      day: "Belajar 360 hari",
      ket: "berturut-turut",
      point: 360,
      icon: <MdStarBorderPurple500 />,
    },
    {
      id: 3,
      name: "Cerdas Lv-3",
      day: "Belajar 720 hari",
      ket: "berturut-turut",
      point: 240,
      icon: <MdStarBorderPurple500 />,
    },
  ];
  return (
    <div>
      {lencanaKoleksi.map((item, index) => (
        <div
          key={item.id || `lencana-${index}`}
          className="flex  justify-between gap-3 "
        >
          <h1 className="flex ">
            {item.icon}{" "}
            <span className="mt-3 text-sm font-medium">{item.name}</span>
          </h1>
          <p className="flex items-center text-2xl font-semibold">
            {item.symbol}
          </p>
        </div>
      ))}
      <div className="flex gap-3 justify-between items-center mt-4">
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
      <div className="grid grid-cols-3 gap-3 mt-5">
        {levelKoleksi.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col gap-3  gap-y-1 items-center `}
          >
            <h1
              className={`text-7xl font-bold ${
                item.id === 1
                  ? "text-blue-500"
                  : item.id === 2
                  ? "text-green-500"
                  : item.id === 3
                  ? "text-purple-500"
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
              <img src="/Diamond.png" alt="" />
              <span className="text-[#0961F5] font-semibold">{item.point}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Koleksi;
