import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalHasilUjian from "./ModalHasilUjian";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvaluationsByUnitId } from "../Reducer/evaluationsSlice";


const ModalEvaluasi = ({ isOpen, onClose, unitId }) => {
  const { getButtonClass, getIconTheme, getBorderClass } = useTheme();
  const dispatch = useDispatch();

  const [isModalHasilUjianOpen, setIsModalHasilUjianOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const units = useSelector((state) => state.units.data);
  const evaluationsState = useSelector((state) => state.evaluations);

  // Handle evaluations state based on the actual payload structure
  let evaluations = [];
  let isEvaluationsLoading = false;
  let evaluationsError = null;
  let evaluationsTotal = 0;

  if (evaluationsState) {
    // Check for loading state
    isEvaluationsLoading =
      evaluationsState.loading || evaluationsState.isLoading || false;

    // Check for error state
    evaluationsError = evaluationsState.error || null;

    // Extract evaluations data from the specific payload structure
    if (evaluationsState.data && Array.isArray(evaluationsState.data)) {
      evaluations = evaluationsState.data;
      evaluationsTotal = evaluationsState.total || evaluations.length;
    } else if (Array.isArray(evaluationsState)) {
      evaluations = evaluationsState;
      evaluationsTotal = evaluations.length;
    }
  }

  const [unitData, setUnitData] = useState(null);
  const [evaluationData, setEvaluationData] = useState(null);

  // Fetch evaluations when modal opens and unitId is available
  useEffect(() => {
    if (isOpen && unitId) {
      console.log("🚀 Fetching evaluations for unitId:", unitId);

      // Reset evaluation data before fetching
      setEvaluationData(null);

      // Dispatch the fetch action
      dispatch(fetchEvaluationsByUnitId(unitId)).catch((error) => {
        console.error("❌ Failed to fetch evaluations:", error);
      });
    }
  }, [isOpen, unitId, dispatch]);

  // Process unit and evaluation data
  useEffect(() => {
    console.log("🔍 Processing data with:", {
      unitId,
      unitsLength: units?.length,
      evaluationsLength: evaluations?.length,
      isEvaluationsLoading,
      evaluationsError,
    });

    // Handle unit data
    if (unitId) {
      if (units && Array.isArray(units) && units.length > 0) {
        // Find current unit with flexible type matching
        let currentUnit = units.find((unit) => {
          return (
            unit.unit_id == unitId ||
            String(unit.unit_id) === String(unitId) ||
            parseInt(unit.unit_id) === parseInt(unitId)
          );
        });

        console.log("🔍 Found unit:", currentUnit);
        setUnitData(currentUnit);

        if (
          currentUnit &&
          Array.isArray(evaluations) &&
          evaluations.length > 0
        ) {
          // Find evaluation that matches the unit based on the payload structure
          const unitIdToMatch = currentUnit.unit_id;

          let matchedEvaluation = evaluations.find((ev) => {
            // Based on payload: evaluation_unit_id is the field we need to match
            return (
              ev.evaluation_unit_id == unitIdToMatch ||
              String(ev.evaluation_unit_id) === String(unitIdToMatch) ||
              parseInt(ev.evaluation_unit_id) === parseInt(unitIdToMatch)
            );
          });

          console.log("🔍 Found evaluation:", matchedEvaluation);
          setEvaluationData(matchedEvaluation || null);
        } else {
          console.log("🔍 No evaluations available or unit not found");
          setEvaluationData(null);
        }
      } else {
        console.log("🔍 No units data available");
        // Create a fallback unit object if we have unitId but no units data
        setUnitData({ unit_id: unitId, unit_name: `Unit ${unitId}` });

        // Still try to process evaluations if available
        if (Array.isArray(evaluations) && evaluations.length > 0) {
          let matchedEvaluation = evaluations.find((ev) => {
            return (
              ev.evaluation_unit_id == unitId ||
              String(ev.evaluation_unit_id) === String(unitId) ||
              parseInt(ev.evaluation_unit_id) === parseInt(unitId)
            );
          });
          setEvaluationData(matchedEvaluation || null);
        } else {
          setEvaluationData(null);
        }
      }
    } else {
      console.log("🔍 No unitId provided");
      setUnitData(null);
      setEvaluationData(null);
    }
  }, [unitId, units, evaluations]);

  if (!isOpen) return null;

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
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="bg-white rounded-lg shadow-lg w-full p-5 max-w-md relative mx-auto md:p-10">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center space-x-1 mb-3">
          <FaHeart className={`${getIconTheme()} text-xl font-bold`} />
          <h1 className="text-base">Donatur</h1>
        </div>

        {/* Evaluation Description */}
        {isEvaluationsLoading ? (
          <div className="text-center mb-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Memuat evaluasi...</p>
          </div>
        ) : evaluationsError ? (
          <div className="text-center mb-4">
            <p className="text-red-500 mb-2">
              Gagal memuat evaluasi:{" "}
              {typeof evaluationsError === "string"
                ? evaluationsError
                : "Terjadi kesalahan"}
            </p>
            <button
              onClick={() => dispatch(fetchEvaluationsByUnitId(unitId))}
              className="text-sm text-blue-500 hover:text-blue-700 underline"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <p className="text-center text-base mb-4">
            {evaluationData?.evaluation_name ||
              "Evaluasi pembelajaran untuk pemantapan materi dan persiapan ujian akhir."}
          </p>
        )}

        {/* Read Article Button */}
        <Link to={`/readings/${unitId}`}>
          <button
            className={`mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none focus:shadow-outline ${getBorderClass()}`}
          >
            Baca Materi Artikel
          </button>
        </Link>

        {/* Start Evaluation Button */}
        {isEvaluationsLoading ? (
          <button
            disabled
            className="mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              <span>Memuat Evaluasi...</span>
            </div>
          </button>
        ) : evaluationData ? (
          <Link
            to={`/pemula/evaluations-satu/${evaluationData.evaluation_id}`}
          >
            <button
              className={`mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none focus:shadow-outline ${getButtonClass()}`}
            >
              Mulai Evaluasi +40 XP
            </button>
          </Link>
        ) : evaluationsError ? (
          <button
            onClick={() => dispatch(fetchEvaluationsByUnitId(unitId))}
            className="mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border border-red-300 focus:outline-none bg-red-50 text-red-700 hover:bg-red-100"
          >
            🔄 Coba Muat Ulang Evaluasi
          </button>
        ) : (
          <button
            disabled
            className="mt-4 w-full text-[16px] font-normal py-2 px-4 rounded-xl border-none focus:outline-none bg-gray-300 text-gray-500 cursor-not-allowed"
          >
            Evaluasi Tidak Tersedia
          </button>
        )}

       

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="p-10 rounded-xl flex flex-col items-center gap-4 bg-[#D2E2FF]">
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

      {/* Modal hasil ujian */}
      <ModalHasilUjian
        isOpen={isModalHasilUjianOpen}
        onClose={() => setIsModalHasilUjianOpen(false)}
        unitId={unitId}
      />
    </div>
  );
};

export default ModalEvaluasi;
