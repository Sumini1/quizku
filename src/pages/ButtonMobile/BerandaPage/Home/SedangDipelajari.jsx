import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../../Context/ThemeContext";
import { MdAccessTimeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SedangDipelajari = () => {
  const Navigate = useNavigate();
  const { borderColor, getTextTitle1, getIconTheme, middleTheme } = useTheme();
  const belajar = [
    { id: 1, name: "Semua", route: "/semua" },
    { id: 2, name: "Pengingat", route: "/pengingat" },
    { id: 3, name: "Informasi", route: "/informasi" },
    { id: 4, name: "Iklan", route: "/iklan" },
    { id: 5, name: "Umum", route: "/umum" },
  ];

  const category = [
    {
      id: 1,
      name: "DasarIslam",
      title: "Keimanan",
      link: "/keimanan",
      day: "3 Hari yang lalu",
      ket: "Lanjut Belajar",
      progress: 2 / 3,
    },
    {
      id: 2,
      name: "DasarIslam",
      title: "Muamalah",
      link: "/muamalah",
      day: "3 Hari yang lalu",
      ket: "Lanjut Belajar",
      progress: 1 / 3,
    },
    {
      id: 3,
      name: "DasarIslam",
      title: "Fiqih",
      link: "/fiqih",
      day: "3 Hari yang lalu",
      ket: "Lanjut Belajar",
      progress: 2 / 3,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen w-full h-full ">
      <div
        className={`py-2 flex flex-col text-xl flex-grow max-w-md mx-auto w-full h-full ${middleTheme()} p-5`}
      >
        <div onClick={() => Navigate(-1)} className="flex gap-2 items-center mt-2">
          <FaArrowLeft className="items-center flex text-xl" />
          <h1 className="font-semibold text-xl items-center flex">
            Sedang Dipelajari
          </h1>
        </div>

        {/* Mapping name */}
        <div className="overflow-x-auto whitespace-nowrap pb-4 flex gap-3  mt-8  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
          {belajar.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                item.id === 1 && "bg-[hsl(218,93%,50%)] text-white"
              }`}
            >
              <h5 className="font-normal text-sm">{item.name}</h5>
            </Link>
          ))}
        </div>

        {/* Maping Category */}
        <div className="flex flex-col mt-3 gap-y-5 ">
          {category.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className={`flex flex-col border-2 rounded-xl  px-5 py-3 ${borderColor()}`}
            >
              <div className="flex justify-between  ">
                <h1 className={`text-sm font-medium mb-1 ${getTextTitle1()} `}>
                  {item.name}
                </h1>
                <p className="text-xs flex items-center">
                  <MdAccessTimeFilled />
                  {item.day}
                </p>
              </div>
              <p className="text-sm font-base mb-2">{item.title}</p>
              <div className="flex items-center w-full  mb-2 relative h-6">
                <div
                  className="h-4 bg-[#F59D09] rounded-l-full flex items-center justify-center text-white text-xs font-normal relative z-10"
                  style={{ width: `${item.progress * 100}%` }}
                >
                  {Math.round(item.progress * 100)}%
                </div>
                <div
                  className="h-4 bg-gray-200 rounded-r-full flex items-center justify-center text-gray-500 text-xs font-medium"
                  style={{ width: `${(1 - item.progress) * 100}%` }}
                >
                  {/* {Math.round((1 - item.progress) * 100)}% */}
                </div>
              </div>
              <h5 className={`text-xs font-semibold ${getIconTheme()}`}>
                {item.ket}
              </h5>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SedangDipelajari;
