import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Kontributor = () => {
  const navigate = useNavigate();
  const { getButtonClass, getLatarBeranda, middleTheme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen w-full h-full`}>
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-5"
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Kontributor</h1>
        </div>

        <div
          className={`flex  flex-col m-4 gap-3 px-2 ${getButtonClass()} border-none`}
        >
          <div className="p-3">
            <h3 className="text-lg  mb-3 font-bold">Misi Projek Quiz Kami</h3>
            <h5 className="text-sm mb-5 font-medium">
              Misi kami terdepan dalam pengajaran islam dan bahasa arab dengan
              teknologi tinggi.
            </h5>
            <div className="bg-white  flex gap-2 rounded-xl p-1 w-[100px] justify-center items-center ml-52 m-2 md:ml-auto">
              <img src="/Vector.png" alt="" />
              <h5 className="text-center text-[#222] text-sm ">Jelajahi</h5>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col m-4 mt-8 gap-3 px-3">
          <h2 className="text-lg font-[500]">Gabung Menjadi Kontributor</h2>
          <h5 className="text-sm font-base">
            "Kontribusi Anda adalah investasi jangka panjang untuk dakwah. Soal
            dan materi yang Anda dukung akan menjadi sarana belajar yang terus
            bermanfaat."
          </h5>
        </div>
        {/* penulis pengajar */}
        <div className="-mt-3">
          {/* Kotak 1*/}
          <div className="flex flex-col m-4 gap-3 px-4  p-5 rounded-xl border-[2px] border-[#0849B6]">
            <h1 className="text-[#0849B6] font-[500] text-base">
              Penulis dan Pengajar
            </h1>
            <div className="flex gap-3">
              <p className="font-normal text-sm">
                Gabung menjadi pengajar dengan membuat artikel maupun soal.
              </p>
              <img src="/Teacher.png" alt="" className="-mt-10" />
            </div>
            <h1 className="text-sm font-[500]">
              Dapatkan benefit khusus pengajar
            </h1>
          </div>
          {/* Kotak 2 */}
          <div className="flex flex-col m-4 gap-3 px-4  p-5 rounded-xl border-[2px] border-[#50B4B3]">
            <h1 className="text-[#50B4B3] font-[500] text-base">Tim Ahli</h1>
            <div className="flex gap-3">
              <p className="font-normal text-sm">
                Gabung menjadi tim ahli dari berbagai bidang seperti IT, digital
                marketing, desainer dan lainnya
              </p>
              <img src="/Worker.png" alt="" className="-mt-10" />
            </div>
            <h1 className="text-sm font-[500]">
              Dapatkan benefit khusus tim ahli
            </h1>
          </div>
        </div>

        <div
          onClick={() => navigate("/progress/donasi-sekarang")}
          className="md:fixed p-5 md:bottom-0 md:w-full md:max-w-md md:left-1/2 md:transform md:-translate-x-1/2 md:bg-white md:py-4 md:px-5"
        >
          <button className={`${getButtonClass()} border-none p-3 w-full`}>
            Gabung Menjadi Kontributor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kontributor;
