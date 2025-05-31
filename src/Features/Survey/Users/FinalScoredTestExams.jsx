import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useTheme } from "../../../Context/ThemeContext";
import { HiBadgeCheck } from "react-icons/hi";
import { MdFactCheck } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa6";
import { RiCoinFill } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";

const FinalScoredTestExams = () => {
  const {
    theme,
    getIconTheme,
    getBorderColor,
    getIconColorAlert,
    middleTheme,
    getButtonClass,
    getBorderClass,
  } = useTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get review data from location state
  const reviewData = location.state?.reviewData || [];

  useEffect(() => {
    // Check if state was passed from the quiz page
    if (location.state) {
      const {
        score,
        totalQuestions,
        timeTaken,
        totalPoints = 0,
        percentage = 0,
      } = location.state;

      setScore(score);
      setTotalQuestions(totalQuestions);
      setTotalTime(timeTaken);
      setTotalPoints(totalPoints);
      setPercentage(percentage);

      // Set celebration message based on score
      const calculatedPercentage = (score / totalQuestions) * 100;
      if (calculatedPercentage >= 80) {
        setCelebrationMessage(
          "🎉 Luar biasa! Anda telah menguasai materi dengan sangat baik! 🎉"
        );
      } else if (calculatedPercentage >= 60) {
        setCelebrationMessage(
          "👏 Bagus! Anda telah menyelesaikan tes dengan baik! 👏"
        );
      } else {
        setCelebrationMessage(
          "💪 Terus semangat! Anda telah menyelesaikan tes! 💪"
        );
      }

      setTimeout(() => setShowConfetti(false), 6000);
    } else {
      // Redirect if no quiz result data
      navigate("/beranda");
    }
  }, [location.state, navigate]);

  const formatTime = (time) => {
    if (time < 60) {
      return `${time} detik`;
    } else {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      if (seconds === 0) {
        return `${minutes} menit`;
      } else {
        return `${minutes}  menit ${seconds} detik`;
      }
    }
  };

  const calculatePercentage = () => {
    return percentage || ((score / totalQuestions) * 100).toFixed(0);
  };

  const getGradeStatus = () => {
    const perc = calculatePercentage();
    if (perc >= 80)
      return {
        status: "Excellent",
        color: "text-green-600",
        bgColor: "bg-green-100",
        strokeColor: "#22c55e",
      };
    if (perc >= 60)
      return {
        status: "Good",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        strokeColor: "#3b82f6",
      };
    if (perc >= 40)
      return {
        status: "Fair",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        strokeColor: "#eab308",
      };
    return {
      status: "Needs Improvement",
      color: "text-red-600",
      bgColor: "bg-red-100",
      strokeColor: "#ef4444",
    };
  };

  const items = [
    {
      id: 1,
      title: "Skor",
      icon: <MdFactCheck className="text-lg" />,
      value: `${score}/${totalQuestions}`,
    },
    {
      id: 2,
      title: "Persentase",
      icon: <HiBadgeCheck className="text-lg" />,
      value: `${calculatePercentage()}%`,
    },
    {
      id: 3,
      title: "Waktu",
      icon: <FaHourglassEnd className="text-lg" />,
      value: formatTime(totalTime),
    },
    {
      id: 4,
      title: "Poin",
      icon: <RiCoinFill className="text-lg" />,
      value: totalPoints,
    },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);
    const themeId =
      location.state?.themeId ||
      localStorage.getItem("selectedThemeId") ||
      getThemeIdBasedOnScore() ||
      "1";
    navigate(`/tema-belajar/${themeId}`);
  };

  const getThemeIdBasedOnScore = () => {
    const perc = calculatePercentage();
    if (perc >= 80) return "advanced";
    if (perc >= 60) return "intermediate";
    return "basic";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleNavigateToReview = () => {
    navigate("/ulasan-survey-questions", {
      state: {
        reviewData: reviewData,
        score: score,
        totalQuestions: totalQuestions,
        percentage: calculatePercentage(),
      },
    });
  };

  const handleRetakeQuiz = () => {
    navigate(-1); // Go back to quiz start
  };

  const handleContinue = () => {
    const themeId =
      location.state?.themeId || localStorage.getItem("selectedThemeId") || "1";
    navigate(`/tema-belajar/${themeId}`);
  };

  const gradeInfo = getGradeStatus();

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      <div className="flex justify-center w-full min-h-screen">
        <div className={`flex flex-col max-w-md w-full ${middleTheme()}`}>
          {/* Header Section - Compact */}
          <div className="text-center px-4 py-3">
            <div
              className={`inline-flex items-center px-3 py-1 mt-5 rounded-full ${gradeInfo.bgColor} ${gradeInfo.color} mb-2`}
            >
              <HiBadgeCheck className="text-lg mr-1" />
              <span className="font-semibold text-xl ">{gradeInfo.status}</span>
            </div>
            <p className="text-sm font-medium">{celebrationMessage}</p>
          </div>

          {/* Score Circle - Smaller and Centered */}
          <div className="flex justify-center ">
            <div className="relative w-32 h-32">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke={gradeInfo.strokeColor}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${
                    (calculatePercentage() / 100) * 219.8
                  } 219.8`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {calculatePercentage()}%
                  </div>
                  <div className="text-xs text-gray-500">Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid - More Compact */}
          <div className="grid grid-cols-2 gap-3 px-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className={`p-1 rounded-md ${getBorderColor()}`}>
                    {item.icon}
                  </div>
                </div>
                <div className="text-lg font-bold mb-1">{item.value}</div>
                <div className="text-xs text-gray-600">{item.title}</div>
              </div>
            ))}
          </div>

          {/* Action buttons - Fixed at bottom without scroll */}
          <div className="mt-auto p-4 space-y-2">
            {/* Review answers button */}
            {reviewData.length > 0 && (
              <button
                onClick={handleNavigateToReview}
                className="w-full p-2 rounded-lg border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <MdOutlineError className="text-lg mr-2" />
                  <span className="font-medium text-sm">Lihat Pembahasan</span>
                </div>
                <FaArrowRight className="text-sm" />
              </button>
            )}

            {/* Bottom action buttons with space-between */}
            <div className="flex justify-between items-center space-x-2">
              {/* Retake quiz button - now as icon */}
              <button
                onClick={handleRetakeQuiz}
                className={`w-12 h-12 border ${getBorderClass()} rounded-lg hover:opacity-80 transition-opacity flex items-center justify-center`}
              >
                <TbArrowBackUp className="text-lg" />
              </button>

              {/* Continue button */}
              <button
                onClick={handleContinue}
                className={`flex-1 p-3 border-none rounded-lg ${getButtonClass()} text-white font-medium hover:opacity-90 transition-opacity`}
              >
                Lanjutkan Belajar
              </button>
            </div>
          </div>

          {/* Modal for additional options */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={handleCloseModal}
              ></div>
              <div className="bg-white rounded-xl w-full max-w-sm relative p-4">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold">Pilihan Lanjutan</h2>
                  <IoClose
                    className="text-xl cursor-pointer"
                    onClick={handleCloseModal}
                  />
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleNavigateToReview}
                    className="w-full p-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-sm">📝 Lihat Pembahasan Lengkap</span>
                  </button>

                  <button
                    onClick={() => navigate("/beranda")}
                    className="w-full p-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 mb-2"
                  >
                    <span className="text-sm">🏠 Kembali ke Beranda</span>
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={handleRetakeQuiz}
                      className="w-12 h-12 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      <TbArrowBackUp className="text-2xg text-green-600 font-bold" />
                    </button>

                    <button
                      onClick={handleContinue}
                      className="flex-1 p-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  className={`w-full p-2 rounded-lg mt-3 ${getButtonClass()} text-white font-medium text-sm`}
                >
                  Lanjutkan Pembelajaran
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FinalScoredTestExams;
