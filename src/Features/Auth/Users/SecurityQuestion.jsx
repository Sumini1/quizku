import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { fetchRegister } from "../Reducer/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiLoader } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import Swal from "sweetalert2";

const SecurityQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const {
    getThemeModalCategory,
    getBorderClass,
    getButtonClass,
    middleTheme,
    getIconTheme,
  } = useTheme();
  const { registerData, isLoading } = useSelector((state) => state.register);

  const [securityData, setSecurityData] = useState({
    security_question: "",
    security_answer: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cek apakah data registrasi sudah ada
  useEffect(() => {
    if (
      !registerData ||
      !registerData.name ||
      !registerData.email ||
      !registerData.password
    ) {
      // Jika belum ada data registrasi, kembali ke halaman registrasi
      Swal.fire({
        title: "Error",
        text: "Silakan isi data registrasi terlebih dahulu",
        icon: "error",
      }).then(() => {
        navigate("/register-email");
      });
    }
  }, [registerData, navigate]);

  // Handle accordion toggling
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Questions array
  const questions = [
    "Nama keluarga, saudara, guru, teman terdekat",
    "Salah satu istilah dalam islam",
    "Sifat Allah ta'ala, rasulullah atau orang mukmin",
    "Nama tokoh dalam islam",
  ];

  // Handle question selection - sets the selected question to securityData
  const handleQuestionSelect = (question) => {
    setSecurityData({
      ...securityData,
      security_question: question,
    });
    setActiveIndex(null); // Close accordion after selection
    setError(""); // Clear error when question is selected
  };

  // Handle answer input change
  const handleAnswerChange = (e) => {
    setSecurityData({
      ...securityData,
      security_answer: e.target.value,
    });
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  // Validate form data
  const validateForm = () => {
    if (!securityData.security_question) {
      setError("Silakan pilih pertanyaan keamanan");
      return false;
    }

    if (!securityData.security_answer.trim()) {
      setError("Silakan berikan jawaban untuk pertanyaan keamanan");
      return false;
    }

    if (securityData.security_answer.trim().length < 3) {
      setError("Jawaban terlalu pendek (minimal 3 karakter)");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Gabungkan data registrasi dengan data pertanyaan keamanan
    const completeData = {
      user_name: registerData.name, // Map name back to user_name
      email: registerData.email,
      password: registerData.password,
      security_question: securityData.security_question,
      security_answer: securityData.security_answer.trim(),
    };

    // Dispatch ke Redux untuk registrasi
    dispatch(fetchRegister(completeData))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: "Sukses",
          text: "Registrasi berhasil! Silakan login.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((error) => {
        const errorMessage =
          error.message || "Terjadi kesalahan saat registrasi";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl  flex-grow max-w-md mx-auto w-full ${middleTheme()} md:text-base`}
      >
        <div className="flex  justify-between p-5">
          <div className="flex flex-col gap-3">
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
          <div className="bg-white rounded-lg mb-5 p-3 ">
            <p className="text-lg font-medium md:text-base -mt-5">
              Mohon diisi karena jawaban akan digunakan apabila lupa password
            </p>
          </div>

          {/* Selected question display */}
          <div
            className={`bg-white -mt-5 rounded-xl overflow-hidden border ${
              error && !securityData.security_question
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <div
              className="flex justify-between text-base font-medium items-center p-3 cursor-pointer"
              onClick={() => toggleAccordion(0)}
            >
              <span
                className={`${
                  !securityData.security_question && error
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
              >
                {securityData.security_question || "Pilih pertanyaan keamanan"}
              </span>
              <span className="text-gray-400 flex text-base font-medium items-center">
                {activeIndex === 0 ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </span>
            </div>

            {/* Dropdown list of questions */}
            {activeIndex === 0 && (
              <div className="border-t max-h-60 overflow-y-auto">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 text-base font-medium"
                    onClick={() => handleQuestionSelect(question)}
                  >
                    <p>{question}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Answer input field */}
          <div
            className={`mt-4 p-3 rounded-xl border ${
              error &&
              securityData.security_question &&
              !securityData.security_answer.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <input
              type="text"
              className={`w-full text-base font-medium p-2 border rounded-md outline-none ${
                error &&
                securityData.security_question &&
                !securityData.security_answer.trim()
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Jawaban Saya"
              value={securityData.security_answer}
              onChange={handleAnswerChange}
            />
          </div>

          {/* Error message */}
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

          <div className="flex flex-col fixed bottom-3 left-5 right-5 p-5 max-w-md justify-center items-center mx-auto ">
            <button
              className={`p-3 text-base font-medium rounded-xl border-none w-full max-w-md flex flex-col  ${
                securityData.security_question &&
                securityData.security_answer.trim()
                  ? `${getButtonClass()}`
                  : `${getBorderClass()}`
              }`}
              onClick={handleSubmit}
              disabled={
                isLoading ||
                isSubmitting ||
                !securityData.security_question ||
                !securityData.security_answer.trim()
              }
            >
              {isLoading || isSubmitting ? (
                <>
                  <FiLoader className="animate-spin inline-block mr-2" />
                  Memproses...
                </>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </div>

        {/* Loading Modal */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
              <HiBadgeCheck
                className={`${getIconTheme()} text-5xl border-none rounded-full`}
              />
              <p className="text-lg font-semibold">Mohon tunggu...</p>
              <p className="text-sm text-gray-500">
                Sedang memproses registrasi
              </p>
              <FiLoader
                style={{ animation: "spin 2s linear infinite" }}
                className={`text-4xl ${getIconTheme()}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityQuestion;
