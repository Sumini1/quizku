// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import Confetti from "react-confetti";
// import { useTheme } from "../../../Context/ThemeContext";
// import { HiBadgeCheck } from "react-icons/hi";
// import { MdFactCheck } from "react-icons/md";
// import { FaHourglassEnd } from "react-icons/fa6";
// import { RiCoinFill } from "react-icons/ri";
// import { MdOutlineError } from "react-icons/md";
// import { FaArrowRight } from "react-icons/fa6";

// const FinalScoredEvaluationSatu = () => {
//   const {
//     theme,
//     getIconTheme,
//     getBorderColor,
//     getIconColorAlert,
//     middleTheme,
//   } = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [score, setScore] = useState(0);
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [totalTime, setTotalTime] = useState(0);
//   const [celebrationMessage, setCelebrationMessage] = useState("");
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     // Check if state was passed from the quiz page
//     if (location.state) {
//       const { score, totalQuestions, timeTaken } = location.state;
//       setScore(score);
//       setTotalQuestions(totalQuestions);
//       setTotalTime(timeTaken);

//       setCelebrationMessage(
//         "🎉 Selamat! Anda telah menyelesaikan tes dengan sukses! 🎉"
//       );
//       setTimeout(() => setShowConfetti(false), 8000);
//     } else {
//       // Redirect if no quiz result data
//       navigate("/beranda");
//     }
//   }, [location.state, navigate]);

//   const formatTime = (time) => {
//     if (time < 60) {
//       // Jika kurang dari 60 detik, tampilkan dalam detik
//       return `${time} detik`;
//     } else {
//       // Jika 60 detik atau lebih, tampilkan dalam menit
//       const minutes = Math.floor(time / 60);
//       const seconds = time % 60;

//       if (seconds === 0) {
//         return `${minutes} menit`;
//       } else {
//         return `${minutes} menit ${seconds} detik`;
//       }
//     }
//   };

//   const calculatePercentage = () => {
//     return ((score / totalQuestions) * 100).toFixed(0);
//   };

//   const items = [
//     {
//       id: 1,
//       title: "Point Diperoleh",
//       icon: <MdFactCheck className="text-xl" />,
//       value: `${calculatePercentage()} %`,
//     },
//     {
//       id: 2,
//       title: "Waktu",
//       icon: <FaHourglassEnd className="text-xl" />,
//       value: formatTime(totalTime),
//     },
//   ];

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     navigate("/test/data-diri-lanjutan");
//   };

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   return (
//     <>
//       <div className="flex justify-center w-full h-full min-h-screen">
//         <div
//           className={`flex flex-col flex-grow max-w-md w-full ${middleTheme()}`}
//         >
//           {showConfetti && <Confetti />}
//           <div className="flex flex-col p-5 bg-[#DCE6F8]">
//             <div className="flex gap-2">
//               <h2 className="text-base font-semibold mb-2">
//                 Hanya dengan Rp. 10.000
//               </h2>
//               <MdOutlineError className={`${getIconColorAlert()}`} />
//             </div>
//             <p>
//               Kontribusi dalam
//               <span className="text-base font-semibold ml-1">
//                 {" "}
//                 pembuatan satu soal{" "}
//               </span>
//               untuk
//               <span className="text-base font-semibold ml-1 mr-1">
//                 {" "}
//                 mewujudkan pendidikan islam gratis{" "}
//               </span>
//               kaum muslimin dan umum.
//             </p>
//           </div>
//           {/* Content */}
//           <div className="flex flex-col p-5 ">
//             <h1 className="text-xl font-medium mb-4 ">
//               Alhamdulillah Tes Pengetahuan Islam Selesai
//             </h1>
//             <p className="text-md font-medium mb-7">
//               "Bersyukurlah atas segala apa yang Allah ta'ala berikan"
//             </p>
//             <div className="flex justify-center items-center h-full">
//               <div className="grid grid-cols-2 gap-5 md:mt-16">
//                 {items.map((item) => (
//                   <div
//                     key={item.id}
//                     className={`border ${getBorderColor()} p-4 flex flex-col items-center justify-between rounded-lg shadow-md w-[120px] h-[140px]`}
//                   >
//                     <div className="flex items-center justify-center gap-3">
//                       <h1 className="text-3xl text-[#F59D09]">
//                         {React.cloneElement(item.icon, {
//                           className: "w-6 h-6",
//                         })}
//                       </h1>
//                     </div>
//                     <p className="text-sm font-medium text-center mt-2">
//                       {item.value}
//                     </p>
//                     <h1
//                       className={`text-sm font-medium text-center mt-3 ${
//                         item.id === 2 ? "mt-5" : item.id === 3 ? "mt-8" : ""
//                       }`}
//                     >
//                       {item.title}
//                     </h1>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col fixed bottom-0 p-5 max-w-md justify-center items-center gap-4 mt-20 w-full mx-auto">
//             <Link to="/ulasan-soal" className="w-full">
//               <button className="p-3 rounded-xl w-full text-white bg-[#F59D09]">
//                 Ulasan
//               </button>
//             </Link>
//             <button
//               onClick={handleOpenModal}
//               className="p-3 rounded-xl w-full text-white bg-[#0961F5]"
//             >
//               Lanjut
//             </button>
//           </div>
//           {isModalOpen && (
//             <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
//               {/* Overlay redup */}
//               <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

//               {/* Modal utama */}
//               <div className="bg-[#DCFFD9] p-5 rounded-xl flex flex-col w-[350px] items-center gap-4 z-10 relative">
//                 <HiBadgeCheck className="text-7xl text-[#28A745]" />
//                 <p className="text-lg font-semibold">Mulai Tahapan Belajar</p>
//                 <div className="flex flex-col">
//                   <p className="text-center mb-2"> Setelah ini akan memilih</p>
//                   <p className="flex flex-wrap justify-center text-center gap-1 items-center text-base font-medium">
//                     Tingkat <FaArrowRight /> <span>Kategory</span>{" "}
//                     <FaArrowRight /> <span>Tema</span> <FaArrowRight />{" "}
//                     <span>Pelajaran</span> <FaArrowRight /> <span>Materi</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={handleCloseModal}
//                   className="p-3 w-full rounded-xl text-white bg-[#28A745]"
//                 >
//                   Lanjut
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default FinalScoredEvaluationSatu;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useTheme } from "../../../Context/ThemeContext";
import { HiBadgeCheck } from "react-icons/hi";
import { MdFactCheck } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa6";
import { RiCoinFill } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

const FinalScoredEvaluationSatu = () => {
  const {
    theme,
    getIconTheme,
    getBorderColor,
    getIconColorAlert,
    middleTheme,
  } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if state was passed from the quiz page
    if (location.state) {
      const { score, totalQuestions, timeTaken } = location.state;
      setScore(score);
      setTotalQuestions(totalQuestions);
      setTotalTime(timeTaken);

      setCelebrationMessage(
        "🎉 Selamat! Anda telah menyelesaikan tes dengan sukses! 🎉"
      );
      setTimeout(() => setShowConfetti(false), 8000);
    } else {
      // Redirect if no quiz result data
      navigate("/beranda");
    }
  }, [location.state, navigate]);

  const formatTime = (time) => {
    if (time < 60) {
      // Jika kurang dari 60 detik, tampilkan dalam detik
      return `${time} detik`;
    } else {
      // Jika 60 detik atau lebih, tampilkan dalam menit
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      if (seconds === 0) {
        return `${minutes} menit`;
      } else {
        return `${minutes} menit ${seconds} detik`;
      }
    }
  };

  const calculatePercentage = () => {
    return ((score / totalQuestions) * 100).toFixed(0);
  };

  const items = [
    {
      id: 1,
      title: "Point Diperoleh",
      icon: <MdFactCheck className="text-xl" />,
      value: `${calculatePercentage()} %`,
    },
    {
      id: 2,
      title: "Waktu",
      icon: <FaHourglassEnd className="text-xl" />,
      value: formatTime(totalTime),
    },
  ];

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // Opsi 1: Dari location state (jika dikirim dari halaman sebelumnya)
    const themeId =
      location.state?.themeId ||
      // Opsi 2: Dari localStorage
      localStorage.getItem("selectedThemeId") ||
      // Opsi 3: Berdasarkan score performance
      getThemeIdBasedOnScore() ||
      // Opsi 4: Default fallback
      "1";

    navigate(`/tema-belajar/${themeId}`);
  };

  // Helper function untuk menentukan themeId berdasarkan score
  const getThemeIdBasedOnScore = () => {
    const percentage = calculatePercentage();
    if (percentage >= 80) return "advanced"; // Tema lanjutan
    if (percentage >= 60) return "intermediate"; // Tema menengah
    return "basic"; // Tema dasar
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-center w-full h-full min-h-screen">
        <div
          className={`flex flex-col flex-grow max-w-md w-full ${middleTheme()}`}
        >
          {showConfetti && <Confetti />}
          <div className="flex flex-col p-5 bg-[#DCE6F8]">
            <div className="flex gap-2">
              <h2 className="text-base font-semibold mb-2">
                Hanya dengan Rp. 10.000
              </h2>
              <MdOutlineError className={`${getIconColorAlert()}`} />
            </div>
            <p>
              Kontribusi dalam
              <span className="text-base font-semibold ml-1">
                {" "}
                pembuatan satu soal{" "}
              </span>
              untuk
              <span className="text-base font-semibold ml-1 mr-1">
                {" "}
                mewujudkan pendidikan islam gratis{" "}
              </span>
              kaum muslimin dan umum.
            </p>
          </div>
          {/* Content */}
          <div className="flex flex-col p-5 ">
            <h1 className="text-xl font-medium mb-4 ">
              Alhamdulillah Tes Pengetahuan Islam Selesai
            </h1>
            <p className="text-md font-medium mb-7">
              "Bersyukurlah atas segala apa yang Allah ta'ala berikan"
            </p>
            <div className="flex justify-center items-center h-full">
              <div className="grid grid-cols-2 gap-5 md:mt-16">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`border ${getBorderColor()} p-4 flex flex-col items-center justify-between rounded-lg shadow-md w-[120px] h-[140px]`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <h1 className="text-3xl text-[#F59D09]">
                        {React.cloneElement(item.icon, {
                          className: "w-6 h-6",
                        })}
                      </h1>
                    </div>
                    <p className="text-sm font-medium text-center mt-2">
                      {item.value}
                    </p>
                    <h1
                      className={`text-sm font-medium text-center mt-3 ${
                        item.id === 2 ? "mt-5" : item.id === 3 ? "mt-8" : ""
                      }`}
                    >
                      {item.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col fixed bottom-0 p-5 max-w-md justify-center items-center gap-4 mt-20 w-full mx-auto">
            <Link to="/ulasan-soal" className="w-full">
              <button className="p-3 rounded-xl w-full text-white bg-[#F59D09]">
                Ulasan
              </button>
            </Link>
            <button
              onClick={handleOpenModal}
              className="p-3 rounded-xl w-full text-white bg-[#0961F5]"
            >
              Lanjut
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
              {/* Overlay redup */}
              <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

              {/* Modal utama */}
              <div className="bg-[#DCFFD9] p-5 rounded-xl flex flex-col w-[350px] items-center gap-4 z-10 relative">
                <HiBadgeCheck className="text-7xl text-[#28A745]" />
                <p className="text-lg font-semibold">Mulai Tahapan Belajar</p>
                <div className="flex flex-col">
                  <p className="text-center mb-2"> Setelah ini akan memilih</p>
                  <p className="flex flex-wrap justify-center text-center gap-1 items-center text-base font-medium">
                    Tingkat <FaArrowRight /> <span>Kategory</span>{" "}
                    <FaArrowRight /> <span>Tema</span> <FaArrowRight />{" "}
                    <span>Pelajaran</span> <FaArrowRight /> <span>Materi</span>
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-3 w-full rounded-xl text-white bg-[#28A745]"
                >
                  Lanjut
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FinalScoredEvaluationSatu;
