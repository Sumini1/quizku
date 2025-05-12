import React, { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaStarOfDavid, FaAward, FaCirclePlus } from "react-icons/fa6";
import { AiTwotoneTags } from "react-icons/ai";
import { IoDiamond, IoColorPaletteSharp } from "react-icons/io5";
import { useTheme } from "../../../Context/ThemeContext";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";
import { FaArrowRightLong } from "react-icons/fa6";
import MidNight from "../../../pages/ButtonMobile/Modals/MidNight";
import SkyBlue from "../../../pages/ButtonMobile/Modals/SkyBlue";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import shapire from "../../../assets/progress/shapire.png";
import soalMateri from "../../../assets/progress/soalMateri.png";
import pemula from "../../../assets/beranda/pemula.png";
import level from "../../../assets/progress/level.png";
import fire from "../../../assets/progress/fire.png";
import diamond from "../../../assets/progress/diamond.png";
import books from "../../../assets/progress/books.png";
import pertemanan from "../../../assets/progress/pertemanan.png";
import lencana from "../../../assets/beranda/lencana.png";
import sertifikat from "../../../assets/progress/sertifikat.png";
import coins from "../../../assets/progress/coins.png";
import news from "../../../assets/progress/news.png";
import durasiJam from "../../../assets/progress/durasiJam.png";
import ceklis from "../../../assets/progress/ceklis.png";
import tanyaJawab from "../../../assets/progress/tanyaJawab.png";
import calender from "../../../assets/progress/calender.png";

const ProgressDetail = () => {
  const navigate = useNavigate();
  const {
    theme,
    getThemeLoveClass,
    getBorderColor,
    getLatarBeranda,
    getIconTheme,
  } = useTheme();
  const [activeModal, setActiveModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const closeModal = () => {
    setActiveModal(false);
    setSelectedTheme(null);
  };

  const penghargaan = [
    {
      id: 1,
      name: "Shapire",
      level: "Level donatur",
      link: "/progress/level-donatur",
      icon: <img src={shapire} alt="shapie" />,
    },
    {
      id: 2,
      name: "Pemula",
      level: "Pangkat",
      link: "/pangkat",
      icon: <img src={pemula} alt="pemula" />,
    },
    {
      id: 3,
      name: 100,
      level: "Pembuatan Soal Materi",
      link: "/progress/pembuatan-soal",
      icon: <img src={soalMateri} alt="soalMateri" />,
    },
    {
      id: 4,
      name: 1000,
      level: "Posisi Level",
      link: "#",
      icon: <img src={level} alt="level" />,
    },
    {
      id: 5,
      name: 1,
      level: "Lencana",
      link: "/lencana-belajar",
      icon: <img src={lencana} alt="lencana" />,
    },
  ];

  const statistik = [
    {
      id: 1,
      progress: 50,
      link: "/belajar",
      position: "Belajar berturut-turut",
      icon: <img src={fire} alt="fire" />,
    },
    {
      id: 2,
      progress: 1,
      link: "/posisi-level",
      position: "Pertemanan",
      icon: <img src={pertemanan} alt="pertemanan" />,
    },
    {
      id: 3,
      progress: 100,
      link: "/toko-berlian",
      position: "Total Berlian",
      icon: <img src={diamond} alt="diamond" />,
    },
    {
      id: 4,
      progress: 100,
      link: "/progress-statistic/detail",
      position: "Sertifikat Didapatkan",
      icon: <img src={sertifikat} alt="sertifikat" />,
    },
    {
      id: 5,
      progress: 100,
      link: "/progress-statistic/detail",
      position: "Total Poin",
      icon: <img src={coins} alt="sertifikat" />,
    },
  ];

  const analisis = [
    {
      id: 1,
      progress: 100,
      link: "/progress-analisis",
      position: "Pembelajaran Tuntas",
      icon: <img src={books} alt="books" />,
    },
    {
      id: 2,
      progress: "100%",
      link: "/progress-analisis",
      position: "Total hari belajar",
      icon: <img src={calender} alt="calender" />,
    },
    {
      id: 3,
      progress: 100,
      link: "/progress-analisis",
      position: "Durasi belajar",
      icon: <img src={durasiJam} alt="durasi" />,
    },
    {
      id: 4,
      progress: 100,
      link: "/progress-analisis",
      position: "Soal terjawab",
      icon: <img src={tanyaJawab} alt="tanya jawab" />,
    },
    {
      id: 5,
      progress: 100,
      link: "/progress-analisis",
      position: "Jawaban benar",
      icon: <img src={ceklis} alt="ceklis" />,
    },
    {
      id: 6,
      progress: 100,
      link: "/progress-analisis",
      position: "Artikel dibaca",
      icon: <img src={news} alt="news" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-grow flex flex-col max-w-md mx-auto w-full bg-white">
        <div className="p-5 pb-0 flex-1 overflow-y-auto">
          <h1 className="text-xl font-semibold">Progress</h1>

          {/* Penghargaan */}
          <div className="flex flex-col mt-5">
            <h2 className="text-lg font-[500]">Penghargaan</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {penghargaan.map((item) => (
                <Link to={item.link} key={item.id}>
                  <div
                    className={`flex flex-col w-full border-[3px] p-2 rounded-xl ${
                      Number(item.id) === 1
                        ? "border-[#0961F5] bg-[#DCE6F8]"
                        : Number(item.id) === 2
                        ? "border-[#E4C726] bg-[#FFFEF1]"
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
                    <p className="mt-3 text-xs font-[500]">{item.level}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Statistik */}
          <div className="flex flex-col mt-5">
            <h2 className="text-lg font-[500]">Statistik</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {statistik.map((item) => (
                <Link to={item.link} key={item.id}>
                  <div
                    className={`flex flex-col w-full border-[3px] border-[#DCE6F8] bg-white p-2 rounded-xl ${
                      theme === "dark" && "bg-gray-800 text-white"
                    }  ${theme === "lemonade" && "border-gray-400"}`}
                  >
                    <div className="flex gap-x-1 w-full">
                      <div className={`text-2xl items-center flex w-5 h-5`}>
                        {item.icon}
                      </div>
                      <p className="text-center text-sm font-medium">
                        {item.progress}
                      </p>
                    </div>
                    <p className="mt-3 text-xs font-[500]">{item.position}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Analisis */}
          <div className="flex flex-col mt-5 pb-4">
            <h2 className="text-lg font-[500]">Analisis</h2>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {analisis.map((item) => (
                <Link to={item.link} key={item.id}>
                  <div
                    className={`flex flex-col w-full border-[3px] border-[#DCE6F8] bg-white p-2 rounded-xl ${
                      theme === "dark" && "bg-gray-800 text-white"
                    }  ${theme === "lemonade" && "border-gray-400"}`}
                  >
                    <div className="flex gap-x-1 w-full">
                      <div className={`text-2xl items-center flex w-6 h-6`}>
                        {item.icon}
                      </div>
                      <p className="text-center text-sm font-medium">
                        {item.progress}
                      </p>
                    </div>
                    <p className="mt-3 text-xs font-[500]">{item.position}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Button */}
        <div className="w-full">
          <ButtonNavbar />
        </div>
      </div>

      {activeModal && selectedTheme === "Skyward Blue" && (
        <SkyBlue isOpen={activeModal} onClose={closeModal} />
      )}

      {activeModal && selectedTheme !== "Skyward Blue" && selectedTheme && (
        <MidNight isOpen={activeModal} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProgressDetail;
