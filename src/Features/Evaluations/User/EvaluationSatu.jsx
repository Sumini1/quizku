
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvaluationsQuestions } from "../Reducer/evaluationsQuestions";
import { saveUserEvaluationsProgress } from "../Reducer/userEvaluations"; // Add this import
import { useTheme } from "../../../Context/ThemeContext";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaBook, FaHeart } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import lamp from "../../../assets/themes_or_levels/lamp.png";

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
      <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2 ">
        <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="p-3 w-[370px] h-12 rounded-xl bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
};

const EvaluationSatu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getButtonClass, getBorderClass, middleTheme } = useTheme();

  const { data, loading, error } = useSelector(
    (state) => state.evaluationsQuestions
  );

  // Add selector for userEvaluations state with fallback
  const userEvaluationsState = useSelector(
    (state) => state.userEvaluations || {}
  );
  const { status: saveStatus = "idle", error: saveError = null } =
    userEvaluationsState;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [evaluationStartTime, setEvaluationStartTime] = useState(null); // Add this for overall evaluation time

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReferensiVisible, setIsModalReferensiVisible] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [isModalMateriOpen, setIsModalMateriOpen] = useState(false);
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    dispatch(fetchEvaluationsQuestions(id));

    // Set skeleton minimum duration
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  useEffect(() => {
    setQuestions(data || []);
    setStartTime(Date.now());
    setEvaluationStartTime(Date.now()); // Set overall evaluation start time
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data]);

  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem("evaluationScore")) || 0;
    setAccumulatedScore(savedScore);
  }, []);

  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswer(index);
    setIsAnswerCorrect(answer === currentQuestion?.question_correct_answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) {
      alert("Silakan pilih jawaban terlebih dahulu.");
      return;
    }

    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }

    setTotalTimeTaken((prev) => prev + timeTaken);
    setIsModalVisible(true);
  };

  // In the handleNextQuestion function, replace the evaluationData object:

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsModalVisible(false);
      setStartTime(Date.now());
    } else {
      // Calculate final results
      const newAccumulatedScore = accumulatedScore + score;
      const finalPercentage = Math.round((score / questions.length) * 100);
      const totalEvaluationTime = Math.round(
        (Date.now() - evaluationStartTime) / 1000
      );

      // Validate required fields
      const evaluationId = parseInt(id);
      if (!evaluationId || isNaN(evaluationId)) {
        console.error("Invalid evaluation ID:", id);
        alert("Error: Invalid evaluation ID");
        return;
      }

      if (questions.length === 0) {
        console.error("No questions available for percentage calculation");
        alert("Error: No questions found");
        return;
      }

      // Prepare data for API with correct field names
      const evaluationData = {
        user_evaluation_evaluation_id: evaluationId, // Changed from user_evaluation_id
        user_evaluation_unit_id: 2,
        user_evaluation_attempt: 1,
        user_evaluation_percentage_grade: finalPercentage, // This field is already correct
        user_evaluation_time_duration: totalEvaluationTime,
        user_evaluation_point: newAccumulatedScore,
      };

      console.log("Evaluation Data being sent:", evaluationData);
      console.log(
        "Score:",
        score,
        "Total Questions:",
        questions.length,
        "Percentage:",
        finalPercentage
      );

      // Save progress to API
      dispatch(saveUserEvaluationsProgress(evaluationData))
        .then((result) => {
          if (
            result.type ===
            "userEvaluations/saveUserEvaluationsProgress/fulfilled"
          ) {
            console.log("Progress saved successfully:", result.payload);
          } else {
            console.error("Failed to save progress:", result.payload);
          }
        })
        .catch((error) => {
          console.error("Error saving progress:", error);
        });

      // Save to localStorage for local state
      localStorage.setItem("evaluationScore", newAccumulatedScore.toString());

      // Navigate to results page
      navigate("/pemula/evaluation-satu/final-scored", {
        state: {
          score,
          totalQuestions: questions.length,
          timeTaken: totalEvaluationTime,
          totalPoints: newAccumulatedScore,
          percentage: finalPercentage,
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
          onClick={() => dispatch(fetchEvaluationsQuestions(id))}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen">
        <div
          className={`mx-auto text-center w-full h-full min-h-screen flex flex-col justify-center ${middleTheme()} max-w-md`}
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
              <IoClose
                className="-mt-3 text-3xl font-bold items-center ml-2 cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <div className="w-full bg-gray-200 rounded-xl max-w-[270px] md:max-w-[390px] mx-1 -mt-1">
                <div
                  className="h-full rounded-xl bg-blue-600"
                  style={{
                    width: `${((currentIndex + 1) / questions.length) * 100}%`,
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
          <div className="flex flex-col p-5">
            <div className="text-lg font-[500]">
              <p>{currentQuestion?.question_text}</p>
            </div>
          </div>

          {/* Answer options */}
          <div
            className={`w-full gap-5 grid p-5 ${
              currentQuestion?.question_answer_choices?.some(
                (ans) => ans.length > 10
              )
                ? "grid-cols-1"
                : "grid-cols-2"
            }`}
          >
            {currentQuestion?.question_answer_choices?.map((option, index) => (
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
            ))}
          </div>

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2 max-w-md mx-auto">
            <img
              src={lamp}
              onClick={handleModalRefensi}
              className="border text-4xl mt-1 border-none cursor-pointer rounded-xl"
              alt="Hint"
            />
            <button
              className={`p-3 w-[370px] rounded-xl border-none ${
                selectedAnswer !== null
                  ? `${getButtonClass()}`
                  : `${getBorderClass()}`
              } ${saveStatus === "loading" ? "opacity-50" : ""}`}
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null || saveStatus === "loading"}
            >
              {saveStatus === "loading" && currentIndex === questions.length - 1
                ? "Menyimpan..."
                : "Cek"}
            </button>
          </div>

          {/* Show save error if exists */}
          {saveError && (
            <div className="fixed top-4 left-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
              <span className="block sm:inline">
                Error menyimpan progress: {saveError}
              </span>
            </div>
          )}

          {/* Modal for Answer Result */}
          {isModalVisible && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
                    } ${
                      saveStatus === "loading" &&
                      currentIndex === questions.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                    onClick={handleNextQuestion}
                    disabled={
                      saveStatus === "loading" &&
                      currentIndex === questions.length - 1
                    }
                  >
                    {saveStatus === "loading" &&
                    currentIndex === questions.length - 1
                      ? "Menyimpan..."
                      : currentIndex < questions.length - 1
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
              className="fixed inset-0 z-50 flex justify-center items-center p-5"
              onClick={() => setIsModalAnswerVisible(false)}
            >
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
                      {currentQuestion?.question_explanation}
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
              className="ffixed inset-0 z-50 flex justify-center items-center p-5"
              onClick={() => setIsModalReferensiVisible(false)}
            >
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
                      {currentQuestion?.question_paragraph_help ||
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
              className="fixed inset-0 z-50 flex justify-center items-center p-5"
              onClick={() => setIsModalMateriOpen(false)}
            >
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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
              className="fixed inset-0 z-50 flex justify-center items-center p-5"
              onClick={() => setIsModalDonaturOpen(false)}
            >
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
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

export default EvaluationSatu;
