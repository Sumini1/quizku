import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";
import { fetchQuestionsSurvey } from "../Reducer/questionsSurvey";

const SurveySatu = () => {
  const { getDotClassSurvey, getButtonClass, middleTheme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: questions,
    loading,
    error,
  } = useSelector((state) => state.questionsSurvey);
  console.log("questions",  questions);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    dispatch(fetchQuestionsSurvey());
  }, [dispatch]);

  const handleNext = () => {
    if (selected === null) return setShowModal(true);

    const currentQuestion = questions.find(
      (q) => q.survey_question_order_index === 1
    );
    if (!currentQuestion) return;

    // Safe access to survey_question_answer
    const userAnswer = currentQuestion.survey_question_answer && 
      currentQuestion.survey_question_answer[selected]
      ? currentQuestion.survey_question_answer[selected]
      : selected;

    navigate("/survey-dua", {
      state: {
        surveyData: [
          {
            survey_question_id: currentQuestion.survey_question_id,
            user_answer: userAnswer,
          },
        ],
        questions: questions,
      },
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  const currentQuestion =
    questions && questions.length > 0
      ? questions.find((q) => q.survey_question_order_index === 1)
      : null;

  // Improved validation
  const hasValidAnswers = currentQuestion && 
    currentQuestion.survey_question_answer && 
    Array.isArray(currentQuestion.survey_question_answer) &&
    currentQuestion.survey_question_answer.length > 0;

  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">
          {loading ? "Loading questions..." : "Question not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-auto flex flex-col">
      <div
        className={`p-5 max-w-md w-full mx-auto flex flex-col h-screen ${middleTheme()}`}
      >
        <div className="mt-10 pb-32 flex-grow overflow-hidden">
          <h2 className="text-xl font-semibold mb-3">
            {currentQuestion.survey_question_text}
          </h2>
          <h1 className="text-lg font-medium mb-5">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          <div className="flex flex-col gap-3 mt-10">
            {hasValidAnswers ? (
              currentQuestion.survey_question_answer.map((option, i) => (
                <label key={i} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="survey-answer"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  <span className="text-base font-medium">{option}</span>
                </label>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No answer options available for this question
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 text-xl">
          {[0, 1, 2].map((i) => (
            <GoDotFill key={i} className={getDotClassSurvey(i)} />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-5 py-3 max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={!hasValidAnswers}
            className={`w-full py-3 text-base font-medium text-white rounded-xl border-none ${getButtonClass()} ${
              !hasValidAnswers ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Lanjut
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-5 rounded-md shadow-md w-[90%] max-w-md z-10">
              <h2 className="text-lg font-semibold mb-3">Peringatan</h2>
              <p className="mb-5">
                Anda harus memilih jawaban terlebih dahulu sebelum melanjutkan.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className={`px-4 py-2 rounded-xl border-none ${getButtonClass()}`}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SurveySatu;