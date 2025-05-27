import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const NotifikasiDetail = () => {
  const { middleTheme, getTextTitle1 } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-5"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Notifikasi Detail</h1>
        </div>

        <div className="flex flex-col mt-5">
          <div className="flex items-center gap-3 px-5">
            <p className="text-xs">1 jam yang lalu</p>
          </div>
          <p className="px-5 text-sm mt-2">
            Quiz app sudah memiliki 10 materi baru pada pelajaran Aqidah Akhlak.
            Bersiaplah dari sekarang...
          </p>
          <p className="px-5 text-sm mt-2">
            Mulai 12 agustus 2025. Quiz app akan melaknakan program khusus
            menyambut hari raya Idul Adha. Bersiaplah dari sekarang....
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotifikasiDetail;
