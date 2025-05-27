import React, { useState } from 'react';
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { IoDiamond, IoColorPaletteSharp } from "react-icons/io5";
import { GrStarOutline } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

const HadiahSaya = () => {
    const {
        theme,
        middleTheme,
        getBorderColor,
        getButtonClass,
        getBorder,
        getIconTheme,
      } = useTheme();
      const navigate = useNavigate();

        const pemula = [
          {
            id: 1,
            name: "Warna",
            icon: <FaCheck />,
            type: "Midnight Breeze-Softlight",
          },
          {
            id: 2,
            name: "Warna",
            icon: <FaCheck />,
            type: "Skyward Blue",
          },
          {
            id: 3,
            name: "Warna",
            icon: <FaCheck />,
            type: "Midnight Breeze-Softlight",
          },
          {
            id: 4,
            name: "Lencana",
            link: "#",
            icon: <GrStarOutline />,
            type: "Awalan yang bagus",
            // progress: 100,
          },
        ];
        const themesByIndex = ["dark", "cupcake", "lemonade", "light"];
    return (
      <div className="flex flex-col min-h-screen w-full">
        <p className="text-sm font-normal  ">
          Merupakan hadiah yang akan didapatkan saat posisi level dicapai.
          Hadiah dapat berupa tema, warna, lencana maupun pangkat.
        </p>
        <div className="flex  items-center mt-5">
          <img src="/pangkat2.png" alt=""  />
          <p className="text-sm font-semibold">Pemula (1 - 10)</p>
        </div>
        <div className="grid grid-cols-1 justify-center gap-y-0">
          <div className="grid grid-cols-1 mt-2 gap-y-0">
            {pemula.map((item, index) => {
              const itemTheme = themesByIndex[index % themesByIndex.length];
              const isSpecialId = item.id === 5;
              const commonClasses = `flex flex-col w-full p-2 rounded-xl`;
              const heightClass = isSpecialId
                ? "h-[40px] justify-center"
                : "h-[70px]";
              const themeClasses =
                itemTheme === "dark"
                  ? `bg-[#123456] text-[#87CEEB] rounded-b-none border-[1px] border-y-[1px] ${getBorderColor()}`
                  : itemTheme === "cupcake"
                  ? `bg-[#DDDDDD] text-[#0961F5] rounded-t-none rounded-b-none border-[1px] border-y-[1px] ${getBorderColor()}`
                  : itemTheme === "lemonade"
                  ? `bg-gradient-to-r from-white to-rose-500 text-[#4B4B4B] rounded-t-none rounded-b-none border-[1px] border-y-[1px]  ${getBorderColor()}`
                  : `bg-white text-[#4B4B4B] rounded-t-none rounded-b-xl border-[1px] border-y-[1px] ${getBorderColor()}`;

              return (
                <div
                  key={item.id}
                  className={`${commonClasses} ${heightClass} ${themeClasses}`}
                >
                  <div className="flex items-center gap-x-2 justify-center ">
                    <h5
                      className={`border-none w-[30px]  mx-3 flex items-center justify-center text-lg h-[30px] font-[500] rounded-full ${
                        isSpecialId
                          ? "bg-transparent text-[#222]"
                          : itemTheme === "light" || itemTheme === "bumblebee"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-[#222] items-center justify-center"
                      }`}
                    >
                      {!isSpecialId && item.id}
                    </h5>

                    <div className="flex flex-col ">
                      <h5
                        className={`font-medium text-sm mt-1  ${
                          isSpecialId && "text-center flex -ml-14"
                        }`}
                      >
                        {item.name}
                      </h5>
                      <h5 className="mt-2 text-xs">{item.type}</h5>
                    </div>

                    <div
                      className={`ml-auto flex mx-3  gap-3 justify-center items-center font-bold ${getIconTheme()} ${
                        item.id === 5 && "text-[#4B4B4B]"
                      }`}
                    >
                      <h5
                        className={`font-medium text-2xl  ${
                          isSpecialId && "text-xl -mr-2"
                        }  ${item.id === 4 && "text-3xl text-blue-500"}`}
                      >
                        {item.icon}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default HadiahSaya;