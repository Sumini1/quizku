import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../Context/ThemeContext";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
// import ButtonNavbar from '../../../Components/ListButton/ButtonNavbar';

const ProfilSaya = () => {
  const navigate = useNavigate();
  const {
    theme,
    getThemeLoveClass,
    borderColor,
    getLatarBeranda,
    getIconTheme,
  } = useTheme();
  const [visibility, setVisibility] = useState("allow");

  const penghargaan = [
    {
      id: 1,
      name: "Shapire",
      level: "Level donatur",
      link: "/progress/level-donatur",
      icon: <img src="/Shapir.png" alt="" />,
    },

    {
      id: 2,
      name: 100,
      level: "Pembuatan Soal Materi",
      link: "/progress/pembuatan-soal",
      icon: <img src="/document.png" alt="" srcset="" />,
    },
    {
      id: 3,
      name: 1000,
      level: "Posisi Level",
      link: "/progress-statistic/detail",
      icon: <img src="/Rank.png" alt="" srcset="" />,
    },
  ];

  const statistik = [
    {
      id: 1,
      progress: 50,
      link: "/belajar",
      position: "Belajar berturut-turut",
      icon: <img src="/Fire.png" alt="" srcset="" />,
    },
    {
      id: 2,
      progress: 1,
      link: "/posisi-level",
      position: "Pertemanan",
      icon: <img src="/Certificate.png" alt="" srcset="" />,
    },
    {
      id: 3,
      progress: 100,
      link: "/toko-berlian",
      position: "Total Hari Belajar",
      icon: <img src="/Info.png" alt="" srcset="" />,
    },

    {
      id: 4,
      progress: 100,
      link: "/progress-statistic/detail",
      position: "Soal Terjawab",
      icon: <img src="/Calendar.png" alt="" srcset="" />,
    },
    {
      id: 5,
      progress: "100 jam",
      link: "/progress-statistic/detail",
      position: "Durasi Belajar",
      icon: <img src="/Hourglass.png" alt="" srcset="" />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-col bg-[#F7F7F7] ${
          visibility === "allow" ? "h-[200px]" : "h-[145px]"
        }`}
      >
        <div className="flex gap-2 items-center p-5">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
          <h1 className="font-semibold text-xl">Profil Saya</h1>
        </div>
        {/* Content */}
        <div className="flex flex-col px-5 ">
          <div className="flex items-center justify-between ">
            <h1 className="text-[#333] font-semibold text-lg flex gap-2 items-center">
              Rendi Maulana{" "}
              <span>
                <CiEdit />
              </span>
            </h1>
            <p className="flex items-center gap-1 bg-[#FFFEF1] border-[#E4C726] border rounded-xl p-2">
              <span>
                <img src="/iconPemula.png" alt="" className="w-5 h-5" />
              </span>
              <span className="text-sm font-medium">Pemula</span>
            </p>
          </div>
          <p className="text-sm font-medium">Bergabung pada 3 November 2025</p>
          {/* Medali */}

          {visibility === "allow" && (
            <div className="flex gap-5 items-center mt-4">
              <div className="flex gap-2">
                <img src="/medali1.png" alt="" />
                <img src="/medali2.png" alt="" />
                <img src="/medali3.png" alt="" />
              </div>
              <p className="text-sm font-normal underline">
                Lencana selengkapnya
              </p>
            </div>
          )}
        </div>
        {/* Penghargaan */}
        <div className="flex flex-col mt-5 p-5">
          <p className="flex justify-between gap-2 text-sm font-normal items-center mb-5 ">
            <span className="text-sm font-normal">
              Izinkan profil saya dilihat peserta lain
            </span>
            <div className="relative w-32">
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className={`appearance-none rounded-xl p-2 w-full border-2 pr-10 text-sm ${borderColor()}`}
              >
                <option value="allow" className="text-sm font-normal">
                  Izinkan
                </option>
                <option value="hide" className="text-sm font-normal">
                  Sembunyikan
                </option>
              </select>
              {/* Tambahkan ikon dropdown manual */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500" // Perbesar ikon
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </p>
          {visibility === "allow" ? (
            <div>
              <h2 className="text-lg font-[500] ">Penghargaan</h2>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {penghargaan.map((item) => (
                  <Link to={item.link} key={item.id}>
                    <div
                      className={`flex flex-col w-full border-[3px] p-2 rounded-xl ${
                        Number(item.id) === 1
                          ? "border-[#0961F5] bg-[#DCE6F8]"
                          : "border-[#DCE6F8] bg-white"
                      } ${theme === "dark" && "bg-gray-800 text-white"} ${
                        theme === "lemonade" && "border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-x-1">
                        <div
                          className={`text-2xl w-6 h-6 flex ${getThemeLoveClass()}`}
                        >
                          {item.icon}
                        </div>
                        <p className="text-center text-sm">{item.name}</p>
                      </div>
                      <p className="mt-3 text-xs font-[500] ">{item.level}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Statistik */}
              <div className="flex flex-col mt-5 ">
                <h2 className="text-lg font-[500]">Statistik</h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {statistik.map((item) => (
                    <Link to={item.link} key={item.id}>
                      <div
                        key={item.id}
                        className={`flex flex-col w-full border-[3px] border-[#DCE6F8] bg-white p-2 rounded-xl ${
                          theme === "dark" && "bg-gray-800 text-white"
                        }  ${theme === "lemonade" && "border-gray-400"}`}
                      >
                        <div className="flex gap-x-1  w-full">
                          <div
                            className={`text-2xl items-center flex w-6 h-6 `}
                          >
                            {item.icon}
                          </div>
                          <p className="text-center text-sm font-medium">
                            {item.progress}
                          </p>
                        </div>
                        <p className="mt-3 text-xs font-[500]">
                          {item.position}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* lencana */}
              <div className="flex flex-col mt-5 ">
                <h2 className="text-lg font-[500] mb-1">Lencana</h2>
                <p className=" text-sm font-[500]">
                  Merupakan lencana penghargaan berkaitan dengan pembelajaran
                  dan donasi.{" "}
                </p>
                <p
                  className={`flex border-2 rounded-xl p-2 mt-5   justify-between items-center gap-x-1   ${borderColor()}`}
                >
                  <span className="text-sm font-medium">
                    15 lencana telah didapatkan{" "}
                  </span>
                  <FaArrowRightLong className="text-xl  flex items-center" />
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center items-center text-gray-500  flex justify-center mt-28 text-lg font-medium mx-auto">
              Profil pengguna tidak ditampilkan untuk umum
            </p>
          )}
        </div>
      </div>

      {/* Navbar */}
      <div className="fixed bottom-0 w-full">
        <ButtonNavbar className="p-0 m-0 bg-blue-500 text-white flex justify-center items-center h-12" />
      </div>
    </div>
  );
};

export default ProfilSaya;
