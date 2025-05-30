import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../Context/ThemeContext";
import {
  FaTimes,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UlasanSoal = () => {
  const { getBorderColor, middleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleAnswerClick = (questionIndex, optionIndex, isCorrect) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: { optionIndex, isCorrect },
    });
  };

  const questionsData = [
    {
      question: "Apa rukun iman ketiga?",
      isCorrect: true,
      options: [
        { text: "Mengimani dengan benar sesuai dalil", isCorrect: true },
        { text: "Mengimani yang diinginkan saja", isCorrect: false },
        { text: "Tidak menganggap penting", isCorrect: false },
        { text: "Mengimani sesuai keadaan", isCorrect: false },
      ],
      explanation:
        "Mengimani rukun iman harus sesuai dalil dari Al-Qur’an dan Sunnah...",
    },
    {
      question: "Cara menyikapi rukun iman bagi muslim?",
      isCorrect: false, // Pertanyaan salah
      options: [
        { text: "Mengimani dengan benar sesuai dalil", isCorrect: true },
        { text: "Mengimani yang diinginkan saja", isCorrect: false },
        { text: "Tidak menganggap penting", isCorrect: false },
        { text: "Mengimani sesuai keadaan", isCorrect: false },
      ],
      explanation:
        "Mengimani rukun iman harus sesuai dalil dari Al-Qur’an dan Sunnah sebab agama islam dibangun dari tawaqquf yaitu seluruh ibadah membutuhkan dalil. Rukun iman merupakan salah satu ibadah yang paling agung karena berisi pondasi keimanan.",
    },
    {
      question: "Cara menyikapi rukun iman bagi muslim?",
      isCorrect: true,
      options: [
        { text: "Mengimani dengan benar sesuai dalil", isCorrect: true },
        { text: "Mengimani yang diinginkan saja", isCorrect: false },
        { text: "Tidak menganggap penting", isCorrect: false },
        { text: "Mengimani sesuai keadaan", isCorrect: false },
      ],
      explanation:
        "Rukun iman merupakan salah satu ibadah yang paling agung...",
    },
  ];

  return (
    <div className="flex justify-center w-full h-full min-h-screen">
      <div
        className={`flex flex-col flex-grow max-w-md w-full ${middleTheme()} p-5`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 font-[500] mb-7"
        >
          <FaArrowLeft className="text-2xl font-[500]" />

          <h1 className="text-xl font-[500]">Ulasan Soal</h1>
        </div>
        <div className="flex flex-col space-y-4">
          {questionsData.map((question, index) => (
            <div
              key={index}
              className={`rounded-xl ${
                activeIndex === index ? "rounded-b-none" : ""
              }`}
            >
              <div
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between  items-center p-4 text-base cursor-pointer ${
                  activeIndex === index ? "rounded-t-xl" : "rounded-xl"
                } ${
                  question.isCorrect
                    ? `bg-[#FFF] border-[1px] text-[#333] text-base border-[#222]`
                    : `border-[1px] text-base border-[#222]`
                }`}
              >
                <span className="font-[500]">
                  {index + 1}. {question.question}
                </span>
                <div className="flex items-center space-x-2">
                  {question.isCorrect ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500 bg-none" />
                  )}
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
              </div>
              {activeIndex === index && (
                <div
                  className={`p-4 ${
                    question.isCorrect
                      ? `bg-[#DCFFD9] border-[1px] border-t-0 rounded-b-xl border-[#222]`
                      : `bg-gray-100 border-[1px]  border-t-0 rounded-b-xl border-[#222]`
                  }`}
                >
                  <div className="space-y-4 ">
                    {question.options.map((option, i) => {
                      const userAnswer = selectedAnswers[index];
                      const isSelected = userAnswer?.optionIndex === i;
                      const isCorrectAnswer = option.isCorrect;
                      const isWrongAnswer = isSelected && !option.isCorrect;

                      return (
                        <button
                          key={i}
                          onClick={() =>
                            handleAnswerClick(index, i, option.isCorrect)
                          }
                          className={`w-full m p-2 border-[1px] border-[#222] rounded-xl ${
                            isCorrectAnswer
                              ? "bg-[#28A745] border-green-500  border-[1px] text-white" // Hijau untuk benar
                              : isWrongAnswer
                              ? "bg-[#A74828]  text-white border-none" // Merah untuk salah
                              : "bg-white border-[#222]  border-[1px] " // Default
                          }`}
                        >
                          {option.text}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-md text-gray-700">
                    <strong>Penjelasan:</strong>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UlasanSoal;
