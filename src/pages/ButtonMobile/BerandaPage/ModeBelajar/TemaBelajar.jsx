import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";

const TemaBelajar = () => {
  const { theme, middleTheme, borderColor, getIconColorAlert } = useTheme();
  const navigate = useNavigate();

  const tema = [
    {
      id: 1,
      title: "Tafsir",
      totalLevel: 4,
    },
    {
      id: 2,
      title: "Al-Qur'an",
      totalLevel: 4,
    },
    {
      id: 3,
      title: "Hadits",
      totalLevel: 4,
    },
    {
      id: 4,
      title: "Qur'an dan Hadits",
      totalLevel: 4,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex mx-auto flex-col flex-grow max-w-md w-full ${middleTheme()}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center m-5 mb-4">
          <div className="flex -mt-1 items-center gap-2">
            <FaArrowLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="font-semibold text-xl">Tema</h1>
          </div>
          <IoSearch
            className="text-2xl cursor-pointer mr-14  md:-mt-0 md:mr-0"
            onClick={() => setIsSearchActive((prev) => !prev)} // Toggle input search
          />
        </div>

        <div className="flex flex-col p-5 gap-4">
          {tema.map((item) => (
            <div
              key={item.id}
              className={`flex  flex-col   border p-2 rounded-xl ${borderColor()} `}
            >
              <div className={`flex  justify-between items-center  `}>
                <h1 className="font-medium text-base">{item.title}</h1>
                <MdOutlineError className={`${getIconColorAlert()}`} />
              </div>
              <h1 className="font-normal text-sm">{item.totalLevel}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemaBelajar;
