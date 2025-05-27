import React, { useState } from "react";
import { FaArrowLeft, FaGifts } from "react-icons/fa";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineError, MdInfo } from "react-icons/md";

const TematikPilihan = () => {
  const { theme, middleTheme, getIconColorAlert, getBorder } = useTheme();
  const navigate = useNavigate();
  const tematik = [
    {
        id : 1,
        title: "Keutamaan bulan-bulan Islam",
        units: 4,
    },
    {
        id : 2,
        title: "Sejarah bangsa Yahudi",
        units: 4,
    },
    {
        id : 3,
        title: "Keutamaan orang beriman",
        units: 4,
    },
    {
        id : 4,
        title: "Keutamaan beriman kepada Allah ta'ala",
        units: 4,
    },
  ]
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl flex-grow max-w-md mx-auto w-full h-full ${middleTheme()}`}
      >
        {/* Header */}
        <div
          onClick={() => navigate(-1)}
          className="flex p-5 items-center gap-2"
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl tracking-wide">
            Tematik Pilihan
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 px-5 py-3 ">
          {tematik.map((item) => (
            <div key={item.id} className={`flex flex-col border p-3 rounded-xl ${getBorder()}`}>
              <div className="flex justify-between items-center">
                <h1 className="font-medium text-base  tracking-wide">
                  {item.title}
                </h1>
                <MdOutlineError className={`${getIconColorAlert()}`} />
              </div>
              <h1 className="font-normal text-sm tracking-wide">
                {item.units} Unit
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TematikPilihan;
