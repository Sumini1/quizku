import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchEvaluationsQuestions } from "../../Evaluations/Reducer/evaluationsQuestions";
// import { saveUserEvaluationProgress } from "../../../AllQuestions/userEvaluations";
import { useTheme } from "../../../Context/ThemeContext";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaBook, FaHeart } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col p-5 min-h-screen overflow-hidden md:justify-start md:items-start md:ml-10 md:py-10">
      {/* Progress Bar Skeleton */}
      <div className="flex flex-col h-4 mb-2 mt-2 w-full">
        <div className="flex w-full h-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-full bg-gray-200 rounded-sm max-w-[265px] mx-1 -mt-1 animate-pulse"></div>
        </div>
      </div>

      {/* Navigation buttons skeleton */}
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-2 items-center bg-gray-200 p-2 w-24 h-10 rounded-xl animate-pulse"></div>
        <div className="flex gap-2 items-center bg-gray-200 p-2 w-24 h-10 rounded-xl animate-pulse"></div>
      </div>

      {/* Question Text Skeleton */}
      <div className="flex flex-col mt-7">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Answer options skeleton */}
      <div className="mt-10 w-full gap-5 grid grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-12 bg-gray-200 rounded-xl animate-pulse"
          ></div>
        ))}
      </div>

      {/* Bottom Action Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2 bg-white">
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="p-3 w-[370px] h-12 rounded-xl bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

const EvaluationDua = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, getButtonClass, getBorderClass, middleTheme } = useTheme();

  const { data, loading, error } = useSelector((state) => state.allQuestion);

  const [evaluationId, setEvaluationId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReferensiVisible, setIsModalReferensiVisible] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [isModalMateriOpen, setIsModalMateriOpen] = useState(false);
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  // state untuk menyimpan evaluasi questions yang sudah difilter berdasarkan evaluationId
  const [evaluationQuestions, setEvaluationQuestions] = useState([]);
  const [currentQuestionEvaluation, setCurrentQuestionEvaluation] =
    useState(null);
  const [unitId, setUnitId] = useState(null);

  // console.log("currentQuestionEvaluation", currentQuestionEvaluation);
  // console.log("evaluationQuestions", evaluationQuestions);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const evalId =
      params.get("evaluationId") || location.pathname.split("/").pop();
    const unitIdParam = params.get("unitId");

    setEvaluationId(evalId);
   

    setStartTime(Date.now());
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location, data]);

  useEffect(() => {
    dispatch(fetchEvaluationsQuestions());

    // Set skeleton minimum duration
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const currentEvaluationScore = localStorage.getItem("evaluationScore");
    const parsedScore = currentEvaluationScore
      ? parseInt(currentEvaluationScore, 10)
      : 0;
    setAccumulatedScore(parsedScore);
  }, []);

  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswer(index);
    const isCorrect = answer === currentQuestionEvaluation?.question_correct;
    setIsAnswerCorrect(isCorrect);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      const endTime = Date.now();
      const timeTaken = Math.round((endTime - startTime) / 1000);

      if (isAnswerCorrect) {
        setScore((prev) => prev + 1);
      }

      setTotalTimeTaken((prev) => prev + timeTaken);

      const newProgress = Math.min(
        ((currentQuestionIndex + 1) / evaluationQuestions.length) * 100,
        100
      );
      setProgress(newProgress);

      setShowExplanation(true);
      setIsModalVisible(true);
    } else {
      alert("Silakan pilih jawaban terlebih dahulu.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < evaluationQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsModalVisible(false);
      setStartTime(Date.now());
    } else {
      const userId = localStorage.getItem("id");
      if (!userId) {
        alert("User ID tidak ditemukan. Silakan login kembali.");
        navigate("/login");
        return;
      }

      const newAccumulatedScore = accumulatedScore + score;
      localStorage.setItem("evaluationScore", newAccumulatedScore.toString());

      const evaluationProgressData = {
        attempt: 1,
        percentage_grade: Math.round(
          (score / evaluationQuestions.length) * 100
        ),
        point: score,
        total_points: newAccumulatedScore,
        evaluation_id: parseInt(evaluationId, 10),
        unit_id: unitId ? parseInt(unitId, 10) : null,
        time_duration: totalTimeTaken,
        user_id: userId,
      };

      dispatch(saveUserEvaluationProgress(evaluationProgressData));

      navigate("/pemula/evaluations-satu/final-scored", {
        state: {
          score,
          totalQuestions: evaluationQuestions.length,
          timeTaken: totalTimeTaken,
          totalPoints: newAccumulatedScore,
        },
      });
    }
  };

  // Modal handlers
  const handleMateri = () => setIsModalMateriOpen(true);
  const handleDonatur = () => setIsModalDonaturOpen(true);
  const handleModalRefensi = () => setIsModalReferensiVisible(true);
  const handleModalAnswer = () => setIsModalAnswerVisible(true);

  if (loading || showSkeleton) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchEvaluationsQuestions())}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!currentQuestionEvaluation) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen">
        <div
          className={`mx-auto  text-center w-full h-full min-h-screen flex flex-col justify-center ${middleTheme()} max-w-md`}
        >
          <div className="flex flex-col items-center">
            <p>Tidak ada pertanyaan tersedia</p>
            <button
              onClick={() => navigate("/")}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 p-5"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center w-full h-full min-h-screen">
        <div
          className={`flex flex-col flex-grow max-w-md w-full ${middleTheme()}`}
        >
          {/* Progress Bar */}
          <div className="flex flex-col h-4 mb-2 mt-7 w-full">
            <div className="flex w-full h-2">
              <IoClose className="-mt-3 text-3xl font-bold items-center ml-2" />
              <div className="w-full bg-gray-200 rounded-xl max-w-[270px] md:max-w-[390px] mx-1 -mt-1">
                <div
                  className="h-full rounded-xl bg-blue-600"
                  style={{
                    width: `${
                      ((currentQuestionIndex + 1) /
                        evaluationQuestions.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quiz info and navigation */}
          <div className="flex items-center justify-between mt-5 p-5">
            <div
              onClick={handleMateri}
              className="flex gap-2 items-center bg-[#FFF2DC] p-2 rounded-xl cursor-pointer"
            >
              <FaBook className="text-[#F59D09]" />
              <h1 className="text-base font-medium">Materi</h1>
            </div>
            <div
              onClick={handleDonatur}
              className="flex gap-2 items-center bg-[#DCE6F8] p-2 rounded-xl cursor-pointer"
            >
              <FaHeart className="text-[#0961F5]" />
              <h1 className="text-base font-medium">Donatur</h1>
            </div>
          </div>

          {/* Question Text */}
          <div className="flex flex-col  p-5">
            <div className="text-lg font-[500] ">
              <p>{currentQuestionEvaluation?.question_text}</p>
            </div>
          </div>

          {/* Answer options */}
          <div
            className={` w-full gap-5 grid p-5 ${
              currentQuestionEvaluation?.question_answer?.some(
                (ans) => ans.length > 10
              )
                ? "grid-cols-1"
                : "grid-cols-2"
            }`}
          >
            {currentQuestionEvaluation?.question_answer?.map(
              (option, index) => (
                <h5
                  key={index}
                  className={`flex items-center justify-center text-center border border-gray-500 p-3 w-full cursor-pointer rounded-xl break-words whitespace-normal ${
                    selectedAnswer === index
                      ? `${getButtonClass()} border-none`
                      : ""
                  }`}
                  onClick={() => handleSelectAnswer(option, index)}
                >
                  {option}
                </h5>
              )
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2  max-w-md mx-auto">
            <img
              src="/lamp.png"
              onClick={handleModalRefensi}
              className="border text-4xl mt-1 border-none cursor-pointer"
              alt="Hint"
            />
            <button
              className={`p-3 w-[370px] rounded-xl border-none ${
                selectedAnswer !== null
                  ? `${getButtonClass()}`
                  : `${getBorderClass()}`
              }`}
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
            >
              Cek
            </button>
          </div>

          {/* Modal for Answer Result */}
          {isModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                className={`rounded-xl rounded-b-none w-full m-0 p-6 mt-[550px] items-center justify-center fixed bottom-0 ${
                  isAnswerCorrect ? "bg-[#DCFFD9]" : "bg-[#FFD9D9]"
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex h-auto">
                    <h2
                      className="text-xl font-bold mb-4 w-full flex"
                      style={{ color: isAnswerCorrect ? "#28A745" : "#A74828" }}
                    >
                      {isAnswerCorrect ? "Benar!" : "Salah!"}
                    </h2>
                    {isAnswerCorrect ? (
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    ) : (
                      <span className="bg-[#A74828] w-full h-[30px] rounded-lg ml-2">
                        <IoClose className="text-white text-3xl font-semibold" />
                      </span>
                    )}
                  </div>
                  <div className="mt-5">
                    <p>
                      <MdMenuBook
                        onClick={handleModalAnswer}
                        className={`text-5xl bg-white w-[50px] h-[50px] -mt-7 ml-auto p-2 rounded-full ${
                          isAnswerCorrect
                            ? "text-[#F59D09]"
                            : "text-[#F59D09] bg-[#FEEFB3]"
                        }`}
                      />
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <button
                    className={`p-3 w-full rounded-xl mt-4 text-white ${
                      isAnswerCorrect ? "bg-green-500" : "bg-[#A74828]"
                    }`}
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex < evaluationQuestions.length - 1
                      ? "Lanjut"
                      : "Selesai"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Answer Explanation */}
          {isModalAnswerVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
              onClick={() => setIsModalAnswerVisible(false)}
            >
              <div
                className="bg-[#DCFFD9] rounded-lg w-96 relative p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col">
                  <h1 className="text-[20px] font-[500] mb-3 sticky top-0 z-10">
                    Penjelasan{" "}
                    <span className="text-[#28A745] text-[20px] font-[500]">
                      Jawaban
                    </span>
                  </h1>

                  <div className="text-[16px] overflow-y-scroll max-h-[400px] font-[300]">
                    <p className="mb-2">
                      {currentQuestionEvaluation?.explain_question}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalAnswerVisible(false)}
                    className="p-2 w-full rounded-xl mt-4 sticky bottom-0 z-10 bg-[#28A745] text-white text-[16px] font-[400]"
                  >
                    Selesai Membaca
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Question Reference */}
          {isModalReferensiVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
              onClick={() => setIsModalReferensiVisible(false)}
            >
              <div
                className="bg-white rounded-lg w-96 relative p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold mb-3 z-10 sticky top-0">
                    Bantuan <span className="text-[#F59D09] mx-1">Soal</span>
                  </h1>

                  <div className="text-[16px] font-[300] mb-3 overflow-y-scroll max-h-[400px]">
                    <p>
                      {currentQuestionEvaluation?.paragraph_help ||
                        "Tidak ada bantuan untuk soal ini."}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalReferensiVisible(false)}
                    className="p-3 w-full rounded-xl mt-4 sticky bottom-0 z-10 bg-[#F59D09] text-white"
                  >
                    Selesai Membaca
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Materi */}
          {isModalMateriOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
              onClick={() => setIsModalMateriOpen(false)}
            >
              <div
                className="bg-white rounded-lg w-96 relative p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold mb-3 z-10 sticky top-0">
                    Materi{" "}
                    <span className="text-[#F59D09] mx-1">Pembelajaran</span>
                  </h1>

                  <div className="text-[16px] font-[300] mb-3 overflow-y-scroll max-h-[400px]">
                    <p>Konten materi pembelajaran akan ditampilkan di sini.</p>
                  </div>

                  <button
                    onClick={() => setIsModalMateriOpen(false)}
                    className="p-3 w-full rounded-xl mt-4 sticky bottom-0 z-10 bg-[#F59D09] text-white"
                  >
                    Selesai Membaca
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal for Donatur */}
          {isModalDonaturOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5"
              onClick={() => setIsModalDonaturOpen(false)}
            >
              <div
                className="bg-white rounded-lg w-96 relative p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold mb-3 z-10 sticky top-0">
                    Donatur <span className="text-[#0961F5] mx-1">Info</span>
                  </h1>

                  <div className="text-[16px] font-[300] mb-3 overflow-y-scroll max-h-[400px]">
                    <p>Informasi donatur akan ditampilkan di sini.</p>
                  </div>

                  <button
                    onClick={() => setIsModalDonaturOpen(false)}
                    className="p-3 w-full rounded-xl mt-4 sticky bottom-0 z-10 bg-[#0961F5] text-white"
                  >
                    Selesai Membaca
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EvaluationDua;
