import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const Dasar = ({ isOpen, onClose, categoryId }) => {
  if (!isOpen) return null;

  const { getButtonClass, getThemeModalCategory, getBorder } = useTheme();
  const [activeTab, setActiveTab] = useState("materi");

  // Get difficulties data from Redux store
  const { data = [] } = useSelector((state) => state.difficulties);

  // Find the specific difficulty data based on categoryId
  const categoryData = data.find((difficulty) => difficulty.id === categoryId);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const tabs = [
    {
      id: "materi",
      icon: <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />,
    },
    {
      id: "informasi",
      icon: <HiInformationCircle className="w-[20px] h-[20px]" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
      {/* Overlay redup */}
      <div
        onClick={handleOverlayClick}
        className="absolute inset-0 bg-black opacity-50 z-0"
      ></div>
      <div
        className={`p-6 rounded-lg shadow-lg w-full relative max-w-md ${getThemeModalCategory()}`}
      >
        <div
          className={`flex gap-3 text-sm font-normal justify-between ${getBorder()}`}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-sm font-medium p-2 rounded-full transition-all duration-300 w-1/2 cursor-pointer
                ${
                  activeTab === tab.id
                    ? `${getButtonClass()} border-[#DCE6F8] border-[4px] justify-center`
                    : "bg-transparent justify-center border-gray-300"
                }
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

        {/* Bagian Materi */}
        <div className="mt-5 h-full overflow-y-auto">
          {activeTab === "materi" && (
            <div>
              <div className="flex flex-col text-base font-medium">
                {categoryData ? categoryData.description_long : "Loading..."}
              </div>
            </div>
          )}

          {/* Bagian Informasi */}
          {activeTab === "informasi" && (
            <div className="flex justify-center items-center h-[300px]">
              <h1>Informasi ditunggu</h1>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className={`mt-5 w-full text-[15px] font-medium py-2 px-4 border-none rounded-xl focus:outline-none focus:shadow-outline ${getButtonClass()}`}
        >
          Selesai Membaca
        </button>
      </div>
    </div>
  );
};

export default Dasar;
