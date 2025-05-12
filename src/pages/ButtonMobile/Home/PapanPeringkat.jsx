import React, { useState } from "react";
import { FaArrowLeft, FaGifts } from "react-icons/fa";
import { AiOutlineGift } from "react-icons/ai";
import { useTheme } from "../../../Context/ThemeContext";
import TabelPekanIni from "../PapanPeringkatPage/TabelPekanIni";
import TabelPekanIniDonatur from "../PapanPeringkatPage/TabelPekanIniDonatur";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";

const PapanPeringkat = () => {
  const { getBorderColor, getButtonClass, getBorder, middleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("prestasi");
  const [activeTab2, setActiveTab2] = useState(1);
  const [activeTab3, setActiveTab3] = useState(1); // Menambahkan activeTab3 untuk donatur

  const tabs = [
    { id: "prestasi", icon: <FaGifts className="w-[20px] h-[20px]" /> },
    { id: "donatur", icon: <AiOutlineGift className="w-[20px] h-[20px]" /> },
  ];

  const tablePrestasi = [
    { id: 1, name: "Pekan ini" },
    { id: 2, name: "Bulan ini" },
    { id: 3, name: "Seluruhnya" },
    { id: 4, name: "Teman" },
  ];

  const tableDonatur = [
    { id: 1, name: "Pekan ini" },
    { id: 2, name: "Bulan ini" },
    { id: 3, name: "Seluruhnya" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl flex-grow max-w-md mx-auto w-full bg-white `}
      >
        {/* Header */}
        <div className="flex p-5 items-center gap-2">
          <FaArrowLeft />
          <h1 className="font-semibold text-xl tracking-wide">
            Papan Peringkat
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-col px-5">
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

          {/* Content */}
          <div className="mt-5">
            {activeTab === "prestasi" && (
              <div className="flex flex-col w-full">
                <div className="overflow-x-auto whitespace-nowrap pb-4 flex gap-3   scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
                  {tablePrestasi.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab2(item.id)}
                      className={`px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                        activeTab2 === item.id
                          ? "bg-[#222222] text-white"
                          : "bg-[#EEE] text-[#222222]"
                      }`}
                    >
                      <h5 className="font-normal text-sm">{item.name}</h5>
                    </div>
                  ))}
                </div>

                {/* Render Tabel Prestasi */}
                {activeTab2 === 1 && <TabelPekanIni />}
                {activeTab2 === 2 && (
                  <div className="flex flex-col w-full">
                    <h1>Bulan ini</h1>
                  </div>
                )}
                {activeTab2 === 3 && (
                  <div className="flex flex-col w-full">
                    <h1>Seluruhnya</h1>
                  </div>
                )}
                {activeTab2 === 4 && (
                  <div className="flex flex-col w-full">
                    <h1>Teman</h1>
                  </div>
                )}
              </div>
            )}

            {activeTab === "donatur" && (
              <div className="flex flex-col w-full">
                <div className="flex justify-start pb-4 gap-3">
                  {tableDonatur.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab3(item.id)} // Menggunakan activeTab3 untuk tab Donatur
                      className={`px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                        activeTab3 === item.id
                          ? "bg-[#222222] text-white"
                          : "bg-[#EEE] text-[#222222]"
                      }`}
                    >
                      <h5 className="font-normal text-sm">{item.name}</h5>
                    </div>
                  ))}
                </div>

                {/* Render Tabel Donatur */}
                {activeTab3 === 1 && <TabelPekanIniDonatur />}
                {activeTab3 === 2 && (
                  <div className="flex flex-col w-full">
                    <h1>Bulan ini</h1>
                  </div>
                )}
                {activeTab3 === 3 && (
                  <div className="flex flex-col w-full">
                    <h1>Seluruhnya</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Sticky Button */}
      <div className="flex justify-center w-full sticky bottom-0">
        <div className="w-full md:max-w-md">
          <ButtonNavbar />
        </div>
      </div>
    </div>
  );
};

export default PapanPeringkat;
