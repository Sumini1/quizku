// SurveySatu (Refactored for simplicity & readability)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";

const options = [
  "Dibawah 12 tahun",
  "12 - 14 tahun",
  "15 - 18 tahun",
  "19 - 25 tahun",
  "26 - 35 tahun",
  "36 - 55 tahun",
  "Diatas 55 tahun",
];

const SurveySatu = () => {
  const { getDotClassSurvey, getButtonClass, middleTheme } = useTheme();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleNext = () => {
    if (selected === null) return setShowModal(true);
    navigate("/survey-dua", {
      state: {
        surveyData: [
          {
            survey_question_id: 1,
            user_answer: options[selected],
          },
        ],
      },
    });
  };

  return (
    <div className="w-full h-screen overflow-auto flex flex-col">
      <div
        className={`p-5 max-w-md w-full mx-auto flex flex-col h-screen ${middleTheme()}`}
      >
        <div className="mt-10 pb-32 flex-grow overflow-hidden">
          <h2 className="text-xl font-semibold mb-3">Usia</h2>
          <h1 className="text-lg font-medium mb-5">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          <div className="flex flex-col gap-3 mt-10">
            {options.map((label, i) => (
              <label key={i} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                <span className="text-base font-medium">{label}</span>
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
            className={`w-full py-3 text-base font-medium text-white rounded-xl border-none ${getButtonClass()}`}
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
                Anda harus memilih usia terlebih dahulu sebelum melanjutkan.
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
