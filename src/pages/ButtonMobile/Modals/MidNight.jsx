import React, { useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";

const MidNight = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  const { getButtonClass } = useTheme();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5">
      {/* Kontainer Modal */}
      <div className="bg-white p-6 rounded-lg shadow-lg  w-full relative  ">
        {/* Tombol Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-2 flex justify-center items-center -mt-2 -mr-3 "
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>

        <div>
          {/* Header Modal */}
          <h1 className="text-xl ml-[-20px] font-semibold mb-4 text-center">
            Apa itu tingkatan dasar Islam?
          </h1>

          {/* Isi Modal */}
          <p className="text-sm  leading-relaxed">
            Tingkatan dasar Islam adalah langkah awal untuk memahami ajaran
            Islam secara mendalam. Ini termasuk pengenalan terhadap keyakinan,
            ibadah, dan akhlak yang menjadi dasar kehidupan seorang muslim.
          </p>
          <h1 className="text-md font-semibold mt-5 mb-3">
            Untuk siapa tingkatan ini ?
          </h1>
          <ol type="1" className="list-decimal pl-5 text-sm  leading-relaxed">
            <li>Muslim yang ingin belajar dari dasar</li>
            <li>
              Muallaf yang membutuhkan ilmu dan praktek dasar secara cepat
            </li>
            <li>Peserta diluar agama islam yang ingin belajar ilmu islam</li>
          </ol>
          <h1 className="text-md font-semibold mt-5 mb-3">
            Apa yang perlu dipersiapkan ?
          </h1>
          <p className="text-sm  leading-relaxed">
            Cukup persiapkan diri karena materi dari dasar akan dibahas semudah
            mungkin
          </p>
        </div>
        <button
          onClick={onClose}
          className={`mt-4 w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${getButtonClass()}`}
        >
          Selesai Membaca
        </button>
      </div>
    </div>
  );
};

export default MidNight;
