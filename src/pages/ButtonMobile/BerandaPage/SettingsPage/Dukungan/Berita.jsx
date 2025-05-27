import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import gambar1 from "../../../../../assets/beranda/gambar1.png"

const Berita = () => {
  const navigate = useNavigate();
  const { getBorderColor, getButtonClass, getBorder, borderColor, middleTheme } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const information = [
    { id: 1, name: "Terbaru", link: "/dukung-kami/berita/terbaru" },
    { id: 2, name: "Hasil", link: "/pengingat" },
    { id: 3, name: "Materi Pembelajaran", link: "/informasi" },
    { id: 4, name: "Berita", link: "/iklan" },
    { id: 5, name: "Umum", link: "/umum" },
  ];

  const categoryBerita = [
    {
      id: 1,
      name: "Update Materi Dasar Islam kategori ",
      title: "Muamalah ( 1 )",
      view: 32,
      date: "15 Januari 2025",
      image: <img src={gambar1} alt="gambar" />,
    },
    {
      id: 2,
      name: "Update Materi Dasar Islam kategori ",
      title: "Fiqih ( 1 )",
      view: 32,
      date: "15 Januari 2025",
      image: <img src={gambar1} alt="gambar" />,
    },
    {
      id: 1,
      name: "Update Materi Dasar Islam kategori ",
      title: "Siroh Nabi ( 1 )",
      view: 32,
      date: "15 Januari 2025",
      image: <img src={gambar1} alt="gambar" />,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex justify-between items-center mr-20 ">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
          >
            <FaArrowLeft />
            <h1 className="font-semibold text-xl">Berita</h1>
          </div>

          <IoSearch
            className="text-2xl -mt-4 cursor-pointer"
            onClick={() => setIsSearchActive((prev) => !prev)} // Toggle input search
          />
        </div>
        {/* Mapping name */}
        <div className="overflow-x-auto whitespace-nowrap pb-4 flex gap-3 px-4  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
          {information.map((item) => (
            <div
              onClick={() => navigate(item.link)}
              to={item.route}
              key={item.id}
              className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                item.id === 1 && "bg-[hsl(218,93%,50%)] text-white"
              }`}
            >
              <h5 className="font-normal text-sm">{item.name}</h5>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col p-5">
          {isSearchActive && (
            <div className="relative -mt-3 flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 mb-8">
              <input
                type="text"
                placeholder="Cari level belajar..."
                className="bg-transparent w-full pl-10 rounded-xl outline-none"
              />
              <IoSearch className="absolute left-3 text-xl text-gray-500" />
            </div>
          )}

          {/* Map category Berita */}
          <div className="flex flex-col gap-y-3 -mt-4">
            {categoryBerita.map((item) => (
              <div
                key={item.id}
                className={`flex items-center rounded-xl p-3 justify-between gap-3 border-2 ${borderColor()}`}
              >
                <div className="flex flex-col">
                  <h1 className="text-xs font-normal mb-1">{item.name}</h1>
                  <p className="text-xs font-normal mb-2 ">{item.title}</p>
                  <h5 className="flex justify-between text-[#777] text-[10px]">
                    Dilihat : {item.view} <span>{item.date}</span>
                  </h5>
                </div>
                <h1 className="flex w-20 h-20">{item.image}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Berita;
