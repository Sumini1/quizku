// Updated version of UlasanExamQuestions component with fixed category and timeSpent display
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import {
  IoClose,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoTime,
} from "react-icons/io5";
import { MdLightbulb } from "react-icons/md";

const UlasanSurveyQuestions = () => {
  const { middleTheme, getButtonClass, getAnswerColor } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const [reviewData, setReviewData] = useState([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [explanationVisible, setExplanationVisible] = useState({});

  useEffect(() => {
    if (location.state) {
      const { reviewData, score, totalQuestions, percentage } = location.state;
      setReviewData(reviewData || []);
      setScore(score || 0);
      setTotalQuestions(totalQuestions || 0);
      setPercentage(percentage || 0);
    }
  }, [location.state]);

  const toggleExplanation = (index) => {
    setExplanationVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getAnswerStyling = (optionIndex, question) => {
    const isUserAnswer = optionIndex === question.userAnswer;
    const isCorrectAnswer = optionIndex === question.correctAnswer;
    if (isCorrectAnswer) return "bg-green-100 border-green-500 text-green-800";
    if (isUserAnswer && !question.isCorrect)
      return "bg-red-100 border-red-500 text-red-800";
    return "bg-gray-50 border-gray-200";
  };

  const getAnswerIcon = (optionIndex, question) => {
    if (optionIndex === question.correctAnswer)
      return <IoCheckmarkCircle className="text-green-600 text-xl" />;
    if (optionIndex === question.userAnswer && !question.isCorrect)
      return <IoCloseCircle className="text-red-600 text-xl" />;
    return null;
  };

  const handleContinue = () => {
    const themeId =
      location.state?.themeId || localStorage.getItem("selectedThemeId") || "1";
    navigate(`/tema-belajar/${themeId}`);
  };

  // Helper function to get category with fallback
  const getCategory = (question) => {
    return question.category || question.type || question.subject || "Umum";
  };

  // Helper function to get time spent with fallback
  const getTimeSpent = (question) => {
    const time = question.timeSpent || question.time || question.duration || 0;
    return typeof time === "number" ? time : parseInt(time) || 0;
  };

  return (
    <div className="flex justify-center w-full min-h-screen">
      <div className={`flex flex-col max-w-xl w-full ${middleTheme()} p-4`}>
        <div className="text-start mb-6">
          <h1 className="text-lg font-bold">Ulasan Soal</h1>
          {/* <p className="text-sm text-gray-500">
            Skor Anda: {score}/{totalQuestions} ({percentage}%)
          </p> */}
        </div>

        {reviewData.map((question, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-xl p-5 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    question.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.isCorrect ? "Benar" : "Salah"}
                </span>
                {/* Only show category if it exists */}
                {getCategory(question) && (
                  <span className="text-xs bg-gray-100 text-gray-600 rounded px-2 py-1">
                    {getCategory(question)}
                  </span>
                )}
              </div>
              {/* Only show time if it exists and is greater than 0 */}
              {getTimeSpent(question) > 0 && (
                <span className="text-xs text-gray-500 flex items-center">
                  <IoTime className="mr-1" /> {getTimeSpent(question)}s
                </span>
              )}
            </div>

            <p className="font-semibold mb-3">
              {index + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center p-3 border rounded-lg ${getAnswerStyling(
                    i,
                    question
                  )}`}
                >
                  <span>
                    <strong>{String.fromCharCode(65 + i)}.</strong> {option}
                  </span>
                  {getAnswerIcon(i, question)}
                </div>
              ))}
            </div>

            <button
              onClick={() => toggleExplanation(index)}
              className="mt-4 text-sm text-blue-600 underline"
            >
              {explanationVisible[index]
                ? "Sembunyikan Penjelasan"
                : "Lihat Penjelasan"}
            </button>

            {explanationVisible[index] && (
              <div className="bg-blue-50 rounded-lg mt-3 p-4 border-l-4 border-blue-500">
                <div className="flex space-x-2">
                  <MdLightbulb className="text-blue-600 text-xl mt-1" />
                  <div className="text-sm text-blue-800">
                    {question.explanation}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleContinue}
          className={`w-full mt-5 p-3 rounded-lg border-none ${getButtonClass()} text-white`}
        >
          Kembali ke Pembelajaran
        </button>
      </div>
    </div>
  );
};

export default UlasanSurveyQuestions;
