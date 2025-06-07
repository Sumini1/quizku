import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle,
} from "lucide-react";

const PertanyaanKeamanan = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with your actual Redux state
  const forgotPasswordData = { email: "test@example.com" };

  const [securityData, setSecurityData] = useState({
    security_question: "",
    security_answer: "",
  });

  // Questions array
  const questions = [
    "Nama keluarga, saudara, guru, teman terdekat",
    "Salah satu istilah dalam islam",
    "Apa nama hewan peliharaanmu?",
    "Nama tokoh dalam islam",
  ];

  // Handle accordion toggling
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle question selection
  const handleQuestionSelect = (question) => {
    setSecurityData({
      ...securityData,
      security_question: question,
    });
    setActiveIndex(null);
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
      alert("Silakan pilih pertanyaan keamanan dan berikan jawaban");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Sukses! Pemulihan akun sedikit lagi, silahkan isi password baru");
    }, 2000);
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  const isFormComplete =
    securityData.security_question && securityData.security_answer.trim();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Pertanyaan Keamanan
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Description */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Mohon diisi karena jawaban akan digunakan apabila lupa password
            </p>
          </div>

          {/* Security Question Form */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Question Selector */}
            <div className="border-b border-gray-200">
              <button
                type="button"
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleAccordion(0)}
              >
                <span className="text-sm font-medium text-gray-900">
                  {securityData.security_question ||
                    "Pilih pertanyaan keamanan"}
                </span>
                {activeIndex === 0 ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              {/* Dropdown Questions */}
              {activeIndex === 0 && (
                <div className="border-t border-gray-200 bg-gray-50">
                  {questions.map((question, index) => (
                    <button
                      key={index}
                      type="button"
                      className="w-full p-4 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => handleQuestionSelect(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="p-4">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jawaban Saya"
                value={securityData.security_answer}
                onChange={handleAnswerChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="bg-white border-t border-gray-200 ">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
              isFormComplete
                ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormComplete || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </div>
            ) : (
              "Daftar"
            )}
          </button>
        </div>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm w-full">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Mohon tunggu...
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Sedang memproses registrasi
                </p>
              </div>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PertanyaanKeamanan;
