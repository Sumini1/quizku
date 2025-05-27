import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useTheme } from "../../../../../Context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";

const Notifikasi = () => {
  const navigate = useNavigate();
  const { getTextTitle1, getButtonClass, middleTheme } = useTheme();

  const information = [
    { id: 1, name: "Semua", route: "/semua" },
    { id: 2, name: "Pengingat", route: "/pengingat" },
    { id: 3, name: "Informasi", route: "/informasi" },
    { id: 4, name: "Iklan", route: "/iklan" },
    { id: 5, name: "Umum", route: "/umum" },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Notifikasi</h1>
        </div>

        {/* Mapping name */}
        <div className="overflow-x-auto whitespace-nowrap pb-4 flex gap-3 px-4  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
          {information.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                item.id === 1 && "bg-[hsl(218,93%,50%)] text-white"
              }`}
            >
              <h5 className="font-normal text-sm">{item.name}</h5>
            </Link>
          ))}
        </div>

        {/* Notifications */}
        <Link to={"/notifikasi-detail"}> 
          <div className="flex flex-col mt-3">
            <div className="flex items-center gap-3 px-5">
              <h1 className={`${getTextTitle1()} text-base`}>Pengingat</h1>
              <p className="text-xs">1 jam yang lalu</p>
            </div>
            <p className="px-5 text-sm mt-2">
              Mulai 12 Agustus 2025. Quiz app akan melaksanakan program khusus
              menyambut Hari Raya Idul Adha. Bersiaplah dari sekarang...
            </p>
            <hr className="mt-3 w-[350px] flex mx-auto" />
          </div>
        </Link>

        <div className="flex flex-col mt-5">
          <div className="flex items-center gap-3 px-5">
            <h1 className={`${getTextTitle1()} text-base`}>Informasi</h1>
            <p className="text-xs">1 jam yang lalu</p>
          </div>
          <p className="px-5 text-sm mt-2">
            Quiz app sudah memiliki 10 materi baru pada pelajaran Aqidah Akhlak.
            Bersiaplah dari sekarang...
          </p>
          <hr className="mt-3 w-[350px] flex mx-auto" />
        </div>

        <div className="flex flex-col mt-5">
          <div className="flex items-center gap-3 px-5">
            <h1 className={`${getTextTitle1()} text-base`}>Pengingat</h1>
            <p className="text-xs">1 jam yang lalu</p>
          </div>
          <p className="px-5 text-sm mt-2">
            Mulai 12 Agustus 2025. Quiz app akan melaksanakan program khusus
            menyambut Hari Raya Idul Adha. Bersiaplah dari sekarang...
          </p>
          <hr className="mt-3 w-[350px] flex mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;
