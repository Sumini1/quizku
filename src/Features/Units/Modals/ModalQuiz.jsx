import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalDonatur from "./ModalDonatur";

const ModalQuiz = ({ onClose, unitId, sectionQuiz }) => {
  const { getButtonClass, getThemeLoveClass, getBorderClass } = useTheme();
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [boxClicks, setBoxClicks] = useState({});
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);

  useEffect(() => {
    // Load box clicks from localStorage when component mounts
    const savedClicks = JSON.parse(localStorage.getItem("boxClicks")) || {};
    setBoxClicks(savedClicks);
  }, []);

  const quizzes = useMemo(() => {
    return sectionQuiz?.quizzes || [];
  }, [sectionQuiz]);

  // Create the box mapping (A, B, C, etc. to quiz IDs)
  const quizBoxes = useMemo(() => {
    if (!quizzes || quizzes.length === 0) return {};
    const createBoxLabel = (index) =>
      index < 26 ? String.fromCharCode(65 + index) : (index - 25).toString();
    const result = {};
    quizzes.forEach((quiz, index) => {
      const boxLabel = createBoxLabel(index);
      result[boxLabel] = quiz.id;
    });
    return result;
  }, [quizzes]);

  const boxLabels = useMemo(() => Object.keys(quizBoxes), [quizBoxes]);

  const handleBoxClick = (box) => {
    if (quizBoxes[box]) {
      setSelectedQuizId(quizBoxes[box]);
      setBoxClicks((prev) => {
        const updatedClicks = { ...prev, [box]: (prev[box] || 0) + 1 };
        localStorage.setItem("boxClicks", JSON.stringify(updatedClicks)); // Save to localStorage
        return updatedClicks;
      });
    }
  };

  const getBoxClass = (box) => {
    if (boxClicks[box] === 1) return "bg-green-500 text-white";
    if (boxClicks[box] >= 2) return "bg-yellow-500 text-white";
    return "bg-gray-300 border-blue-500 border-4";
  };

  const handleDonatur = () => {
    setIsModalDonaturOpen(true);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const completedQuizCount = Object.keys(boxClicks).filter(
    (key) => boxClicks[key] > 0
  ).length;
  const totalQuizCount = boxLabels.length;
  const completionText = `${completedQuizCount}/${totalQuizCount} kuis terselesaikan`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5"
      onClick={handleModalClick}
    >
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
          className={`flex items-center justify-center mb-3 space-x-1 cursor-pointer ${getBorderClass()} w-[120px] h-[40px] rounded-2xl mx-auto `}
          onClick={handleDonatur}
        >
          <FaHeart className={`${getThemeLoveClass()} text-lg font-bold`} />
          <h1 className="text-base font-medium">Donatur</h1>
        </div>

        <h1 className="text-xl font-semibold text-center mb-2">
          {sectionQuiz?.name_quizzes || "Quiz Section"}
        </h1>
        {sectionQuiz?.materials_quizzes && (
          <p className="text-center text-base font-medium mb-4">
            {sectionQuiz.materials_quizzes}
          </p>
        )}
        <p className="text-center text-base font-normal mb-3">
          {completionText}
        </p>

        <div className="flex flex-wrap gap-3 justify-center items-center p-3">
          {boxLabels.map((box) => (
            <div
              key={box}
              onClick={() => handleBoxClick(box)}
              className={`flex items-center justify-center text-xl p-4 w-12 h-12 rounded-md cursor-pointer ${getBoxClass(
                box
              )}`}
            >
              {box}
            </div>
          ))}
        </div>

        {selectedQuizId && (
          <div className="text-center text-sm mb-3">
            <p>Selected Quiz ID: {selectedQuizId}</p>
          </div>
        )}

        <Link
          to={
            selectedQuizId
              ? `/pemula/quiz-questions-1?quizId=${selectedQuizId}`
              : "#"
          }
        >
          <button
            onClick={onClose}
            className={`w-full text-base font-normal py-2 px-4 rounded-xl border-none ${getButtonClass()}`}
            disabled={!selectedQuizId}
          >
            Mulai + 40 XP
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
