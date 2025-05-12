import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import Swal from "sweetalert2";
import { fetchForgotPassword } from "../Reducer/forgotPasswordCheck";

const PertanyaanKeamanan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const {
    getThemeModalCategory,
    middleTheme,
    getButtonClass,
    getBorderClass,
    getIconTheme,
  } = useTheme();

  const { forgotPasswordData, isLoading } = useSelector(
    (state) => state.forgotPassword
  );

  const [securityData, setSecurityData] = useState({
    security_question: "",
    security_answer: "",
  });

  // Cek apakah data registrasi sudah ada
  useEffect(() => {
    if (!forgotPasswordData.email) {
      // Jika belum ada data registrasi, kembali ke halaman registrasi
      Swal.fire({
        title: "Error",
        text: "Silakan isi data registrasi terlebih dahulu",
        icon: "error",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [forgotPasswordData, navigate]);

  // Handle accordion toggling
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Questions array
  const questions = [
    "Nama keluarga, saudara, guru, teman terdekat",
    "Salah satu istilah dalam islam",
    "Apa nama hewan peliharaanmu? ",
    "Nama tokoh dalam islam",
  ];

  // Handle question selection - sets the selected question to securityData
  const handleQuestionSelect = (question) => {
    setSecurityData({
      ...securityData,
      security_question: question,
    });
    setActiveIndex(null); // Close accordion after selection
  };

  // Handle answer input change
  const handleAnswerChange = (e) => {
    setSecurityData({
      ...securityData,
      security_answer: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!securityData.security_question || !securityData.security_answer) {
      Swal.fire({
        title: "Error",
        text: "Silakan pilih pertanyaan keamanan dan berikan jawaban",
        icon: "error",
      });
      return;
    }

    // Gabungkan data registrasi dengan data pertanyaan keamanan
    const completeData = {
      ...forgotPasswordData,
      security_question: securityData.security_question,
      security_answer: securityData.security_answer,
    };

    // Dispatch ke Redux untuk registrasi
    dispatch(fetchForgotPassword(completeData))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Sukses",
          text: "Pemulihan akun sedikit lagi, silahkan isi password baru",
          icon: "success",
        }).then(() => {
          navigate("/new-password");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text:
            "Terjadi kesalahan saat registrasi: " +
            (error.message || "Unknown error"),
          icon: "error",
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl  flex-grow max-w-md mx-auto w-full ${middleTheme()} md:text-base`}
      >
        <div className="flex justify-between p-5 -mt-3">
          <div className="flex flex-col  gap-3">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
            <h1 className="font-semibold text-2xl md:text-lg">
              Pertanyaan Keamanan
            </h1>
          </div>
        </div>

        <div className="flex flex-col p-5 ">
          <div className="bg-white  rounded-lg mb-2">
            <p className="text-lg font-medium md:text-base -mt-3">
              Mohon diisi karena jawaban akan digunakan apabila lupa password
            </p>
          </div>

          {/* Selected question display */}
          <div className="bg-white rounded-xl rounded-b-none overflow-hidden border border-gray-300">
            <div
              className="flex justify-between text-base font-medium items-center p-3 cursor-pointer"
              onClick={() => toggleAccordion(0)}
            >
              <span>
                {securityData.security_question ||
                  "Nama keluarga, saudara, guru, teman terdekat"}
              </span>
              <span className="text-gray-400 text-base font-medium flex items-center -mt-4 md:mt-0">
                {activeIndex === 0 ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </span>
            </div>

            {/* Dropdown list of questions */}
            {activeIndex === 0 && (
              <div className="border-t">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b last:border-b-0 text-base font-medium cursor-pointer hover:bg-gray-50 
                  }`}
                    onClick={() => handleQuestionSelect(question)}
                  >
                    <p>{question}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Answer input field */}
          <div className="rounded-xl rounded-t-none overflow-hidden border border-gray-300 p-5 md:text-base">
            <input
              type="text"
              className="w-full p-3 border text-base font-medium rounded-md md:p-2"
              placeholder="Jawaban Saya"
              value={securityData.security_answer}
              onChange={handleAnswerChange}
            />
          </div>

          <div className="flex md:p-5 flex-col fixed bottom-3 left-5 right-5 justify-center mx-auto  max-w-md ">
            <button
              className={`p-3  text-base font-medium rounded-xl border-none w-full 
    ${
      securityData.security_question
        ? `${getButtonClass()}`
        : `${getBorderClass()}`
    }`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <FiLoader className="animate-spin  mr-2 " />
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md flex flex-col items-center gap-4">
            <HiBadgeCheck
              className={`${getIconTheme()} text-5xl border-none rounded-full`}
            />
            <p className="text-lg font-semibold">Mohon tunggu...</p>
            <p className="text-sm text-gray-500">Sedang memproses registrasi</p>
            <FiLoader
              style={{ animation: "spin 2s linear infinite" }}
              className={`text-4xl ${getIconTheme()}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PertanyaanKeamanan;
