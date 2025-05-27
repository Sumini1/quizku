import React, { useState } from "react";
import { FaArrowLeft, FaGifts, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../Context/ThemeContext";
import { AiOutlineGift } from "react-icons/ai";
import { IoDiamond, IoColorPaletteSharp } from "react-icons/io5";
import { GrStarOutline } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import HadiahTersedia from "./HadiahTersedia";
import HadiahSaya from "./HadiahSaya";

const HadiahPencapaian = () => {
  const { getBorderColor, getButtonClass, getBorder, middleTheme } =
    useTheme();
  const [activeTab, setActiveTab] = useState("hadiah-tersedia");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const tabs = [
    {
      id: "hadiah-tersedia",
      icon: <FaGifts className="w-[20px] h-[20px]" />,
    },
    {
      id: "hadiah-saya",
      icon: <AiOutlineGift className="w-[20px] h-[20px]" />,
    },
  ];




  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex justify-between items-center mr-20">
          <Link to={"/progress"}>
            <div className="flex items-center gap-3 mt-5 px-5 text-lg mb-8">
              <FaArrowLeft />
              <h1 className="font-semibold">Hadiah Pencapaian</h1>
            </div>
          </Link>
          <CiSearch
            className="text-2xl -mt-4 cursor-pointer md:-mr-14"
            onClick={() => setIsSearchActive((prev) => !prev)} // Toggle input search
          />
        </div>

        <div className="flex flex-col px-5">
          <div
            className={`flex gap-3 text-sm font-normal justify-between ${getBorder()}`}
          >
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                flex items-center gap-2 text-sm font-medium p-2 rounded-full transition-all duration-300 w-1/2
                ${
                  activeTab === tab.id
                    ? `${getButtonClass()} border-[#DCE6F8] border-[4px] justify-center`
                    : "bg-transparent justify-center border-gray-300"
                } cursor-pointer
              `}
              >
                {tab.icon}
                <span>
                  {tab.id
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-start justify-between">
            {activeTab === "hadiah-tersedia" && (
              <div className="flex flex-col w-full ">
                {isSearchActive && (
                  <div className="relative flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 mb-4">
                    <input
                      type="text"
                      placeholder="Cari hadiah yang tersedia..."
                      className="bg-transparent w-full pl-10 rounded-xl outline-none"
                    />
                    <CiSearch className="absolute left-3 text-xl text-gray-500" />
                  </div>
                )}
                <HadiahTersedia />
              </div>
            )}

            {activeTab === "hadiah-saya" && (
              <div className="flex flex-col w-full">
                {isSearchActive && (
                  <div className="relative flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 mb-4">
                    <input
                      type="text"
                      placeholder="Cari hadiah saya..."
                      className="bg-transparent w-full pl-10 rounded-xl outline-none"
                    />
                    <CiSearch className="absolute left-3 text-xl text-gray-500" />
                  </div>
                )}

                <HadiahSaya />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HadiahPencapaian;
