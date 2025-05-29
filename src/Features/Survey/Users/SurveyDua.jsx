// SurveyDua (Refactored)
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";

const SurveyDua = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getDotClassSurvey, getButtonClass, middleTheme } = useTheme();

  const surveyDataFirst = location.state?.surveyData || [];
  const questions = location.state?.questions || [];

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    if (surveyDataFirst.length === 0 || questions.length === 0) {
      navigate("/survey-satu");
    }
  }, [surveyDataFirst, questions, navigate]);

  const handleNext = () => {
    if (selected === null) return setShowModal(true);

    const currentQuestion = questions.find(
      (q) => q.survey_question_order_index === 2
    );
    if (!currentQuestion) return;

    const completeData = [
      ...surveyDataFirst,
      {
        survey_question_id: currentQuestion.survey_question_id,
        user_answer: currentQuestion.survey_question_answer[selected],
      },
    ];

    navigate("/survey-tiga", {
      state: {
        surveyData: completeData,
        questions: questions,
      },
    });
  };

  const currentQuestion = questions.find(
    (q) => q.survey_question_order_index === 2
  );

  if (!currentQuestion) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Question not found</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-auto flex flex-col">
      <div className={`p-5 max-w-md w-full mx-auto h-screen ${middleTheme()}`}>
        <div className="mt-10 pb-32 flex-grow">
          <h2 className="text-xl font-semibold mb-3">
            {currentQuestion.survey_question_text}
          </h2>
          <h1 className="text-lg font-medium mb-5">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          {/* {surveyDataFirst.length > 0 && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                Jawaban sebelumnya:{" "}
                <span className="font-medium">
                  {surveyDataFirst[0]?.user_answer}
                </span>
              </p>
            </div>
          )} */}

          <div className="flex flex-col gap-3 mt-6">
            {currentQuestion.survey_question_answer.map((option, i) => (
              <label key={i} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span className="text-base font-medium">{option}</span>
              </label>
            ))}
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
            className={`w-full py-3 rounded-xl text-base font-medium text-white border-none ${getButtonClass()}`}
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

export default SurveyDua;
