import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";

const RiwayatDana = () => {
  const navigate = useNavigate();
  const { borderColor, getButtonClass, getTextTitle1, middleTheme } = useTheme();

  const formatToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const dana = [
    {
      id: 1,
      pencairan: "Pencairan ke-4",
      jumlah: 1000000,
      date: "2 November 2025",
      link: "/dukung-kami/riwayat-dana/pencairan-dana-empat",
      description:
        "50% digunakan untuk pembuatan soal dan materi meliputi pengembangan konten, penelitian materi dan validasi jawaban.",
    },
    {
      id: 2,
      pencairan: "Pencairan ke-5",
      jumlah: 5000000,
      date: "2 Desember 2025",
      link: "/dukung-kami/riwayat-dana/pencairan-dana-lima",
      description:
        "50% digunakan untuk pembuatan soal dan materi meliputi pengembangan konten, penelitian materi dan validasi jawaban.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex flex-col p-5">
          <div
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <FaArrowLeft className="w-[20px] h-[20px]" />
            <h1 className="text-xl font-semibold">Riwayat Dana</h1>
          </div>

          {/* Riwayat */}
          <div
            className={`flex flex-col mt-7 ${borderColor()} border-2 p-3 rounded-xl`}
          >
            <p className="text-base font-normal">
              Dana yang sudah dipakai =
              <span className={`${getTextTitle1()} ml-2 font-semibold`}>
                Rp. 5.000.000
              </span>
            </p>
            <p className="flex text-base font-normal mt-2">
              Pencairan Dana =
              <span className="text-[#F59D09] ml-2 font-semibold">5 kali</span>
            </p>
            <div
              onClick={() =>
                navigate("/dukung-kami/riwayat-dana/pencairan-dana")
              }
              className={`flex items-center justify-between mt-2 ${borderColor()} border-2 rounded-xl p-2 cursor-pointer`}
            >
              <p className="text-sm font-semibold">Lihat riwayat</p>
              <MdOutlineArrowForwardIos className="text-md" />
            </div>
          </div>

          {/* Dana */}
          <div className="flex flex-col gap-y-4 mt-5 pb-5">
            <h2 className="text-lg font-[500]">Pencairan Dana</h2>
            {dana.map((item) => (
              <div
                onClick={() => navigate(item.link)}
                key={item.id}
                className="flex flex-col"
              >
                <div className="flex justify-between">
                  <h1 className="text-sm font-medium flex gap-2">
                    {item.id}. <span>{item.pencairan}</span>
                  </h1>
                  <p className="text-xs">{item.date}</p>
                </div>
                <div className="flex flex-col px-[18px] mb-3 mt-1">
                  <h5 className={`text-sm font-medium mb-2 ${getTextTitle1()}`}>
                    {formatToIDR(item.jumlah)}
                  </h5>

                  <p className="text-sm font-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => navigate("/progress/donasi-sekarang")}
          className="md:fixed p-5 md:bottom-0 md:w-full md:max-w-md md:left-1/2 md:transform md:-translate-x-1/2 md:bg-white md:py-4 md:px-5"
        >
          <button className={`${getButtonClass()} border-none p-3 w-full`}>
            Donasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiwayatDana;
