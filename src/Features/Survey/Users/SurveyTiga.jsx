// SurveyTiga (Refactored)
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../Context/ThemeContext";
import { GoDotFill } from "react-icons/go";
import { HiBadgeCheck } from "react-icons/hi";
import { saveUserSurveys } from "../Reducer/userSurveys";

const SurveyTiga = () => {
  const { theme, getButtonClass, getDotClassSurvey, middleTheme, getBorder } =
    useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.userSurveys);

  const surveyDataPrevious = location.state?.surveyData || [];
  const questions = location.state?.questions || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (surveyDataPrevious.length === 0 || questions.length === 0) {
      navigate("/survey-satu");
    }
  }, [surveyDataPrevious, questions, navigate]);

  const handleSubmit = async () => {
    if (textareaValue.trim() === "") {
      return setShowWarningModal(true);
    }

    setSubmitting(true);

    const currentQuestion = questions.find(
      (q) => q.survey_question_order_index === 3
    );
    if (!currentQuestion) {
      alert("Question not found");
      setSubmitting(false);
      return;
    }

    const completeData = [
      ...surveyDataPrevious,
      {
        survey_question_id: currentQuestion.survey_question_id,
        user_answer: textareaValue.trim(),
      },
    ];

    try {
      // Save user age to localStorage if needed
      if (surveyDataPrevious.length > 0) {
        localStorage.setItem(
          "userAge",
          surveyDataPrevious[0]?.user_answer || ""
        );
      }

      const result = await dispatch(saveUserSurveys(completeData));

      if (saveUserSurveys.fulfilled.match(result)) {
        setIsModalOpen(true);
      } else {
        alert("Gagal menyimpan survey: " + (result.payload || "Unknown error"));
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan survey");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSurveyComplete = () => {
    setIsModalOpen(false);
    navigate("/list-levels", {
      state: {
        message: "Survey berhasil disimpan!",
        surveyCompleted: true,
      },
    });
  };

  const currentQuestion = questions.find(
    (q) => q.survey_question_order_index === 3
  );

  if (!currentQuestion) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Question not found</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto h-screen overflow-auto md:p-0 flex flex-col">
      <div
        className={`w-full p-5 max-w-md mx-auto h-screen overflow-auto flex flex-col ${middleTheme()}`}
      >
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-3 mt-10 tracking-wide leading-[1.6]">
            {currentQuestion.survey_question_text}
          </h2>
          <h1 className="text-lg font-medium mb-5 tracking-wide leading-[1.6]">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          {/* {surveyDataPrevious.length > 0 && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Jawaban sebelumnya:</p>
              {surveyDataPrevious.map((data, index) => (
                <p key={index} className="text-sm font-medium">
                  {index + 1}. {data.user_answer}
                </p>
              ))}
            </div>
          )} */}

          <div className="flex flex-col mt-6">
            <textarea
              style={{ backgroundColor: "transparent" }}
              name="motivasi"
              id="motivasi"
              cols="20"
              rows="5"
              placeholder="Tulis jawaban Anda di sini..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              disabled={submitting || loading}
              className={`border-[1px] rounded-md text-[#333] p-5 ${getBorder()} ${
                theme === "cupcake" && "border-[rgb(237,226,236)] border-2"
              }`}
            />
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              Error: {error}
            </div>
          )}
        </div>

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 items-center text-xl">
          <GoDotFill className={getDotClassSurvey(0)} />
          <GoDotFill className={getDotClassSurvey(1)} />
          <GoDotFill className={getDotClassSurvey(2)} />
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-5 py-3 max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            type="submit"
            className={`text-white flex p-3 border-none rounded-xl w-full items-center justify-center ${getButtonClass()} text-base font-medium ${
              submitting || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting || loading ? "Menyimpan..." : "Kirim Survey"}
          </button>
        </div>

        {/* Warning Modal */}
        {showWarningModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-5 rounded-md shadow-md w-[90%] max-w-md z-10">
              <h2 className="text-lg font-semibold mb-3">Peringatan</h2>
              <p className="mb-5">
                Anda harus mengisi jawaban terlebih dahulu sebelum melanjutkan.
              </p>
              <button
                onClick={() => setShowWarningModal(false)}
                className={`px-4 py-2 rounded-xl border-none ${getButtonClass()}`}
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="bg-white p-5 z-10 flex flex-col items-center rounded-md shadow-md w-[90%] max-w-md">
              <HiBadgeCheck className="text-8xl p-2 text-[#28A745]" />
              <p className="text-lg font-semibold">Survei berhasil dikirim</p>
              <div className="text-center mb-2">
                <p>
                  Jaazakumullah khair terimakasih banyak atas partisipasinya
                </p>
              </div>
              <button
                onClick={handleSurveyComplete}
                className="p-3 w-full border-none rounded-xl bg-[#28A745] text-[#DCFFD9]"
              >
                Lanjut
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyTiga;
