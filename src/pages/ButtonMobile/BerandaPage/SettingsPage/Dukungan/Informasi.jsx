import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const Informasi = () => {
  const navigate = useNavigate();
  const { getTextTitle1, borderColor, getButtonClass, middleTheme } =
    useTheme();

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
            <h1 className="text-xl font-semibold">Informasi</h1>
          </div>
          <h2 className="text-lg font-medium mt-3">Update Dana</h2>
          <div className="flex justify-between ">
            <p className="flex items-center text-sm font-normal">
              Dikumpulkan mulai Januari 2025{" "}
            </p>
            <p className="flex items-center text-xs font-normal">
              Sisa hari : <span className="text-sm font-bold ml-2 ">20</span>
            </p>
          </div>
          <p className="text-sm font-normal  mt-2">
            Terkumpul
            <span className={`${getTextTitle1()} font-medium ml-2`}>
              Rp.5.000.000
            </span>
            <span className="ml-2 text-sm font-bold">100 soal</span>
          </p>
          <p className="text-sm font-normal  mt-2">
            Dibutuhkan
            <span className={`text-[#F59D09] font-medium ml-2`}>
              Rp.25.000.000
            </span>
            <span className="ml-2 text-sm font-bold">2500 soal</span>
          </p>
          <p className="text-xs font-normal mt-3">
            Data diperbarui setiap 15 menit. Terakhir diperbarui pada 17 Jan
            2025 - 08:28 WIB
          </p>
          <p
            onClick={() => navigate("/dukung-kami/informasi/donatur")}
            className={`flex justify-between mt-5 items-center ${borderColor()} border-2 rounded-2xl p-2 text-xs font-bold px-2`}
          >
            Lihat riwayat donatur{" "}
            <IoIosArrowForward className="text-lg font-bold" />
          </p>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5 " />

        {/* Penggunaan Dana */}
        <div className="flex flex-col mx-5 pb-2 md:pb-12">
          <h2 className="text-lg font-semibold">Penggunaan</h2>
          <p className="text-sm font-normal">
            Penggunaan dana diperuntukkan untuk 2 hal utama, yaitu
          </p>
          <ol className="list-decimal pl-5">
            <li className={`text-base font-medium ${getTextTitle1()} mt-2`}>
              Pembuatan Soal
            </li>
            <p className="text-sm font-normal mt-1">
              50 % digunakan untuk pembuatan soal dan materi meliputi
              pengembangan konten, penelitian materi dan validasi jawaban.{" "}
            </p>
            <li className={`text-base font-medium ${getTextTitle1()} mt-2`}>
              Mengembangkan platform
            </li>
            <p className="text-sm font-normal mt-1">
              50 % digunakan untuk pembuatan soal dan materi meliputi
              pengembangan konten, penelitian materi dan validasi jawaban.{" "}
            </p>
          </ol>
        </div>
        <div onClick={() => navigate("/progress/donasi-sekarang")} className="md:fixed p-5 md:bottom-0 md:w-full md:max-w-md md:left-1/2 md:transform md:-translate-x-1/2 md:bg-white md:py-4 md:px-5">
          <button className={`${getButtonClass()} border-none p-3 w-full`}>
            Donasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Informasi;
