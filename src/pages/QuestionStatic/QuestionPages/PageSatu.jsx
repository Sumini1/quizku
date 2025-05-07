import React, { useState, useEffect } from "react";
import { FaBook, FaQuestion } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { MdMenuBook } from "react-icons/md";
import { TbMapQuestion } from "react-icons/tb";
import TooltifWordIslam from "../Modals/TooltifWorldIslam";
import TooltifWordRukun from "../Modals/TooltifWordRukun";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Tutorial1 from "../ModalQuestions/Tutorial1";
import lamp from "../../../assets/questionStatic/lamp.png";

const PageSatu = () => {
  const { theme, getBorder, getIconTheme, getIconBookSoal, getButton } =
    useTheme();
  const [progress, setProgress] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isModalAnswerVisible, setIsModalAnswerVisible] = useState(false);
  const [isModalReferensiVisible, setIsModalReferensiVisible] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);

  // Set overflow:hidden hanya saat halaman ini aktif
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto"; // Pulihkan scroll saat keluar dari halaman
    };
  }, []);

  // Data dinamis
  const wordsWithTooltip = [
    { id: 1, word: "Apa", tooltip: null },
    { id: 2, word: "itu", tooltip: null },
    { id: 3, word: "apa", tooltip: null },
    { id: 4, word: "Islam ?", tooltip: "Agama yang haq" },
    { id: 5, word: "Ada", tooltip: null },
    { id: 6, word: "Berapa", tooltip: null },
    {
      id: 7,
      word: "Rukun",
      tooltip: "Segala sesuatu yang harus ada",
    },
    {
      id: 8,
      word: "Islam?",
      tooltip:
        "Agama yang diturunkan oleh Allah ta'ala kepada Nabi Muhammad sebagai nabi terakhir.",
    },
  ];

  // Tooltip Toggle
  const handleTooltipToggle = (index) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  const handleModalRefensi = () => {
    setIsModalReferensiVisible(true);
  };

  const handleModalAnswer = () => {
    setIsModalAnswerVisible(true);
  };

  useEffect(() => {
    const currentTime = Date.now();
    setStartTime(currentTime);
    localStorage.removeItem("progress");
    localStorage.removeItem("totalTime");
  }, []);

  const handleAnswer = (isCorrect, answerIndex) => {
    setSelectedAnswer(answerIndex);
    setIsAnswerCorrect(isCorrect);
    setIsAnswered(true);
  };

  const handleCheck = () => {
    if (isAnswered) {
      setIsModalVisible(true); // Modal muncul setelah menjawab
      if (isAnswerCorrect) {
        const newProgress = Math.min(progress + 10, 100);
        setProgress(newProgress);
        localStorage.setItem("progress", newProgress);

        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);

        let totalTime = Number(localStorage.getItem("totalTime")) || 0;
        totalTime += timeTaken;
        localStorage.setItem("totalTime", totalTime);

        console.log(`Waktu pengerjaan soal ini: ${timeTaken} detik`);
        console.log(`Total waktu pengerjaan: ${totalTime} detik`);
      }
    } else {
      alert("Silakan pilih jawaban terlebih dahulu.");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setActiveModal(null);
  };

  const getThemeClass = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-green-500 text-white"
      : "bg-blue-600 text-[#FFF]  ";
  };

  const getTextSoal = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-gray-900"
      : theme === "bumblebee"
      ? "text-white"
      : "text-[#F59D09] ";
  };

  const getThemeLatar = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-[#FFF1DA] text-[#333]"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-green-500 text-white"
      : "bg-[#FFF1DA] text-[#333]";
  };

  const getThemeTooltif = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-[#FFF1DA] text-[#333]"
      : theme === "bumblebee"
      ? "bg-[#333] text-[#FFF1DA]"
      : theme === "lemonade"
      ? "bg-[#333] text-[#FFF1DA]"
      : "bg-[#EEE] text-[#333]";
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalReferensiVisible(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col p-5 h-screen overflow-hidden md:justify-start md:items-start md:ml-10 md:py-10 cursor-pointer">
        {/* Progress Bar */}
        {isOpen && <Tutorial1 />}
        <div className="flex flex-col h-4 mb-2 mt-2 w-full">
          <div className="flex w-full h-2 ">
            <IoClose className=" -mt-3 text-3xl font-bold items-center -ml-2" />

            <div className="w-full bg-gray-200 rounded-sm max-w-[265px] mx-1 -mt-1">
              <div
                className={`h-full rounded-sm ${getThemeClass()}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center  justify-between mt-5">
          <div className="flex gap-2 items-center bg-[#FFF2DC] p-2 rounded-xl">
            <FaBook className="text-[#F59D09]" />
            <h1 className="text-base font-medium">Materi</h1>
          </div>
          <div className="flex gap-2 items-center bg-[#DCE6F8] p-2 rounded-xl">
            <FaHeart className="text-[#0961F5]" />
            <h1 className="text-base font-medium">Donatur</h1>
          </div>
        </div>
        <div className="flex flex-col mt-7">
          <div className="text-lg font-[500] gap-1 flex flex-wrap ">
            {wordsWithTooltip.map((item, index) => (
              <p key={index}>
                <span
                  className={`relative  inline-block ${
                    item.tooltip
                      ? "underline decoration-dotted decoration-2 cursor-pointer"
                      : ""
                  }`}
                  onClick={
                    item.tooltip
                      ? (e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const viewportWidth = window.innerWidth;
                          const tooltipWidth = 200;
                          let xPosition, arrowPosition;

                          // Check if word is in right third of viewport
                          if (rect.right > viewportWidth * 0.7) {
                            xPosition = rect.right - tooltipWidth;
                            arrowPosition = tooltipWidth - rect.width / 2;
                          }
                          // Check if word is in left third of viewport
                          else if (rect.left < viewportWidth * 0.3) {
                            xPosition = rect.left;
                            arrowPosition = rect.width / 2;
                          }
                          // Center positioning
                          else {
                            xPosition =
                              rect.left + rect.width / 2 - tooltipWidth / 2;
                            arrowPosition = tooltipWidth / 2;
                          }

                          // Ensure tooltip stays within viewport
                          xPosition = Math.max(
                            20,
                            Math.min(
                              xPosition,
                              viewportWidth - tooltipWidth - 20
                            )
                          );

                          handleTooltipToggle(index);

                          requestAnimationFrame(() => {
                            const tooltip = document.getElementById(
                              `tooltip-${index}`
                            );
                            if (tooltip) {
                              tooltip.style.left = `${xPosition}px`;
                              tooltip.style.top = `${
                                rect.bottom + window.scrollY + 8
                              }px`;
                              tooltip.querySelector(
                                ".arrow"
                              ).style.left = `${arrowPosition}px`;
                            }
                          });
                        }
                      : null
                  }
                >
                  <span className="text-lg font-medium !important">
                    {item.word}
                  </span>

                  {item.tooltip && activeTooltip === index && (
                    <div
                      id={`tooltip-${index}`}
                      className={`fixed p-4 w-[200px] font-[300]  rounded-md text-[16px] shadow-lg ${getThemeTooltif()}`}
                      style={{
                        maxWidth: "270px",
                        wordWrap: "break-word",
                        zIndex: 1000,
                      }}
                    >
                      {item.tooltip}
                      <div
                        className={`arrow absolute  -top-2 w-7 h-3 rotate-45 ${getThemeTooltif()}`}
                      />
                      <div className="w-full text-[#222]">
                        <hr className="border-[#222] mt-10" />
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() => setActiveModal(item.id)}
                          className={`text-md mt-1 font-[500] ml-12  underline ${getIconTheme()}`}
                        >
                          Selengkapnya
                        </button>
                      </div>
                    </div>
                  )}
                </span>
              </p>
            ))}
          </div>
          {activeModal === 4 && (
            <TooltifWordIslam
              isOpen={activeModal === 4}
              onClose={() => setActiveModal(null)}
            />
          )}
          {activeModal === 7 && (
            <TooltifWordRukun
              isOpen={activeModal === 7}
              onClose={() => setActiveModal(null)}
            />
          )}
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10 w-full">
          {["Empat", "Lima", "Enam", "Tiga"].map((answer, index) => (
            <p
              key={index}
              className={`flex border ${getBorder()} p-2 w-full text-center items-center justify-center cursor-pointer rounded-md ${
                selectedAnswer === index ? `${getThemeClass()} border-none` : ""
              }`}
              onClick={() => handleAnswer(index === 1, index)}
              style={{
                color:
                  selectedAnswer === index ? "white" : `${getThemeClass()}`,
              }}
            >
              {answer}
            </p>
          ))}
        </div>
        {/* Button cek */}
        <div className="fixed bottom-0 left-0 right-0  px-5 py-3 shadow-md flex justify-between gap-2">
          <img
            src={lamp}
            onClick={handleModalRefensi}
            className={`border text-4xl mt-1 ${getIconBookSoal()} border-none`}
          />
          <button
            className={`p-3 w-[370px] rounded-xl border-none ${getButton()} ${
              selectedAnswer !== null
                ? `${getThemeClassPage()} border-none`
                : ""
            }`}
            onClick={handleCheck}
          >
            Cek
          </button>
        </div>

        {/* Modal Referensi */}
        {isModalReferensiVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div
              className={`rounded-lg p-5 w-96 relative bg-white`}
              onClick={handleOverlayClick}
            >
              {/* <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalReferensiVisible(false)}
            >
              <IoClose className="text-2xl" />
            </button> */}
              {/* Wrapper untuk teks scrollable */}
              <ModalReferensi
                setIsModalReferensiVisible={setIsModalReferensiVisible}
                getThemeLatar={getThemeLatar}
                getThemeClass={getThemeClass}
                getTextSoal={getTextSoal}
              />
            </div>
          </div>
        )}

        {/* Modal Dari jawaban salah dan benar */}
        {isModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`rounded-lg p-6 w-96  mt-[550px] items-center justify-center  ${
                isAnswerCorrect ? "bg-[#DCFFD9]" : "bg-[#FFD9D9]"
              }`}
            >
              <div className="flex">
                <button
                  className="top-2 flex text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                ></button>
                <h2
                  className={`text-xl font-bold mb-4 w-full flex 
                }`}
                  style={{ color: isAnswerCorrect ? "#28A745" : "#A74828" }}
                >
                  {isAnswerCorrect ? "Benar!" : "Salah!"}
                </h2>

                <div className="flex h-auto mx-2  ">
                  {isAnswerCorrect ? (
                    <FaCheckCircle className="text-green-500 text-3xl " />
                  ) : (
                    <span className="bg-[#A74828] w-full h-[30px] rounded-lg ">
                      <IoClose className="text-white text-3xl font-semibold  " />
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <p className="">
                    <MdMenuBook
                      onClick={handleModalAnswer}
                      className={`text-5xl  bg-white  w-[50px] h-[50px]  -mt-7 ml-[180px] p-2 rounded-full ${
                        isAnswerCorrect
                          ? "text-[#F59D09] "
                          : "text-[#F59D09] bg-[#FEEFB3]"
                      }`}
                    />
                  </p>
                </div>
              </div>
              <div className="flex gap-5 ">
                <Link to={"/page-dua"}>
                  <button
                    className={`p-3 w-[340px] rounded-xl mt-4 text-white ${
                      isAnswerCorrect ? "bg-green-500" : "bg-[#A74828]"
                    }`}
                    onClick={closeModal}
                  >
                    Lanjut
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Modal Answer ketika jawaban benar ketik Icon buku */}
        {isModalAnswerVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5 "
            onClick={() => setIsModalAnswerVisible(false)}
          >
            <div className="bg-[#DCFFD9] rounded-lg w-96 relative ">
              <ModalAnswer setIsModalAnswerVisible={setIsModalAnswerVisible} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Modal Answer Penjelasan
const ModalAnswer = ({ setIsModalAnswerVisible }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col rounded-lg bg-[#DCFFD9] p-5">
      {/* Sticky heading */}
      <h1 className="text-[20px] font-[500] mb-3 sticky top-0  z-10">
        Penjelasan{" "}
        <span className="text-[#28A745] text-[20px] font-[500]">Jawaban</span>
      </h1>

      {/* Konten scrollable */}
      <div className="text-[16px] overflow-y-scroll max-h-[400px] font-[300]">
        <p className="mb-2">
          Rukun iman ketiga adalah beriman kitab-kitabya. Beriman kepada kitab
          yang Allah ta’ala turunkan wajib diimani oleh setiap muslim bukan
          hanya Al-Qur’an namun juga kitab-kitab sebelumnya seperti zabur,
          taurat dan injil. Adapun urutan ketiga beriman kepada kitab ada di
          Hadist Jibril yang berbunyi
        </p>
        <p className="mb-2">
          Dalil yang paling jelas dan langsung tentang urutan rukun iman adalah
          Hadis Jibril:
        </p>
        <p>
          Hadis Riwayat Muslim (No. 8) Dari Umar bin Khattab radhiyallahu 'anhu,
          ia berkata: Suatu hari kami duduk bersama Rasulullah ﷺ, lalu datang
          seorang laki-laki berpakaian sangat putih dan berambut sangat hitam
          (Jibril). Ia bertanya: "Wahai Muhammad, kabarkan kepadaku tentang
          iman." Rasulullah ﷺ menjawab:
        </p>
        <p>
          "Iman adalah engkau beriman kepada Allah, malaikat-malaikat-Nya,
          kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman
          kepada takdir yang baik maupun yang buruk."
        </p>
        <p>
          Hadis ini secara eksplisit menyebutkan urutan rukun iman yang menjadi
          dasar keyakinan umat Islam.
        </p>
      </div>

      {/* Sticky button */}
      <button
        onClick={() => setIsModalAnswerVisible(false)}
        className={`p-2 w-full rounded-xl mt-4 sticky bottom-0 z-10 bg-[#28A745] text-[#DCFFD9]  text-[16px] font-[400]`}
      >
        Selesai Membaca
      </button>
    </div>
  );
};

// Modal Referensi
const ModalReferensi = ({
  setIsModalReferensiVisible,
  getThemeLatar,
  getTextSoal,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col p-5 rounded-lg ${getThemeLatar()}`}>
      <h1 className="text-xl font-bold mb-3  z-10 sticky top-0">
        Bantuan <span className={`${getTextSoal()} mx-1`}>Soal</span>
      </h1>
      <div className="text-[16px] font-[300] mb-3">
        <p>
          Dalil yang paling jelas dan langsung tentang urutan rukun iman adalah
          Hadis Jibril:
        </p>
        <p>
          Hadis Riwayat Muslim (No. 8) Dari Umar bin Khattab radhiyallahu 'anhu,
          ia berkata: Suatu hari kami duduk bersama Rasulullah ﷺ, lalu datang
          seorang laki-laki berpakaian sangat putih dan berambut sangat hitam
          (Jibril). Ia bertanya: "Wahai Muhammad, kabarkan kepadaku tentang
          iman." Rasulullah ﷺ menjawab:
        </p>
        <p>
          "Iman adalah engkau beriman kepada Allah, malaikat-malaikat-Nya,
          kitab-kitab-Nya, rasul-rasul-Nya, hari akhir, dan engkau beriman
          kepada takdir yang baik maupun yang buruk."
        </p>
        <p>
          Hadis ini secara eksplisit menyebutkan urutan rukun iman yang menjadi
          dasar keyakinan umat Islam.
        </p>
      </div>
      {/* Tombol Sticky */}
      <button
        onClick={() => setIsModalReferensiVisible(false)}
        className={`p-3 w-full rounded-xl mt-4 sticky bottom-0  z-10 bg-[#F59D09] text-[#FFF1DA]`}
      >
        Selesai Membaca
      </button>
    </div>
  );
};

export default PageSatu;
