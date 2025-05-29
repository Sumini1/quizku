// ModalUjianAkhir (Refactored)
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import ModalHasilUjian from "./ModalHasilUjian";
import { fetchExamsByUnitId } from "../Reducer/examsSlice";
import { useTheme } from "../../../Context/ThemeContext";

const ModalUjianAkhir = ({ isOpen, onClose, unitId }) => {
  const {
    getButtonClass,
    getIconTheme,
    getBorderClass,
    getThemeModalCategory,
  } = useTheme();
  const dispatch = useDispatch();

  const [isModalHasilUjianOpen, setIsModalHasilUjianOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const units = useSelector((state) => state.units.data);
  const examsState = useSelector((state) => state.exams);

  const exams = Array.isArray(examsState?.data)
    ? examsState.data
    : Array.isArray(examsState)
    ? examsState
    : [];
  const isExamsLoading = examsState?.loading || examsState?.isLoading || false;
  const examsError = examsState?.error || null;

  const [unitData, setUnitData] = useState(null);
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    if (isOpen && unitId) {
      setExamData(null);
      if (fetchExamsByUnitId) dispatch(fetchExamsByUnitId(unitId));
    }
  }, [isOpen, unitId, dispatch]);

  useEffect(() => {
    if (!unitId) return;
    const currentUnit = units?.find(
      (u) => String(u.unit_id) === String(unitId)
    );
    setUnitData(
      currentUnit || { unit_id: unitId, unit_name: `Unit ${unitId}` }
    );

    const matchExam = exams.find((exam) =>
      ["unit_id", "exam_unit_id"].some(
        (key) => String(exam[key]) === String(unitId)
      )
    );
    setExamData(matchExam || null);
  }, [unitId, units, exams]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleHasilUjian = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalHasilUjianOpen(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="bg-white rounded-lg shadow-lg w-full p-5 max-w-md relative mx-auto md:p-10">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div className="flex items-center justify-center space-x-1 mb-3">
          <FaHeart className={`${getIconTheme()} text-xl font-bold`} />
          <h1 className="text-base">Donatur</h1>
        </div>

        {isExamsLoading ? (
          <div className="text-center mb-4">
            <div className="animate-pulse h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Memuat ujian akhir...</p>
          </div>
        ) : examsError ? (
          <div className="text-center mb-4">
            <p className="text-red-500 mb-2">Gagal memuat ujian akhir</p>
            <button
              onClick={() => dispatch(fetchExamsByUnitId(unitId))}
              className="text-sm text-blue-500 underline"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <p className="text-center text-base mb-4">
            {examData?.name_exams ||
              examData?.exam_name ||
              "Ujian akhir untuk menguji pemahaman materi."}
          </p>
        )}

        <Link to={`/readings/${unitId}`}>
          <button
            className={`mt-4 w-full py-2 px-4 rounded-xl border-none ${getBorderClass()}`}
          >
            Baca Materi Artikel
          </button>
        </Link>

        {isExamsLoading ? (
          <button
            disabled
            className="mt-4 w-full py-2 px-4 rounded-xl bg-gray-300 text-gray-500"
          >
            <div className="flex items-center justify-center space-x-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <span>Memuat Ujian Akhir...</span>
            </div>
          </button>
        ) : examData ? (
          <Link to={`/pemula/exam-satu/${examData.exam_id || examData.id}`}>
            <button
              className={`mt-4 w-full py-2 px-4 rounded-xl border-none ${getButtonClass()}`}
            >
              Mulai Ujian Akhir +40 XP
            </button>
          </Link>
        ) : examsError ? (
          <button
            onClick={() => dispatch(fetchExamsByUnitId(unitId))}
            className="mt-4 w-full py-2 px-4 rounded-xl border border-red-300 bg-red-50 text-red-700"
          >
            🔄 Coba Muat Ulang Ujian
          </button>
        ) : (
          <button
            onClick={handleHasilUjian}
            className={`mt-4 w-full py-2 px-4 rounded-xl ${getButtonClass()}`}
          >
            Mulai Ujian +40 XP
          </button>
        )}

        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div
              className={`p-10 rounded-xl flex flex-col items-center gap-4 ${getThemeModalCategory()}`}
            >
              <div
                className={`text-7xl p-2 rounded-2xl h-[70px] w-[70px] flex items-center justify-center animate-spin ${getIconTheme()}`}
              >
                <AiOutlineLoading3Quarters />
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
