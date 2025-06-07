import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchQuizQuestions } from "../Reducer/quizQuestions";
import { submitBatch } from "../../Evaluations/Reducer/submitBatch";
import { useTheme } from "../../../Context/ThemeContext";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle, FaBook, FaHeart } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import lamp from "../../../assets/themes_or_levels/lamp.png";
import SkeletonLoader from "../../Evaluations/User/SkeletonLoader";

const QuizSatu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { getButtonClass, getBorderClass, middleTheme } = useTheme();

  // Redux states
  const { data, loading, error } = useSelector((state) => state.quizQuestions);
  const submitBatchState = useSelector((state) => state.submitBatch || {});
  const { loading: saveLoading = false, error: saveError = null } =
    submitBatchState;

  // Component states
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [evaluationStartTime, setEvaluationStartTime] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [reviewData, setReviewData] = useState([]);

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalReferensiVisible, setIsModalReferensiVisible] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [isModalMateriOpen, setIsModalMateriOpen] = useState(false);
  const [isModalDonaturOpen, setIsModalDonaturOpen] = useState(false);
  const [showResendModal, setShowResendModal] = useState(false);

  // Memoized values
  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  // Initialize component data
  useEffect(() => {
    if (id) {
      dispatch(fetchQuizQuestions(id));
    }

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  // Handle questions data
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setQuestions(data);
      setStartTime(Date.now());
      setEvaluationStartTime(Date.now());
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [data]);

  // Load saved progress
  useEffect(() => {
    if (id) {
      cleanupOldBackups();
      const savedScore = parseInt(localStorage.getItem("evaluationScore")) || 0;
      setAccumulatedScore(savedScore);

      const savedAttempt =
        parseInt(localStorage.getItem(`evaluation_${id}_attempt`)) || 1;
      setAttemptNumber(savedAttempt);
    }
  }, [id]);

  // function untuk menangani pemilihan jawaban
  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswer(index);
    setIsAnswerCorrect(answer === currentQuestion?.question_correct_answer);
  };

  // Helper function untuk convert answer index ke letter (A, B, C, D)
  const getAnswerLetter = (index) => {
    return String.fromCharCode(65 + index); // A=65, B=66, C=67, D=68
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) {
      alert("Silakan pilih jawaban terlebih dahulu.");
      return;
    }

    if (!startTime) {
      console.error("Start time not set");
      return;
    }

    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }

    setTotalTimeTaken((prev) => prev + timeTaken);
    setIsModalVisible(true);

    // ✅ Format jawaban sesuai database requirement (VARCHAR(1))
    const answerData = {
      user_answer_attempt_question_id:
        currentQuestion?.id || currentQuestion?.question_id,
      user_answer_attempt_answer: getAnswerLetter(selectedAnswer), // ✅ Convert to A/B/C/D
      user_answer_attempt_is_correct: isAnswerCorrect,
      user_answer_attempt_created_at: new Date().toISOString(),
      user_answer_attempt_question_attempt: attemptNumber,
    };

    console.log("📝 Answer data:", answerData);
    setAllAnswers((prev) => [...prev, answerData]);

    // ✅ PERBAIKAN: Review data untuk UI dengan format yang sesuai UlasanSoal
    const correctAnswerIndex =
      currentQuestion?.question_answer_choices?.findIndex(
        (option) => option === currentQuestion?.question_correct_answer
      );

    // ✅ Pastikan ada fallback jika correctAnswerIndex tidak ditemukan
    const safeCorrectAnswerIndex =
      correctAnswerIndex >= 0 ? correctAnswerIndex : 0;

    // ✅ Format review data sesuai struktur yang dibutuhkan UlasanSoal
    const reviewItem = {
      // Required fields for UlasanSoal
      question: currentQuestion?.question_text || "Pertanyaan tidak tersedia",
      options: currentQuestion?.question_answer_choices || [
        "Tidak ada pilihan",
      ],
      correctAnswer: safeCorrectAnswerIndex, // index jawaban benar (number)
      userAnswer: selectedAnswer, // index jawaban user (number)
      isCorrect: isAnswerCorrect, // boolean

      // Optional fields
      explanation:
        currentQuestion?.question_explanation ||
        currentQuestion?.explanation ||
        "Penjelasan tidak tersedia",
      category:
        currentQuestion?.question_category ||
        currentQuestion?.category ||
        currentQuestion?.subject ||
        null,
      timeSpent: timeTaken, // waktu dalam detik

      // Additional metadata (optional)
      questionId: currentQuestion?.id || currentQuestion?.question_id,
      questionNumber: currentIndex + 1,
      difficulty: currentQuestion?.difficulty || null,

      // Legacy fields (untuk backward compatibility jika diperlukan)
      userAnswerText:
        currentQuestion?.question_answer_choices?.[selectedAnswer] || "",
      correctAnswerText: currentQuestion?.question_correct_answer || "",
    };

    console.log("📋 Review item created:", reviewItem);

    setReviewData((prev) => [...prev, reviewItem]);
  };

  // ✅ Helper function untuk validasi review data sebelum navigasi
  const validateReviewData = (reviewData) => {
    return reviewData.every(
      (item) =>
        item.question &&
        Array.isArray(item.options) &&
        item.options.length > 0 &&
        typeof item.correctAnswer === "number" &&
        typeof item.userAnswer === "number" &&
        typeof item.isCorrect === "boolean"
    );
  };

  // ✅ Updated handleNavigateToReview dengan validasi
  const handleNavigateToReview = () => {
    console.log("📊 Review data before navigation:", reviewData);

    // Validasi data sebelum navigasi
    if (!reviewData || reviewData.length === 0) {
      console.warn("No review data available");
      alert("Data ulasan tidak tersedia");
      return;
    }

    if (!validateReviewData(reviewData)) {
      console.error("Invalid review data structure:", reviewData);
      alert("Data ulasan tidak valid");
      return;
    }

    navigate("/ulasan-soal", {
      state: {
        reviewData: reviewData,
        score: score,
        totalQuestions: totalQuestions,
        percentage: calculatePercentage(),
        themeId:
          location.state?.themeId || localStorage.getItem("selectedThemeId"),
        totalTime: totalTimeTaken, // tambahan info waktu total
      },
    });
  };

  // ✅ Alternative: Jika struktur currentQuestion berbeda, gunakan ini
  const handleCheckAnswerAlternative = () => {
    if (selectedAnswer === null) {
      alert("Silakan pilih jawaban terlebih dahulu.");
      return;
    }

    if (!startTime) {
      console.error("Start time not set");
      return;
    }

    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);

    if (isAnswerCorrect) {
      setScore((prev) => prev + 1);
    }

    setTotalTimeTaken((prev) => prev + timeTaken);
    setIsModalVisible(true);

    // Database answer data (unchanged)
    const answerData = {
      user_answer_attempt_question_id:
        currentQuestion?.id || currentQuestion?.question_id,
      user_answer_attempt_answer: getAnswerLetter(selectedAnswer),
      user_answer_attempt_is_correct: isAnswerCorrect,
      user_answer_attempt_created_at: new Date().toISOString(),
      user_answer_attempt_question_attempt: attemptNumber,
    };

    console.log("📝 Answer data:", answerData);
    setAllAnswers((prev) => [...prev, answerData]);

    // ✅ ALTERNATIVE: Jika struktur data berbeda, manual mapping
    let correctAnswerIndex = 0;
    let questionOptions = [];

    // Coba berbagai format struktur data
    if (currentQuestion?.question_answer_choices) {
      questionOptions = currentQuestion.question_answer_choices;
      correctAnswerIndex = questionOptions.findIndex(
        (option) => option === currentQuestion?.question_correct_answer
      );
    } else if (currentQuestion?.options) {
      questionOptions = currentQuestion.options;
      correctAnswerIndex = currentQuestion?.correctAnswer || 0;
    } else if (currentQuestion?.choices) {
      questionOptions = currentQuestion.choices;
      correctAnswerIndex = currentQuestion?.correct || 0;
    }

    // Fallback jika tidak ditemukan
    if (correctAnswerIndex < 0) correctAnswerIndex = 0;
    if (questionOptions.length === 0)
      questionOptions = ["Pilihan tidak tersedia"];

    const reviewItem = {
      question:
        currentQuestion?.question_text ||
        currentQuestion?.text ||
        currentQuestion?.question ||
        "Pertanyaan tidak tersedia",
      options: questionOptions,
      correctAnswer: correctAnswerIndex,
      userAnswer: selectedAnswer,
      isCorrect: isAnswerCorrect,
      explanation:
        currentQuestion?.question_explanation ||
        currentQuestion?.explanation ||
        "Penjelasan tidak tersedia",
      category:
        currentQuestion?.question_category || currentQuestion?.category || null,
      timeSpent: timeTaken,
      questionNumber: currentIndex + 1,
    };

    console.log("📋 Review item (alternative):", reviewItem);
    setReviewData((prev) => [...prev, reviewItem]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      // Move to next question
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsModalVisible(false);
      setStartTime(Date.now());
    } else {
      // Finish evaluation
      finishEvaluation();
    }
  };

  const cleanupOldBackups = () => {
    try {
      const keys = Object.keys(localStorage);
      const backupKeys = keys.filter((key) =>
        key.startsWith("evaluation_backup_")
      );
      const now = Date.now();
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 minggu

      backupKeys.forEach((key) => {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data && data.timestamp && now - data.timestamp > oneWeek) {
            localStorage.removeItem(key);
            console.log(`🗑️ Hapus backup lama: ${key}`);
          }
        } catch (e) {
          // Hapus data yang corrupt
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error("Error cleaning backups:", error);
    }
  };

  const queueSubmissionForLater = (
    batchPayload,
    finalScore,
    finalPercentage,
    duration,
    evaluationId
  ) => {
    const batchId = `eval_${evaluationId}_${Date.now()}`;
    const backupKey = `evaluation_delayed_submit_${batchId}`;

    const data = {
      batchId,
      payload: batchPayload,
      finalScore,
      finalPercentage,
      duration,
      timestamp: Date.now(),
      synced: false,
    };

    try {
      localStorage.setItem(backupKey, JSON.stringify(data));
      console.log(
        "💾 Data progres disimpan untuk dikirim otomatis 5 menit kemudian:",
        backupKey
      );

      setTimeout(() => {
        retryFailedSubmission(backupKey);
      }, 5000); // 5 menit

      handleSuccessfulSubmission(finalScore, finalPercentage, duration);
    } catch (err) {
      console.error("❌ Gagal menyimpan ke localStorage:", err);
      alert("Gagal menyimpan progres.");
    }
  };

  const finishEvaluation = async () => {
    try {
      const isAnswersValid = allAnswers.every(
        (a) =>
          a &&
          typeof a.user_answer_attempt_question_id === "number" &&
          typeof a.user_answer_attempt_answer === "string" &&
          a.user_answer_attempt_answer.length === 1 &&
          /^[A-Z]$/.test(a.user_answer_attempt_answer) &&
          typeof a.user_answer_attempt_is_correct === "boolean" &&
          typeof a.user_answer_attempt_question_attempt === "number" &&
          typeof a.user_answer_attempt_created_at === "string"
      );

      if (!isAnswersValid) {
        console.error("❌ Jawaban tidak valid:", allAnswers);
        alert("Jawaban tidak lengkap atau salah format.");
        return;
      }

      const evaluationId = Number(id);
      if (!evaluationId || Number.isNaN(evaluationId)) {
        console.error("❌ ID evaluasi tidak valid:", id);
        alert("ID evaluasi tidak valid.");
        return;
      }

      if (questions.length === 0 || !evaluationStartTime) {
        alert("Soal tidak tersedia atau waktu mulai tidak terekam.");
        return;
      }

      const finalScore = accumulatedScore + score;
      const finalPercentage = Math.round((score / questions.length) * 100);
      const duration = Math.round((Date.now() - evaluationStartTime) / 1000);

      const validAnswers = allAnswers
        .filter(
          (a) =>
            typeof a.user_answer_attempt_question_id === "number" &&
            typeof a.user_answer_attempt_answer === "string" &&
            a.user_answer_attempt_answer.length === 1 &&
            /^[A-Z]$/.test(a.user_answer_attempt_answer)
        )
        .map((a) => ({
          user_answer_attempt_question_id: a.user_answer_attempt_question_id,
          user_answer_attempt_answer: a.user_answer_attempt_answer,
          user_answer_attempt_is_correct: a.user_answer_attempt_is_correct,
          user_answer_attempt_created_at: a.user_answer_attempt_created_at,
          user_answer_attempt_question_attempt:
            a.user_answer_attempt_question_attempt,
        }));

      if (validAnswers.length === 0) {
        alert("Tidak ada jawaban valid.");
        return;
      }

      const batchPayload = {
        targets: [
          {
            user_module_attempt_target_type: 2, // atau 3 jika backend butuh
            user_module_attempt_target_id: evaluationId,
            user_module_attempt_percentage_grade: finalPercentage,
            user_module_attempt_time_duration: duration,
            user_module_attempt_created_at: new Date().toISOString(),
            answers: validAnswers,
          },
        ],
      };

      const size = JSON.stringify(batchPayload).length;
      console.log(`📦 Payload size: ${size} bytes`);
      console.log(
        "🕒 Menyimpan payload ke localStorage untuk dikirim 5 menit lagi"
      );

      // Simpan & jadwalkan kirim 5 menit
      queueSubmissionForLater(
        batchPayload,
        finalScore,
        finalPercentage,
        duration,
        evaluationId
      );
    } catch (error) {
      console.error("❌ Error dalam finishEvaluation:", error);
      alert("Terjadi kesalahan saat menyelesaikan evaluasi: " + error.message);
    }
  };

  const handleSuccessfulSubmission = (
    newAccumulatedScore,
    finalPercentage,
    totalEvaluationTime
  ) => {
    // Update attempt number for next time
    localStorage.setItem(
      `evaluation_${id}_attempt`,
      (attemptNumber + 1).toString()
    );

    // Save to localStorage
    localStorage.setItem("evaluationScore", newAccumulatedScore.toString());

    // Navigate to results
    navigateToResults(
      newAccumulatedScore,
      finalPercentage,
      totalEvaluationTime
    );
  };

  const retryFailedSubmission = async (localKey) => {
    try {
      const saved = localStorage.getItem(localKey);
      if (!saved) {
        console.log("🚫 Tidak ada data backup untuk retry");
        return;
      }

      const parsed = JSON.parse(saved);
      if (!parsed || parsed.synced) {
        console.log("📤 Data sudah di-sync atau tidak valid");
        return;
      }

      console.log("🔄 Mencoba kirim ulang data backup...");

      const result = await dispatch(submitBatch(parsed.payload));

      if (submitBatch.fulfilled.match(result)) {
        parsed.synced = true;
        parsed.syncedAt = new Date().toISOString();
        localStorage.setItem(localKey, JSON.stringify(parsed));
        console.log("✅ Pengiriman ulang berhasil");

        // Update UI if modal is still visible
        if (showResendModal) {
          setShowResendModal(false);
          // Optional: Show success message
        }
      } else {
        console.error(
          "❌ Pengiriman ulang gagal:",
          result.payload || result.error
        );
      }
    } catch (error) {
      console.error("❌ Error saat retry:", error);
    }
  };

  const navigateToResults = (
    newAccumulatedScore,
    finalPercentage,
    totalEvaluationTime
  ) => {
    navigate("/pemula/evaluation-satu/final-scored", {
      state: {
        score,
        totalQuestions: questions.length,
        timeTaken: totalEvaluationTime,
        totalPoints: newAccumulatedScore,
        percentage: finalPercentage,
        reviewData: reviewData,
      },
    });
  };

  const handleContinue = () => {
    const themeId =
      location.state?.themeId || localStorage.getItem("selectedThemeId") || "1";
    navigate(`/tema-belajar/${themeId}`);
  };

  // Modal handlers
  const handleMateri = () => setIsModalMateriOpen(true);
  const handleDonatur = () => setIsModalDonaturOpen(true);
  const handleModalRefensi = () => setIsModalReferensiVisible(true);
  const handleModalAnswer = () => setIsModalAnswerVisible(true);

  // Loading state
  if (loading || showSkeleton) {
    return <SkeletonLoader />;
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchQuizQuestions(id))}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // No questions state
  if (!currentQuestion) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen">
        <div
          className={`mx-auto text-center w-full h-full min-h-screen flex flex-col justify-center ${middleTheme()} max-w-md`}
        >
          <div className="flex flex-col items-center">
            <p>Tidak ada pertanyaan tersedia</p>
            <button
              onClick={handleContinue}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 p-5"
            >
              Kembali ke Pembelajaran
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
                {/* ✅ Tampilkan huruf A, B, C, D di depan jawaban */}
                <span className="font-bold mr-2 hidden">
                  {getAnswerLetter(index)}.
                </span>
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
              } ${saveLoading ? "opacity-50" : ""}`}
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null || saveLoading}
            >
              {saveLoading && currentIndex === questions.length - 1
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
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
              <div
                className={`rounded-xl rounded-b-none w-full m-0 p-6 mt-[550px] items-center justify-center fixed bottom-0 md:max-w-md ${
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
                      saveLoading && currentIndex === questions.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                    onClick={handleNextQuestion}
                    disabled={
                      saveLoading && currentIndex === questions.length - 1
                    }
                  >
                    {saveLoading && currentIndex === questions.length - 1
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
              className="fixed inset-0 z-50 flex justify-center items-center p-5"
              onClick={() => setIsModalReferensiVisible(false)}
            >
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
          {showResendModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
                <h2 className="text-lg font-semibold mb-3 text-red-600">
                  Gagal Mengirim Data ke Server
                </h2>
                <p className="text-sm text-gray-700">
                  Progres berhasil disimpan secara lokal namun gagal dikirim ke
                  server. Kami akan mencoba mengirim ulang dalam waktu 5 menit.
                </p>
                <button
                  onClick={() => setShowResendModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizSatu;
