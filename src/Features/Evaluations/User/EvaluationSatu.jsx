// EvaluationSatu.jsx (final version tanpa filter, unitId, userId)
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEvaluationsQuestions } from "../Reducer/evaluationsQuestions";
import { useTheme } from "../../../Context/ThemeContext";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaBook, FaHeart } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import lamp from "../../../assets/themes_or_levels/lamp.png"


const EvaluationSatu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getButtonClass, getBorderClass, middleTheme } = useTheme();

  const { data, loading, error } = useSelector(
    (state) => state.evaluationsQuestions
  );

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [accumulatedScore, setAccumulatedScore] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReferensiVisible, setIsModalReferensiVisible] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [isModalMateriOpen, setIsModalMateriOpen] = useState(false);
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    dispatch(fetchEvaluationsQuestions(id));
  }, [dispatch, id]);

  useEffect(() => {
    setQuestions(data || []);
    setStartTime(Date.now());
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data]);

  useEffect(() => {
    const savedScore = parseInt(localStorage.getItem("evaluationScore")) || 0;
    setAccumulatedScore(savedScore);
  }, []);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerCorrect(answer === currentQuestion?.question_correct_answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return alert("Pilih jawaban terlebih dahulu.");

    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);

    if (isAnswerCorrect) setScore((prev) => prev + 1);
    setTotalTimeTaken((prev) => prev + timeTaken);
    setProgress(((currentIndex + 1) / questions.length) * 100);
    setIsModalVisible(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsModalVisible(false);
    setStartTime(Date.now());

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const newTotal = accumulatedScore + score;
      localStorage.setItem("evaluationScore", newTotal);
      navigate("/pemula/evaluations-satu/final-scored", {
        state: {
          score,
          totalQuestions: questions.length,
          timeTaken: totalTimeTaken,
          totalPoints: newTotal,
        },
      });
    }
  };

  const handleMateri = () => setIsModalMateriOpen(true);
  const handleDonatur = () => setIsModalDonaturOpen(true);
  const handleModalRefensi = () => setIsModalReferensiVisible(true);
  const handleModalAnswer = () => setIsModalAnswerVisible(true);

  if (loading) return <p className="p-4 text-center">Memuat soal...</p>;
  if (error)
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  if (!currentQuestion)
    return <p className="p-4 text-center">Soal tidak ditemukan.</p>;
   const isLongAnswers = currentQuestion.question_answer_choices.some(
     (ans) => ans.length > 10
   );

  return (
    <div className="flex justify-center w-full h-full min-h-screen">
      <div
        className={`flex flex-col flex-grow max-w-md w-full ${middleTheme()} p-5`}
      >
        <div className="flex items-center gap-2 mb-4">
          <IoClose
            className="text-2xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <div className="md:w-full h-2 bg-gray-200 rounded-full w-[260px]">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div
            onClick={handleMateri}
            className="flex items-center gap-2 p-2 bg-yellow-100 rounded-xl cursor-pointer"
          >
            <FaBook className="text-yellow-500" /> <span>Materi</span>
          </div>
          <div
            onClick={handleDonatur}
            className="flex items-center gap-2 p-2 bg-blue-100 rounded-xl cursor-pointer"
          >
            <FaHeart className="text-blue-500" /> <span>Donatur</span>
          </div>
        </div>

        <h1 className="text-lg font-semibold mb-4 mt-5">
          {currentQuestion.question_text}
        </h1>
        <div
          className={`${
            isLongAnswers ? "flex flex-col gap-3" : "flex flex-wrap gap-3"
          }`}
        >
          {currentQuestion.question_answer_choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(choice)}
              className={`p-3 border rounded-xl ${
                selectedAnswer === choice
                  ? `${getButtonClass()} border-none`
                  : `${getBorderClass()} border-none`
              }`}
            >
              {choice}
            </button>
          ))}
        </div>

        {/* Bottom Action Bar (sama seperti request user) */}
        <div className="fixed bottom-0 left-0 right-0 px-5 py-3 shadow-md flex justify-between gap-2 max-w-md mx-auto">
          <img
            src={lamp}
            onClick={handleModalRefensi}
            className=" text-2xl mt-1 border-none cursor-pointer rounded-full "
            alt="Hint"
          />
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className={`p-3 w-[370px] rounded-xl border-none ${
              selectedAnswer ? getButtonClass() : getBorderClass()
            }`}
          >
            Cek
          </button>
        </div>

        {/* Modal Hasil Jawaban */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`bg-white rounded-xl w-full max-w-md p-6 mx-4 ${
                isAnswerCorrect ? "bg-[#DCFFD9]" : "bg-[#FFD9D9]"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2
                    className={`text-xl font-bold ${
                      isAnswerCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isAnswerCorrect ? "Benar!" : "Salah!"}
                  </h2>
                  {isAnswerCorrect ? (
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  ) : (
                    <IoClose className="text-white bg-red-600 rounded-full text-xl p-1" />
                  )}
                </div>
                <MdMenuBook
                  onClick={handleModalAnswer}
                  className={`text-4xl bg-white p-2 rounded-full cursor-pointer ${
                    isAnswerCorrect
                      ? "text-yellow-500"
                      : "text-yellow-600 bg-yellow-100"
                  }`}
                />
              </div>

              <button
                onClick={handleNext}
                className={`mt-6 w-full py-3 rounded-xl text-white font-medium ${
                  isAnswerCorrect ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {currentIndex < questions.length - 1 ? "Lanjut" : "Selesai"}
              </button>
            </div>
          </div>
        )}

        {/* Modal Penjelasan */}
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

        {/* Modal Referensi */}
        {isModalReferensiVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-lg p-5">
              <h2 className="text-lg font-bold mb-3">Referensi Soal</h2>
              <p>{currentQuestion.question_paragraph_help}</p>
              <button
                onClick={() => setIsModalReferensiVisible(false)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Selesai Membaca
              </button>
            </div>
          </div>
        )}

        {/* Modal Materi */}
        {isModalMateriOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-lg p-5">
              <h2 className="text-lg font-bold mb-3">Materi Pembelajaran</h2>
              <p>Konten materi akan ditampilkan di sini.</p>
              <button
                onClick={() => setIsModalMateriOpen(false)}
                className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Modal Donatur */}
        {isModalDonaturOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-lg p-5">
              <h2 className="text-lg font-bold mb-3">Info Donatur</h2>
              <p>Informasi donatur akan ditampilkan di sini.</p>
              <button
                onClick={() => setIsModalDonaturOpen(false)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationSatu;
