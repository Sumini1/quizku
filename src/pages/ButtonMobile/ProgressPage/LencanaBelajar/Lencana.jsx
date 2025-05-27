import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdStarBorderPurple500 } from "react-icons/md";
import { useTheme } from "../../../../Context/ThemeContext";
import { BsAwardFill } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Belajar from "./Belajar";
import Donatur from "./Donatur";
import Koleksi from "./Koleksi";

const Lencana = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("belajar");
  const { getBorderColor, getButtonClass, getBorder, middleTheme } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const tabs = [
    {
      id: "belajar",
      icon: <BsAwardFill className="w-[20px] h-[20px]" />,
    },
    {
      id: "donatur",
      icon: <FaDonate className="w-[20px] h-[20px]" />,
    },
    {
      id: "koleksi",
      icon: <FaUserCheck className="w-[20px] h-[20px]" />,
    },
  ];

 

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex justify-between items-center mr-20">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
          >
            <FaArrowLeft />
            <h1 className="font-semibold text-xl">Lencana</h1>
          </div>

          <IoSearch
            className="text-2xl -mt-4 cursor-pointer md:-mr-14"
            onClick={() => setIsSearchActive((prev) => !prev)} // Toggle input search
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col px-5">
          {/* fitur tab */}
          <div
            className={`flex gap-4 text-sm font-normal justify-center ${getBorder()}`}
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

          {/* Bagian tab belajar */}
          {activeTab === "belajar" && (
            <>
              {isSearchActive && (
                <div className="relative flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 mt-5">
                  <input
                    type="text"
                    placeholder="Cari level belajar..."
                    className="bg-transparent w-full pl-10 rounded-xl outline-none"
                  />
                  <IoSearch className="absolute left-3 text-xl text-gray-500" />
                </div>
              )}

              <Belajar />
            </>
          )}

          {/* activeTab Donatur */}
          {activeTab === "donatur" && (
            <>
              {isSearchActive && (
                <div className="relative flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 mt-5">
                  <input
                    type="text"
                    placeholder="Cari level belajar..."
                    className="bg-transparent w-full pl-10 rounded-xl outline-none"
                  />
                  <IoSearch className="absolute left-3 text-xl text-gray-500" />
                </div>
              )}
              <Donatur />
            </>
          )}

          {/* activeTab Koleksi */}
          {activeTab === "koleksi" && (
            <div className="flex flex-col mt-5 gap-y-3">
              {isSearchActive && (
                <div className="relative flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 ">
                  <input
                    type="text"
                    placeholder="Cari level belajar..."
                    className="bg-transparent w-full pl-10 rounded-xl outline-none"
                  />
                  <IoSearch className="absolute left-3 text-xl text-gray-500" />
                </div>
              )}
              <Koleksi />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lencana;
