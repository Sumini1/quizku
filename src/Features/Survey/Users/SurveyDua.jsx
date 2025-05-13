import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";

const SurveyDua = () => {
  const { getDotClassSurvey, getButtonClass, middleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  // Set overflow:hidden only when this page is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when leaving page
    };
  }, []);

  const options = [
    { id: 1, label: "Instagram" },
    { id: 2, label: "Twitter" },
    { id: 3, label: "Facebook" },
    { id: 4, label: "Youtube" },
    { id: 5, label: "Website" },
    { id: 6, label: "Teman" },
    { id: 7, label: "Lainnya" },
  ];

  const handleOptionChange = (id) => {
    setSelectedOption2(id);
  };

  const handleNextClick = () => {
    if (!selectedOption2) {
      setIsModalOpen2(true);
    } else {
      // Navigate to the next page with the selected option
      navigate("/survey-tiga", {
        state: {
          selectedOption2: options.find(
            (option) => option.id === selectedOption2
          ),
        },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className="w-full mx-auto h-screen md:p-0 flex flex-col">
      <div
        className={`w-full max-w-md mx-auto h-screen flex flex-col ${middleTheme()} p-5 relative`}
      >
        {/* Main content with options - scrollable if needed */}
        <div className="flex-1 overflow-y-auto pb-5 pt-7">
          <h2 className="text-xl font-semibold mb-3">
            Mengetahui Learn Quiz dari
          </h2>
          <h1 className="text-lg font-medium mb-5">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>
          <div className="flex flex-col gap-1 md:mt-16">
            {options.map((option) => (
              <div key={option.id} className="flex gap-5 mt-3 mb-2">
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  name="channel"
                  value={option.id}
                  checked={selectedOption2 === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
                <p
                  className="text-base font-medium"
                  htmlFor={`option-${option.id}`}
                >
                  {option.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer section with dots and button - Fixed height to ensure consistency */}
        <div className="h-28 flex flex-col justify-end mb-5">
          {/* Dots container with fixed height */}
          <div className="flex justify-center items-center text-xl mb-5">
            <GoDotFill className={getDotClassSurvey(0)} />
            <GoDotFill className={getDotClassSurvey(1)} />
            <GoDotFill className={getDotClassSurvey(2)} />
          </div>

          {/* Button */}
          <button
            onClick={handleNextClick}
            className={`text-white flex p-3 border-none rounded-xl w-full items-center justify-center ${getButtonClass()} text-base font-medium`}
          >
            Lanjut
          </button>
        </div>

        {/* Modal */}
        {isModalOpen2 && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="bg-white p-5 z-10 rounded-md shadow-md w-[90%] max-w-md">
              <h2 className="text-lg font-semibold mb-3">Peringatan</h2>
              <p className="mb-5">
                Anda harus memilih sumber informasi terlebih dahulu sebelum
                melanjutkan.
              </p>
              <button
                onClick={closeModal}
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
