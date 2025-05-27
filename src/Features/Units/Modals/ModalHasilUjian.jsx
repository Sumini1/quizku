import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { FaHeart } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BiSolidErrorAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const ModalHasilUjian = ({ isOpen, onClose, unitId }) => {
  const { getButtonClass, getThemeModalCategory, theme, getIconTheme } =
    useTheme();
  const { data: units } = useSelector((state) => state.units);
  const { data: exams } = useSelector((state) => state.exams);
  const [examData, setExamData] = useState(null);
  const [unitData, setUnitData] = useState(null);
  // console.log("exams:", exams);
  // console.log("units:", units);

  // fetch unit and exam data based on unitId
  useEffect(() => {
    if (unitId && units) {
      const currentUnit = units.find((unit) => unit.id === unitId);
      setUnitData(currentUnit);

      if (exams) {
        const unitExam = exams.find((exam) => exam.unit_id === unitId);
        setExamData(unitExam);
      }
    }
  }, [unitId, units, exams]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center p-10"
      onClick={handleOverlayClick}
    >
      <div className="relative p-3 rounded-xl shadow-xl w-full max-w-md bg-[#D2E2FF]">
        {/* Tombol Close di kanan atas */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="flex flex-col justify-center items-center text-center">
          <BiSolidErrorAlt className="mb-5 text-6xl text-[#0961F5]" />

          <h1 className="text-lg font-semibold mb-3">
            Hasil Ujian Mempengaruhi Nilai Akhir
          </h1>

          <p className="text-base font-normal mb-3">
            Kerjakan soal sesuai kemampuan sendiri tanpa bantuan dalam bentuk
            apapun.
          </p>
        </div>

        <div className="flex justify-center w-full p-2">
          {examData && (
            <Link to={`/pemula/exam-satu/${examData.id}unitId=?=${unitId}`}>
              <button
                className={`mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none focus:shadow-outline ${getButtonClass()}`}
              >
                Mulai Ujian Akhir
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHasilUjian;
