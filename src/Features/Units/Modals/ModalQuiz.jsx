import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalDonatur from "./ModalDonatur";

const ModalQuiz = ({ onClose, unitId, sectionQuiz, quizId }) => {
  const { getButtonClass, getThemeLoveClass, getBorderClass } = useTheme();
  const [boxClicks, setBoxClicks] = useState({});
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(quizId || null);

  useEffect(() => {
    if (quizId) {
      setSelectedQuizId(quizId);
    }
  }, [quizId]);

  useEffect(() => {
    // Load box clicks from localStorage when component mounts
    try {
      const savedClicks = JSON.parse(localStorage.getItem("boxClicks")) || {};
      setBoxClicks(savedClicks);
    } catch (error) {
      console.error("Error loading box clicks from localStorage:", error);
      setBoxClicks({});
    }
  }, []);

  // Extract quizzes from sectionQuiz data structure
  const quizzes = useMemo(() => {
    if (!sectionQuiz?.quizzes || !Array.isArray(sectionQuiz.quizzes)) {
      return [];
    }

    // Map the quiz data to use quiz_id consistently
    return sectionQuiz.quizzes.map((quiz) => ({
      id: quiz.quiz_id, // Map quiz_id to id for consistency
      quiz_id: quiz.quiz_id,
      name: quiz.quiz_name,
      status: quiz.quiz_status,
      total_question: quiz.quiz_total_question || [],
      icon_url: quiz.quiz_icon_url,
      section_id: quiz.quiz_section_quizzes_id,
      created_by: quiz.quiz_created_by,
      created_at: quiz.created_at,
      updated_at: quiz.updated_at,
    }));
  }, [sectionQuiz]);

  // Create the box mapping (A, B, C, etc. to quiz IDs)
  const quizBoxes = useMemo(() => {
    if (!quizzes || quizzes.length === 0) return {};

    const createBoxLabel = (index) =>
      index < 26 ? String.fromCharCode(65 + index) : (index - 25).toString();

    const result = {};
    quizzes.forEach((quiz, index) => {
      const boxLabel = createBoxLabel(index);
      result[boxLabel] = quiz.quiz_id; // Use quiz_id from the mapped data
    });

    console.log("🎯 Quiz boxes mapping:", result);
    return result;
  }, [quizzes]);

  const boxLabels = useMemo(() => Object.keys(quizBoxes), [quizBoxes]);

  const handleBoxClick = (box) => {
    const targetQuizId = quizBoxes[box];

    if (targetQuizId) {
      console.log(`📦 Box ${box} clicked, quiz_id: ${targetQuizId}`);
      setSelectedQuizId(targetQuizId);

      setBoxClicks((prev) => {
        const updatedClicks = { ...prev, [box]: (prev[box] || 0) + 1 };

        try {
          localStorage.setItem("boxClicks", JSON.stringify(updatedClicks));
        } catch (error) {
          console.error("Error saving box clicks to localStorage:", error);
        }

        return updatedClicks;
      });
    }
  };

  const getBoxClass = (box) => {
    const clickCount = boxClicks[box] || 0;

    if (clickCount === 1) return "bg-green-500 text-white";
    if (clickCount >= 2) return "bg-yellow-500 text-white";
    return "bg-gray-300 border-blue-500 border-4";
  };

  const handleDonatur = () => {
    setIsModalDonaturOpen(true);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Calculate completion stats
  const completedQuizCount = Object.keys(boxClicks).filter(
    (key) => boxClicks[key] > 0
  ).length;
  const totalQuizCount = boxLabels.length;
  const completionText = `${completedQuizCount}/${totalQuizCount} kuis terselesaikan`;

  // Get selected quiz info for display
  const selectedQuizInfo = useMemo(() => {
    if (!selectedQuizId) return null;
    return quizzes.find((quiz) => quiz.quiz_id === selectedQuizId);
  }, [selectedQuizId, quizzes]);

  // Debug logging
  useEffect(() => {
    console.log("🔍 ModalQuiz Debug Info:", {
      unitId,
      sectionQuizId: sectionQuiz?.section_quizzes_id,
      sectionQuizName: sectionQuiz?.section_quizzes_name,
      quizzesCount: quizzes.length,
      selectedQuizId,
      selectedQuizInfo,
      boxLabels,
      quizBoxes,
    });
  }, [
    unitId,
    sectionQuiz,
    quizzes,
    selectedQuizId,
    selectedQuizInfo,
    boxLabels,
    quizBoxes,
  ]);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-5"
      onClick={handleModalClick}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div
        className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-black hover:text-red-500 focus:outline-none"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>

        <div
          className={`flex items-center justify-center mb-3 space-x-1 cursor-pointer ${getBorderClass()} w-[120px] h-[40px] rounded-2xl mx-auto`}
          onClick={handleDonatur}
        >
          <FaHeart className={`${getThemeLoveClass()} text-lg font-bold`} />
          <h1 className="text-base font-medium">Donatur</h1>
        </div>

        <h1 className="text-xl font-semibold text-center mb-2">
          {sectionQuiz?.section_quizzes_name || "Quiz Section"}
        </h1>

        {sectionQuiz?.section_quizzes_materials && (
          <p className="text-center text-base font-medium mb-4">
            {sectionQuiz.section_quizzes_materials}
          </p>
        )}

        <p className="text-center text-base font-normal mb-3">
          {completionText}
        </p>

        {/* Quiz boxes grid */}
        <div className="flex flex-wrap gap-3 justify-center items-center p-3">
          {boxLabels.map((box) => (
            <div
              key={box}
              onClick={() => handleBoxClick(box)}
              className={`flex items-center justify-center text-xl p-4 w-12 h-12 rounded-md cursor-pointer transition-colors duration-200 ${getBoxClass(
                box
              )}`}
              title={`Quiz ${box} - ID: ${quizBoxes[box]}`}
            >
              {box}
            </div>
          ))}
        </div>

        {/* Selected quiz info */}
        {selectedQuizId && selectedQuizInfo && (
          <div className="text-center text-sm mb-3 p-2 bg-gray-50 rounded-lg">
            {/* <p className="font-medium">{selectedQuizInfo.name}</p> */}
            {/* <p className="text-gray-600">Quiz ID: {selectedQuizId}</p> */}
          </div>
        )}

        {/* No quizzes available message */}
        {quizzes.length === 0 && (
          <div className="text-center text-sm mb-3 p-2 bg-yellow-50 rounded-lg">
            <p className="text-yellow-700">
              Tidak ada kuis tersedia untuk section ini
            </p>
          </div>
        )}

        {/* Start quiz button */}
        <Link to={selectedQuizId ? `/pemula/quiz-satu/${selectedQuizId}` : "#"}>
          <button
            onClick={selectedQuizId ? onClose : undefined}
            className={`w-full text-base font-normal py-2 px-4 rounded-xl border-none ${
              selectedQuizId
                ? getButtonClass()
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedQuizId}
          >
            {selectedQuizId ? "Mulai + 40 XP" : "Pilih Kuis Terlebih Dahulu"}
          </button>
        </Link>
      </div>

      {isModalDonaturOpen && (
        <ModalDonatur
          isOpen={isModalDonaturOpen}
          onClose={() => setIsModalDonaturOpen(false)}
        />
      )}
    </div>
  );
};

export default ModalQuiz;
