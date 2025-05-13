import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { GoDotFill } from "react-icons/go";
import { HiBadgeCheck } from "react-icons/hi";

const SurveyTiga = () => {
  const { theme, getButtonClass, getDotClassSurvey, middleTheme, getBorder } =
    useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Set overflow:hidden only when this page is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when leaving page
    };
  }, []);

  const handleSurvey = () => {
    setIsModalOpen(false);
    navigate("/list-levels");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto h-screen md:p-0 flex flex-col">
      <div
        className={`w-full max-w-md mx-auto h-screen flex flex-col ${middleTheme()} p-5 relative`}
      >
        {/* Main content area - scrollable if needed */}
        <div className="flex-1 overflow-y-auto pb-5 pt-10">
          <h2 className="text-xl font-semibold mb-3 tracking-wide leading-[1.6]">
            Motivasi Belajar
          </h2>
          <h1 className="text-lg font-medium mb-5 tracking-wide leading-[1.6]">
            Mohon partisipasinya untuk pengembangan aplikasi
          </h1>

          <div className="flex flex-col mt-14">
            <textarea
              style={{ backgroundColor: "transparent" }}
              name="motivasi"
              id="motivasi"
              cols="20"
              rows="5"
              placeholder="Motivasi belajar, tulis di sini yaa"
              className={`border-[1px] rounded-md text-[#333] p-5 ${getBorder()} ${
                theme === "cupcake" && "border-[rgb(237,226,236)] border-2"
              }`}
            ></textarea>
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
            onClick={handleOpenModal}
            type="submit"
            className={`text-white flex p-3 border-none rounded-xl w-full items-center justify-center ${getButtonClass()} text-base font-medium`}
          >
            Lanjut
          </button>
        </div>

        {/* Modal */}
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
                onClick={handleSurvey}
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
