import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";

const Umum = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { theme, getButtonClass, getThemeModalCategory, getBorder } =
    useTheme();

  const [activeTab, setActiveTab] = useState("materi");
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
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-full relative max-w-md ${getThemeModalCategory()}`}
      >
        <div
          className={`flex gap-3  text-sm font-normal justify-between ${getBorder()}`}
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
              <div className="flex flex-col ">
                <h2 className="text-lg font-[600] mb-3 ">Tingkatan Umum</h2>
                <h1 className="text-md font-[500] mb-1">
                  Apa itu tingkat dasar Islam ?
                </h1>
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  Adalah Pembelajaran yang disusun untuk memperdalam pemahaman
                  tentang Rukun Iman, Tauhid, dan prinsip akidah, sehingga
                  memperkokoh keyakinan serta nilai-nilai keislaman dalam
                  kehidupan.
                </p>

                <h1 className="text-md font-[500] ">
                  Untuk siapa tingkatan ini?
                </h1>

                <ol className="list-decimal pl-5 text-sm leading-relaxed mb-2">
                  <li>Muslim yang ingin belajar dari dasar</li>
                  <li>
                    Muallaf yang membutuhkan ilmu dan praktek dasar secara cepat
                  </li>
                  <li>
                    Peserta diluar agama islam yang ingin belajar ilmu islam
                  </li>
                </ol>

                <h1 className="text-md font-[500] mb-1">
                  Kemampuan yang perlu disiapkan
                </h1>

                <p className="text-sm leading-relaxed">
                  Cukup persiapkan diri karena materi dari dasar akan dibahas
                  semudah mungkin
                </p>
              </div>
            </div>
          )}

          {/* agian Informasi */}
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

export default Umum;
