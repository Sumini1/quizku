import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { useTheme } from "../../../../Context/ThemeContext";
import { MdOutlineError } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import ButtonNavbar from "../../../../Components/ListButton/ButtonNavbar";
import Grid from "./Grid";
import List from "./List";

const JelajahiAplikasi = () => {
  const {
    getTextTitle,
    borderColor,
    theme,
    getIconColorAlert,
    getTextTitle1,
    middleTheme,
  } = useTheme();
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Grid");

  const tabs = [
    { label: "Grid", icon: <BsFillGrid3X3GapFill className="text-md" /> },
    { label: "List", icon: <FaList className="text-md" /> },
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen w-full h-full">
        <div
          className={`flex mx-auto flex-col flex-grow max-w-md w-full ${middleTheme()}`}
        >
          {/* Header */}
          <div className="flex justify-between items-center m-5 mb-4">
            <div className="flex items-center gap-2">
              <FaArrowLeft
                className="text-xl cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="font-semibold text-xl">Jelajahi Aplikasi</h1>
            </div>
            <IoSearch
              className="text-2xl cursor-pointer mr-14 -mt-2 md:-mt-0 md:mr-0"
              onClick={() => setIsSearchActive((prev) => !prev)} // Toggle input search
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col mt-3">
            <div className="flex text-sm font-normal gap-1 m-5 -mt-1">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  onClick={() => setActiveTab(tab.label)}
                  className={`flex  items-center gap-1   p-2 rounded-lg  cursor-pointer ${
                    activeTab === tab.label
                      ? "bg-[#0961F5] text-white w-[60px] items-center"
                      : "bg-transparent w-[70px] items-center text-base font-medium"
                  }`}
                >
                  {tab.icon}
                  <span className=" items-center flex text-md font-semibold">
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bagian Grid Tab */}
            <>{activeTab === "Grid" && <Grid />}</>

            {/* Bagian List Tab */}
            {activeTab === "List" && <List />}
          </div>
          {/* Sticky Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full">
            <ButtonNavbar className="p-0 m-0 text-white flex justify-center items-center h-12" />
          </div>
        </div>
      </div>
    </>
  );
};

export default JelajahiAplikasi;
