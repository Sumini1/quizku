import React, { useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { MdTimer } from "react-icons/md";
import { IoDiamond, IoColorPaletteSharp } from "react-icons/io5";
import { GrStarOutline } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";
// import ModalArticle from "../Features/Units/Components/Readings";

const Pembelajaran = () => {
  const { getButtonClass, getLatarBeranda, getBorderColor, getIconTheme } =
    useTheme();

  const category = [
    {
      id: 1,
      name: "Artikel",
      link: "/pembelajaran/artikel",
      description: "Artikel dari pelajaran yang sudah diikuti.",
    },
    {
      id: 2,
      name: "Penilaian",
      link: "/pembelajaran/penilaian",
      description: "Penyusunan nilai dan laporan pembelajaran",
    },
    {
      id: 3,
      name: "Arsip",
      link: "/pembelajaran/arsip",
      description: "Artikel, pertanyaan dan catatan yang disimpan.",
    },
    {
      id: 4,
      name: "Kesalahan",
      link: "/pembelajaran/kesalahan",
      description: "Pertanyaan yang salah dijawab untuk evaluasi.",
    },
  ];

  const tantangan = [
    {
      id: 1,
      name: "login",
      icon: <IoDiamond />,
      type: "Login 7 hari berturut-turut",
      progress: 100,
    },
    {
      id: 2,
      name: "Poin",
      icon: <IoDiamond />,
      type: "Mencapai 200 poin",
      progress: 100,
    },
    {
      id: 3,
      name: "Login",
      icon: <IoDiamond />,
      type: "Mencapai 500 poin",
      progress: 100,
    },
    {
      id: 4,
      name: "Poin",
      link: "#",
      icon: <GrStarOutline />,
      type: "Mencapai 300 poin",
      // progress: 100,
    },
    {
      id: 5,
      name: "Lihat pembelajaran lainnya",
      link: "#",
      icon: <FaArrowRightLong />,
    },
  ];

  const lencanaIndex = ["satu", "dua", "tiga", "empat", "lima"];

  return (
    <>
      <div className="flex flex-col min-h-screen w-full h-full overflow-y-auto">
        <div className="flex flex-col text-xl flex-grow max-w-md mx-auto w-full bg-white pb-0">
          <div className="p-5 pb-0 flex-1 ">
            <h1 className="text-xl font-semibold mb-4">Pembelajaran</h1>
            <div
              className={`flex flex-col gap-3 px-1 ${getButtonClass()} border-none`}
            >
              <div className="p-3">
                <Link to={"/pilih-category"}>
                  <h3 className="text-lg mb-3 font-medium">
                    Tersedia Pilihan Pembelajaran
                  </h3>
                </Link>
                <h5 className="text-sm mb-5 font-medium">
                  Terdapat 4 tingkat, 20 kategori , 100 level / tema dan 1000
                  topik pembahasan.
                </h5>
                <div className="bg-white flex gap-2 rounded-xl p-1 w-[200px] justify-center items-center ml-32 m-1 md:ml-44">
                  <img src="/Vector.png" alt="" />
                  <h5 className="text-center text-[#222] text-sm font-semibold">
                    Jelajahi Pembelajaran
                  </h5>
                </div>
              </div>
            </div>
            {/* Content */}

            <div className="grid grid-cols-2 mt-8 w-full h-[180px] gap-y-3 gap-x-3 justify-center">
              {category.map((category) => (
                <Link to={category.link}>
                  <div
                    key={category.id}
                    className={`flex flex-col w-full h-[110px] gap-2 px-3 ${
                      category.id === 1
                        ? "bg-[#DCFFD9] rounded-xl p-2 "
                        : category.id === 2
                        ? "bg-[#DCE6F8] rounded-xl p-2 "
                        : category.id === 3
                        ? "bg-[#FFEF96] rounded-xl p-2 text-[#555555] "
                        : category.id === 4
                        ? "bg-[#FFD9D9] rounded-xl p-2 "
                        : ""
                    }`}
                  >
                    <h3
                      className={`text-lg font-medium ${
                        category.id === 1
                          ? "text-[#28A745]"
                          : category.id === 2
                          ? "text-[#0961F5]"
                          : category.id === 3
                          ? "text-[#B39700]"
                          : category.id === 4
                          ? "text-[#C15E42]"
                          : ""
                      }`}
                    >
                      {category.name}
                    </h3>

                    <h5 className="text-sm -mt-1 font-normal">
                      {category.description}
                    </h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <hr className="w-full text-[#EEEEEE] font-bold border-6 m-0 mt-20 " />
          {/* tantangan */}
          <div className="flex flex-col p-5 pb-10">
            <div className="flex justify-between -mt-8 md:-mt-0">
              <h2 className="text-lg font-[500]">Ikuti Tantangan</h2>
              <p className="flex items-center">
                <MdTimer className="text-[#F59D09]" />
                <span className="text-xs text-[#F59D09]">4 hari tersisa</span>
              </p>
            </div>
            <p className="text-sm mt-2">
              Selesaikan tantangan dan dapatkan berbagai macam hadiah dan
              lencananya.
            </p>
            <div className="grid grid-cols-1 gap-y-0">
              <div className="grid grid-cols-1 mt-5 gap-y-0">
                {tantangan.map((item, index) => {
                  const itemTheme = lencanaIndex[index % lencanaIndex.length];
                  const isSpecialId = item.id === 5;
                  const commonClasses = `flex flex-col w-full p-2 rounded-xl`;
                  const heightClass = isSpecialId
                    ? "h-[40px] justify-center"
                    : "h-[70px]";
                  const themeClasses =
                    itemTheme === "satu"
                      ? `rounded-b-none border-[1px] ${getBorderColor()}`
                      : itemTheme === "dua"
                      ? `rounded-t-none rounded-b-none border-[1px] ${getBorderColor()}`
                      : itemTheme === "tiga"
                      ? `rounded-t-none rounded-b-none border-[1px] ${getBorderColor()}`
                      : itemTheme === "empat"
                      ? `bg-white text-[#4B4B4B] rounded-t-none rounded-b-none border-[1px] ${getBorderColor()}`
                      : itemTheme === "lima"
                      ? `bg-white text-[#4B4B4B] rounded-t-none border-[1px] rounded-b-xl ${getBorderColor()}`
                      : `rounded-t-none rounded-b-none border-[1px] ${getBorderColor()}`;

                  return (
                    <Link to={item.link}>
                      <div
                        key={item.id}
                        className={`${commonClasses} ${heightClass} ${themeClasses}`}
                      >
                        <div className="flex items-center gap-x-2">
                          <h5
                            className={`border-none p-1 w-[30px] mx-2 flex items-center justify-center text-sm h-[30px] font-[500] rounded-full ${
                              isSpecialId
                                ? "bg-transparent text-[#222]"
                                : "bg-blue-500 text-white"
                            }`}
                          >
                            {!isSpecialId && item.id}
                          </h5>

                          <div className="flex flex-col">
                            <h5
                              className={`font-medium ${
                                item.id === 5
                                  ? "text-left flex -ml-16 px-5"
                                  : ""
                              }`}
                            >
                              {item.name}
                            </h5>
                            <h5 className="text-xs">{item.type}</h5>
                          </div>

                          <div
                            className={`ml-auto flex mx-3 gap-1 justify-center items-center font-bold ${getIconTheme()} ${
                              item.id === 5 && "text-[#4B4B4B] "
                            }`}
                          >
                            <h5
                              className={`font-medium ${
                                item.id === 4 && "text-3xl"
                              } ${isSpecialId && "text-xl"}`}
                            >
                              {item.icon}
                            </h5>
                            <p className={`text-sm ${getIconTheme()}`}>
                              {item.progress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-50">
          <ButtonNavbar />
        </div>
      </div>
    </>
  );
};

export default Pembelajaran;
