import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import latar1 from "../../../../../assets/lainnya/latar.png";
import { Link } from "react-router-dom";

const Tujuan = () => {
  const navigate = useNavigate();
  const { borderColor, getButtonClass, getTextTitle1, middleTheme } =
    useTheme();
  const [showAll, setShowAll] = useState(false);

  const paragraphs = [
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
    "Kami sediakan berbagai macam penghargaan yaitu lencana dan berbagai macam hadiah seperti warna, tema dan icon spesial sebagai bentuk apresiasi tertinggi.",
  ];

  const latar = [
    {
      id: 1,
      name: "Latar Belakang",
      link: "/dukung-kami/latar-belakang",
      description: "Sejarah dibalik dibuatnya aplikasi",
      image: <img src={latar1} alt="" />,
    },
    {
      id: 2,
      name: "Visi dan Misi",
      link: "/dukung-kami/latar-belakang/visi-dan-misi",
      description: "Visi dan misi aplikasi dibangun",
      image: <img src={latar1} alt="" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex flex-col p-5">
          <div onClick={() => navigate(-1)} className="flex gap-2 items-center">
            <FaArrowLeft
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-semibold">Tujuan</h1>
          </div>
          <div className="flex flex-col gap-3 mt-7">
            {(showAll ? paragraphs : paragraphs.slice(0, 3)).map(
              (text, index) => (
                <p key={index} className="text-base font-normal">
                  {text}
                </p>
              )
            )}
            {!showAll && (
              <p
                onClick={() => setShowAll(true)}
                className="text-sm font-semibold mt-3 underline  cursor-pointer underline-offset-4"
              >
                Lanjut membaca
              </p>
            )}
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5" />

        {/* Section */}
        <div className="flex flex-col mx-5 gap-2 gap-y-4">
          {latar.map((item) => (
            <div
              onClick={() => navigate(item.link)}
              key={item.id}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="w-12 h-12 flex">{item.image}</div>
              <div className="flex flex-col flex-grow">
                <p className="font-medium text-base mb-1">{item.name}</p>
                <p className="text-sm font-normal text-[#777]">
                  {item.description}
                </p>
              </div>
              <MdOutlineArrowForwardIos className="text-lg" />
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center px-5 mt-10 mb-5 md:mt-32">
          <Link to="/progress/donasi-sekarang" className="w-full max-w-md">
            <button className={`${getButtonClass()} w-full border-none p-3`}>
              Donasi Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tujuan;
