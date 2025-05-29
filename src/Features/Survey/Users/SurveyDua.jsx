// SurveyDua (Refactored)
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";
import { saveUserSurveys } from "../Reducer/userSurveys";

const options = [
  "Teman/saudara",
  "Guru/lembaga",
  "Whatsapp",
  "Instagram",
  "Youtube",
  "Twitter",
  "Facebook",
];

const SurveyDua = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getDotClassSurvey, getButtonClass, middleTheme } = useTheme();

  const { loading, error } = useSelector((state) => state.userSurveys);

  const surveyDataFirst = location.state?.surveyData || [];

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  useEffect(() => {
    if (surveyDataFirst.length === 0) navigate("/survey-satu");
  }, [surveyDataFirst, navigate]);

  const handleSubmit = async () => {
    if (selected === null) return setShowModal(true);
    setSubmitting(true);

    const completeData = [
      ...surveyDataFirst,
      { survey_question_id: 2, user_answer: options[selected] },
    ];

    try {
      localStorage.setItem("userAge", surveyDataFirst[0]?.user_answer || "");

      const result = await dispatch(saveUserSurveys(completeData));
      if (saveUserSurveys.fulfilled.match(result)) {
        navigate("/survey-tiga", {
          state: {
            message: "Survey berhasil disimpan!",
            surveyCompleted: true,
          },
        });
      } else {
        alert("Gagal menyimpan survey: " + (result.payload || "Unknown error"));
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan survey");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-auto flex flex-col">
      <div className={`p-5 max-w-md w-full mx-auto h-screen ${middleTheme()}`}>
        <div className="mt-10 pb-32 flex-grow">
          <h2 className="text-xl font-semibold mb-3">
            Mengetahui Learn Quiz dari
          </h2>
          <h1 className="text-lg font-medium mb-5">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          {surveyDataFirst.length > 0 && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                Usia yang dipilih:{" "}
                <span className="font-medium">
                  {surveyDataFirst[0]?.user_answer}
                </span>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-6">
            {options.map((label, i) => (
              <label key={i} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                  disabled={submitting || loading}
                />
                <span className="text-base font-medium">{label}</span>
              </label>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              Error: {error}
            </div>
          )}
        </div>

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 text-xl">
          {[0, 1, 2].map((i) => (
            <GoDotFill key={i} className={getDotClassSurvey(i)} />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-5 py-3 max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className={`w-full py-3 rounded-xl text-base font-medium text-white border-none ${getButtonClass()} ${
              submitting || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting || loading ? "Menyimpan..." : "Kirim Survey"}
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-5 rounded-md shadow-md w-[90%] max-w-md z-10">
              <h2 className="text-lg font-semibold mb-3">Peringatan</h2>
              <p className="mb-5">
                Anda harus memilih sumber informasi terlebih dahulu sebelum
                melanjutkan.
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
