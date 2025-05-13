import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useTheme } from "../../../Context/ThemeContext";

const SurveyDua = () => {
  const location = useLocation();
  const { theme, getDotClassSurvey, getButtonClass, middleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const handleNextClick = () => {
    if (!selectedOption2) {
      setIsModalOpen2(true);
      console.log("Modal state set to true");
    } else {
      navigate("/survey-tiga", {
        state: {
          selectedOption: options.find(
            (option) => option.id === selectedOption2
          ),
        },
      });
    }
  };

  const handleOptionChange = (id) => {
    setSelectedOption2(id);
  };

  const closeModal = () => {
    setIsModalOpen2(false);
  };
  // Ambil label usia dari SurveiSatu
  const selectedOptionFromSurveiSatu = location.state?.selectedOption?.label;

  // Set overflow:hidden hanya saat halaman ini aktif
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Pulihkan scroll saat keluar dari halaman
    };
  }, []);

  const options = [
    { id: 1, label: "Teman/saudara" },
    { id: 2, label: "Guru/lembaga" },
    { id: 3, label: "Whatsapp" },
    { id: 4, label: "Instagram" },
    { id: 5, label: "Youtube" },
    { id: 6, label: "Twitter" },
    { id: 7, label: "Facebook" },
  ];

  return (
    <div className="w-full  mx-auto h-screen overflow-auto   md:p-0 flex flex-col">
      <div
        className={`w-full p-5 max-w-md mx-auto h-screen overflow-auto  flex flex-col ${middleTheme()}`}
      >
        <div className="mt-7 md:pb-32 flex flex-col flex-grow overflow-hidden pb-32">
          <h2 className="text-xl font-semibold mb-3 mt-auto">
            Mengetahui Learn Quiz dari
          </h2>
          <h1 className="text-lg font-medium mb-y">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>
          <div className="flex flex-col gap-1 md:mt-20">
            {options.map((option) => (
              <div key={option.id} className="flex gap-5 mt-3 mb-2">
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  name="usia"
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

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 items-center text-xl">
          <GoDotFill className={getDotClassSurvey(0)} />
          <GoDotFill className={getDotClassSurvey(1)} />
          <GoDotFill className={getDotClassSurvey(2)} />
        </div>

        <div className="  fixed bottom-0 left-0 right-0 px-5 py-3  max-w-md mx-auto">
          <button
            onClick={handleNextClick}
            className={`text-white flex p-3 border-none rounded-xl w-full items-center justify-center ${getButtonClass()}`}
          >
            Lanjut
          </button>
        </div>

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
