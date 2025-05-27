import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { FaHeart } from "react-icons/fa";
import { ImLeaf } from "react-icons/im";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai"; // Tambahkan ikon Close
import ModalHasilUjian from "./ModalHasilUjian";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ModalUjianAkhir = ({ isOpen, onClose, unitId }) => {
  if (!isOpen) {
    return null;
  }

  const {
    getButtonClass,
    getIconTheme,
    getBorderClass,
    getThemeModalCategory,
  } = useTheme();
  const [isModalOverViewOpen, setIsModalOverViewOpen] = useState(false);
  const [isModalHasilUjianOpen, setIsModalHasilUjianOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: units } = useSelector((state) => state.units);
  const { data: exams } = useSelector((state) => state.exams);
  const [unitData, setUnitData] = useState(null);
  const [examsData, setExamsData] = useState(null);

  useEffect(() => {
    if (unitId && units) {
      const currentUnit = units.find((unit) => unit.id === unitId);
      setUnitData(currentUnit);

      if (exams) {
        const unitExam = exams.find((exam) => exam.unit_id === unitId);
        setExamsData(unitExam);
      }
    }
  }, [unitId, units, exams]);

  const openModalOverView = () => {
    setIsModalOverViewOpen(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleHasilUjian = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalHasilUjianOpen(true);
    }, 2000); // Simulasi loading selama 2 detik
  };

  return (
    <div
      className="fixed top-0 z-50 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-5 rounded-xl shadow-lg w-full relative max-w-md  mx-auto md:p-10">
        {/* Tombol Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="flex items-center justify-center space-x-1">
          <FaHeart className={`${getIconTheme()} text-xl font-bold`} />
          <h1 className="text-base">Donatur</h1>
        </div>
        {/* <h1 className="text-xl font-semibold items-center justify-center flex">
          {unitData ? unitData.name : "Loading..."}
        </h1> */}
        <div className="flex items-center justify-center mb-4 space-x-2">
          <p className="text-center text-base mb-4">
            {examsData
              ? examsData?.name_exams
              : "Ujian akhir untuk quizz ini belum tersedia"}
          </p>
        </div>

        <Link to={`/readings/${unitId}`}>
          <button
            className={`mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none focus:shadow-outline ${getBorderClass()}`}
          >
            Baca Materi Artikel
          </button>
        </Link>
        <button
          onClick={handleHasilUjian}
          className={`mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none focus:shadow-outline ${getButtonClass()}`}
        >
          Mulai Ujian + 40 XP
        </button>
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className={`p-10 rounded-xl flex flex-col items-center gap-4 ${getThemeModalCategory()}`}
            >
              <div
                className={`text-7xl p-2 font-semibold rounded-2xl h-[70px] w-[70px] flex items-center justify-center animate-spin border-none ${getIconTheme()}`}
                style={{ animation: "slow-spin 5s linear infinite" }}
              >
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
              <h1 className="text-lg font-semibold">Proses Memuat Materi</h1>
              <p>"Ilmu adalah cahaya"</p>
            </div>
          </div>
        )}
      </div>

      <ModalHasilUjian
        isOpen={isModalHasilUjianOpen}
        onClose={() => setIsModalHasilUjianOpen(false)}
        unitId={unitId}
      />
    </div>
  );
};

export default ModalUjianAkhir;
