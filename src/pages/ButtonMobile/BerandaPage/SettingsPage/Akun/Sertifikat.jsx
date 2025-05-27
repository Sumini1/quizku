import React, { useState } from "react";
import { FaArrowLeft, FaChalkboardUser } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { BiCamera } from "react-icons/bi";
import { useTheme } from "../../../../../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const Sertifikat = () => {
  const navigate = useNavigate();
  const {
    getTextTitle1,
    getButtonClass,
    getIconTheme,
    getBorder,
    middleTheme,
  } = useTheme();
  const [activeTab, setActiveTab] = useState("tema / level");

  const tabs = [
    {
      id: "tema / level",
      icon: <BiCamera className="w-[20px] h-[20px]" />,
    },
    {
      id: "kategori",
      icon: <FaChalkboardUser className="w-[20px] h-[20px]" />,
    },
  ];

  const categories = [
    { id: 1, name: "Semua" },
    { id: 2, name: "Mode Utama" },
    { id: 3, name: "Qur'an Hadits" },
    { id: 4, name: "Agenda Spesial" },
    { id: 5, name: "Tematik Pilihan" },
    { id: 6, name: "Umum" },
  ];

  const certificates = [
    {
      id: 1,
      title: "Dasar Islam",
      category: "Keimanan",
      date: "Lulus 3 Desember 2025",
      score: 80,
      image: "/pajamas_search-results.png",
      link: "/sertifikat-dasar-islam",
    },
    {
      id: 2,
      title: "Tematik",
      category: "Keimanan",
      date: "Lulus 3 November 2025",
      score: 80,
      image: "/pajamas_search-results.png",
      link: "/sertifikat-tematik",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}  pb-10`}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-3 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Sertifikat</h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-col p-5">
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
                      ? `${getButtonClass()} border-[#DCE6F8] border-[2px] justify-center`
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
        </div>

        {/* Category filters */}
        <div className="overflow-x-auto nowrap pb-4 flex gap-3 px-5 scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
          {categories.map((item) => (
            <div
              key={item.id}
              className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                item.id === 1 ? "bg-[hsl(218,93%,50%)] text-white" : ""
              }`}
            >
              <h5 className="font-normal text-sm">{item.name}</h5>
            </div>
          ))}
        </div>

        {/* activetab */}
        {activeTab === "tema / level" && (
          <div>
            {/* Certificates grid */}
            <div className="grid grid-cols-1 gap-3 mt-4 px-5">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col border rounded-lg w-full h-full px-4 py-3"
                >
                  <div className="flex justify-between items-center">
                    <Link to={cert.link}>
                      <h1 className={`${getTextTitle1()} text-md mb-1`}>
                        {cert.title}
                      </h1>
                    </Link>
                    <div className="flex items-center gap-2">
                      <img
                        src={cert.image}
                        alt="Certificate Icon"
                        className="w-6 h-6 object-contain"
                      />
                      <p className="text-sm">
                        Nilai:{" "}
                        <span
                          className={`${getIconTheme()} text-sm font-[400]`}
                        >
                          {cert.score}
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-base mb-3">{cert.category}</p>
                  <div className="flex items-center gap-2">
                    <MdAccessTimeFilled />
                    <p className="text-sm">{cert.date}</p>
                  </div>
                  <div className="flex justify-between mt-3 mb-2">
                    <h5 className="text-md underline">Selengkapnya</h5>
                    <FiDownload />
                  </div>
                </div>
              ))}
            </div>

            {/* Fixed Button at Bottom */}
            <div className="fixed bottom-0 md:left-5 md:right-5 md:bottom-5  py-1 md:px-0 bg-white md:bg-transparent w-full md:w-auto mx-auto">
              <div className="max-w-md mx-auto w-full ">
                <Link to="/settings" className="block w-full p-5">
                  <button
                    className={`${getButtonClass()} p-3 w-full border-none`}
                  >
                    Selesai
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {
            activeTab === "kategori" && (
                <div className="flex flex-col justify-center p-5 ">
                    <h1>Belum ada category tersedia</h1>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Sertifikat;
