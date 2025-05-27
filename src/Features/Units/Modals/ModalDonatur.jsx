import React from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { FaHeart } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import pemula from "../../../assets/beranda/pemula.png";
import point from "../../../assets/papanPeringkat/point.png";

const donaturData = [
  {
    id: 1,
    nama: "Muhammad",
    icon: pemula,
    poin: 100,
    level: "Lv-1",
  },
  { id: 2, nama: "Yahya", icon: point, poin: 100, level: "Lv-1" },
  { id: 3, nama: "Budi", icon: point, poin: 100, level: "Lv-1" },
];

const donaturSatuSoal = [
  {
    id: 1,
    nama: "Muhammad",
    icon: pemula,
    poin: 100,
    level: "Lv-1",
  },
  { id: 2, nama: "Yahya", icon: point, poin: 100 },
];
const donaturDuaSoal = [
  {
    id: 1,
    nama: "Muhammad",
    icon: pemula,
    poin: 100,
    level: "Lv-1",
  },
  { id: 2, nama: "Yahya", icon: point, poin: 100 },
];

const DonaturTable = ({ data }) => (
  <table className="w-full border border-collapse">
    <thead>
      <tr>
        <th className="border px-2 py-2">No.</th>
        <th className="border px-2 py-2">Nama</th>
      </tr>
    </thead>
    <tbody>
      {data.map((donatur, index) => (
        <tr key={`${donatur.id}-${index}`}>
          <td className="border px-4 py-2">{index + 1}.</td>
          <td className="border px-4 py-2 flex gap-1 items-center">
            {donatur.icon && (
              <img src={donatur.icon} alt="" className="w-6 h-6" />
            )}
            <span>{donatur.nama}</span>
            {donatur.poin && (
              <span className="bg-[#F9C883] text-[10px] rounded-xl px-2">
                {donatur.poin}
              </span>
            )}
            {donatur.level && (
              <span className="bg-[#83F9B6] text-[10px] rounded-xl px-2">
                {donatur.level}
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ModalDonatur = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { getThemeLoveClass, getTextTitle1, getButtonClass } = useTheme();

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-full bg-black bg-opacity-50 flex justify-center items-center rounded-xl">
      <div className="bg-white p-5 m-4 rounded-lg shadow-lg w-full relative max-h-[90%] overflow-hidden">
        <button
          className="absolute top-3 right-3 hover:text-red-500 focus:outline-none z-50"
          onClick={onClose}
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <div className="flex items-center justify-center mb-4 gap-1 sticky top-0 bg-white z-10 p-2">
          <FaHeart className={`${getThemeLoveClass()} text-xl`} />
          <h1 className="text-xl font-medium">Donatur</h1>
        </div>
        <h1 className="text-base font-medium mb-1">
          Donatur yang telah mendukung
        </h1>
        <h2 className="text-md font-semibold mb-2">
          "Pengantar Rukun Iman Bagian ke-2"
        </h2>

        {/* Area Kontribusi dengan scroll */}
        <div className="overflow-y-auto max-h-[350px]">
          <h1 className={`text-md font-base mb-2 ${getTextTitle1()}`}>
            Kontribusi Sistem
          </h1>
          <DonaturTable data={donaturData} />
          <h1 className={`text-md font-base mt-4 mb-2 ${getTextTitle1()}`}>
            Kontribusi Satu Soal
          </h1>
          <DonaturTable data={donaturSatuSoal} />
          <h1 className={`text-md font-base mt-4 mb-2 ${getTextTitle1()}`}>
            Kontribusi Dua Soal
          </h1>
          <DonaturTable data={donaturDuaSoal} />
          <div className="flex flex-col mt-4">
            <h5>Jazaakumullahu Khoiron atas partisipasinya</h5>
            <h5>Semoga Kontribusi ini menjadi amal jariyah</h5>
            <h5 className="mt-2 flex">
              Ikuti Project Pembuatan Soal,{" "}
              <span className="underline text-blue-500">disini</span>
            </h5>
          </div>
        </div>
        <button
          onClick={onClose}
          className={`${getButtonClass()} mt-7 border-none w-full p-2`}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default ModalDonatur;
