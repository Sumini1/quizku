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

const FinalScoredEvaluationSatu = () => {
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
  const [targetType, setTargetType] = useState("pemula");
  const [userModuleAttemptTargetType, setUserModuleAttemptTargetType] =
    useState(null);

  // ✅ TAMBAHAN: State untuk modal konfirmasi
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Get review data from location state
  const reviewData = location.state?.reviewData || [];
  const [evaluationId, setEvaluationId] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    if (isConfirmModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isConfirmModalOpen]);


  useEffect(() => {
    // Check if state was passed from the quiz page
    if (location.state) {
      const {
        score,
        totalQuestions,
        timeTaken,
        totalPoints = 0,
        percentage = 0,
        targetType = "pemula",
        sourceType,
        evaluationId,
        canGoBack = false,
        userModuleAttemptTargetType,
      } = location.state;

      setScore(score);
      setTotalQuestions(totalQuestions);
      setTotalTime(timeTaken);
      setTotalPoints(totalPoints);
      setPercentage(percentage);
      setTargetType(targetType || sourceType || "pemula");
      setEvaluationId(evaluationId);
      setCanGoBack(canGoBack);
      setUserModuleAttemptTargetType(userModuleAttemptTargetType);

      // Set celebration message based on score and target type
      const calculatedPercentage = (score / totalQuestions) * 100;
      setCelebrationMessage(
        getCelebrationMessage(calculatedPercentage, targetType)
      );

      setTimeout(() => setShowConfetti(false), 6000);
    } else {
      const backupState = localStorage.getItem("evaluation_backup_state");
      if (backupState) {
        try {
          const parsed = JSON.parse(backupState);
          if (Date.now() - parsed.timestamp < 3600000) {
            setEvaluationId(parsed.evaluationId);
            setCanGoBack(true);
            setUserModuleAttemptTargetType(parsed.userModuleAttemptTargetType);
            localStorage.removeItem("evaluation_backup_state");
          }
        } catch (error) {
          // console.error("Error parsing backup state:", error);
        }
      }

      if (!backupState) {
        navigate("/beranda");
      }
    }
  }, [location.state, navigate]);

  const getCelebrationMessage = (perc, type) => {
    const messages = {
      pemula: {
        excellent: "🎉 Luar biasa! Anda telah menguasai materi pemula!",
        good: "👏 Bagus! Anda siap ke level berikutnya!",
        fair: "💪 Terus semangat! Anda sudah menyelesaikan level pemula!",
      },
      menengah: {
        excellent: "🎉 Hebat! Materi menengah dikuasai sempurna!",
        good: "👏 Keren! Siap lanjut ke tingkat berikutnya!",
        fair: "💪 Semangat! Terus tingkatkan di level menengah!",
      },
      lanjutan: {
        excellent: "🎉 Mantap! Anda master di level lanjutan!",
        good: "👏 Luar biasa! Materi lanjutan hampir dikuasai!",
        fair: "💪 Semangat! Tingkatkan kemampuan tingkat akhir!",
      },
    };
    const msg = messages[type] || messages.pemula;
    if (perc >= 80) return msg.excellent;
    if (perc >= 60) return msg.good;
    return msg.fair;
  };

  const calculatePercentage = () =>
    Number((score / totalQuestions) * 100).toFixed(0);

  const isEligibleToContinue = () => {
    const currentPercentage = Number(calculatePercentage());

    if (userModuleAttemptTargetType === 4) {
      // console.log("🎯 Target type 4 (exam) - always eligible to continue");
      return true;
    }

    const isEligible = currentPercentage >= 65;
    return isEligible;
  };

  const formatTime = (t) =>
    t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${t % 60}s`;

  const getReturnPath = () => {
    const themeId =
      location.state?.themeId || localStorage.getItem("selectedThemeId") || "1";
    if (targetType === "menengah") return `/tema-menengah/${themeId}`;
    if (targetType === "lanjutan") return `/tema-lanjutan/${themeId}`;
    return `/tema-belajar/${themeId}`;
  };

  const handleContinue = () => navigate(getReturnPath());

  const handleNavigateToReview = () =>
    navigate("/ulasan-soal", {
      state: {
        reviewData,
        score,
        totalQuestions,
        percentage: calculatePercentage(),
        targetType,
        themeId: location.state?.themeId,
        returnPath: getReturnPath(),
      },
    });

  const handleGoBackToEvaluation = () => {
    if (evaluationId && canGoBack) {
      navigate(`/pemula/evaluation-satu/${evaluationId}`, {
        state: {
          themeId: location.state?.themeId,
          returnFromResults: true,
        },
      });
    } else {
      navigate(-1);
    }
  };

  // ✅ MODIFIKASI: Handle close dengan modal kustom
  const handleClose = () => {
    if (canGoBack && evaluationId) {
      setIsConfirmModalOpen(true); // Buka modal konfirmasi
    } else {
      navigate("/beranda");
    }
  };

  // ✅ TAMBAHAN: Handler untuk modal konfirmasi
  const handleConfirmGoBack = () => {
    setIsConfirmModalOpen(false);
    handleGoBackToEvaluation();
  };

  const handleConfirmStay = () => {
    setIsConfirmModalOpen(false);
    navigate("/beranda");
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };

  const gradeInfo = (() => {
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
  })();

  const items = [
    {
      id: 1,
      title: "Skor",
      icon: <MdFactCheck />,
      value: `${score}/${totalQuestions}`,
    },
    {
      id: 2,
      title: "Persentase",
      icon: <HiBadgeCheck />,
      value: `${calculatePercentage()}%`,
    },
    {
      id: 3,
      title: "Waktu",
      icon: <FaHourglassEnd />,
      value: formatTime(totalTime),
    },
    { id: 4, title: "Poin", icon: <RiCoinFill />, value: totalPoints },
  ];

  const getButtonText = () => {
    if (userModuleAttemptTargetType === 4) {
      return "Lanjutkan Belajar";
    }
    return isEligibleToContinue() ? "Lanjutkan Belajar" : "Ulangi Dulu";
  };

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
         

          {/* Badge & Message */}
          <div className="text-center px-5">
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full ${gradeInfo.bgColor} ${gradeInfo.color} mb-3`}
            >
              <HiBadgeCheck className="text-lg mr-2" />
              <span className="font-semibold text-lg">{gradeInfo.status}</span>
            </div>
            <p className="text-sm font-medium mb-4">{celebrationMessage}</p>

            
          </div>

          {/* Circle Progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="#e5e7eb"
                  strokeWidth="6"
                  fill="none"
                />
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
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                {calculatePercentage()}%
              </div>
            </div>
          </div>

          {/* Result Items */}
          <div className="grid grid-cols-2 gap-4 px-5 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className={`p-2 rounded-lg ${getBorderColor()}`}>
                    {item.icon}
                  </div>
                </div>
                <div className="text-lg font-bold mb-1">{item.value}</div>
                <div className="text-xs text-gray-600">{item.title}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto p-5 space-y-3">
            {reviewData.length > 0 && (
              <button
                onClick={handleNavigateToReview}
                className="w-full p-3 rounded-xl border border-gray-200 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <MdOutlineError className="text-lg mr-3" />
                  <span className="font-medium">Lihat Pembahasan</span>
                </div>
                <FaArrowRight className="text-sm" />
              </button>
            )}

            <div className="flex justify-between items-center gap-3">
              <button
                onClick={handleClose}
                className={`w-12 h-12 border ${getBorderClass()} rounded-xl hover:opacity-80 transition-opacity flex items-center justify-center`}
              >
                <TbArrowBackUp className="text-xl" />
              </button>

              <button
                onClick={handleContinue}
                disabled={!isEligibleToContinue()}
                className={`flex-1 p-3 rounded-xl ${
                  isEligibleToContinue()
                    ? getButtonClass()
                    : "bg-gray-300 cursor-not-allowed"
                } text-white font-medium transition-opacity ${
                  !isEligibleToContinue() ? "opacity-50" : ""
                }`}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ TAMBAHAN: Modal Konfirmasi Kustom */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-3">
          <div className="absolute inset-0 bg-black opacity-50 z-40"></div>
          <div className="bg-white rounded-xl p-5 max-w-sm w-full mx-4 shadow-xl z-50 relative">
            <div className="text-center mb-3 ">
              <div className="w-10 h-10  rounded-full flex items-center justify-center mx-auto mb-3">
                <TbArrowBackUp className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Kembali ke Soal?
              </h3>
              <p className="text-base text-gray-600">
                Apakah Anda yakin ingin kembali ke halaman soal ?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelModal}
                className="flex-1 px-4 py-1 text-sm border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmStay}
                className="flex-1 px-4 py-1 text-sm bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Ke Beranda
              </button>
              <button
                onClick={handleConfirmGoBack}
                className={`flex-1 px-4 py-1 text-sm rounded-lg text-white font-medium transition-colors border-none ${getButtonClass()}`}
              >
                Ya, Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinalScoredEvaluationSatu;
