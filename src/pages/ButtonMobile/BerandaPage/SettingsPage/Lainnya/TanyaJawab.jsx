import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useTheme } from "../../../../../Context/ThemeContext";

const TanyaJawab = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const { getThemeModalCategory, getBorderColor, getBorder, middleTheme } =
    useTheme();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questionsData = [
    {
      id: 1,
      question: "Bagi pemula tingkat mana yang sebaiknya dipilih?",
      answer:
        "Mengimani rukun iman harus sesuai dalil dari Al-Qur’an dan Sunnah...",
    },
    {
      id: 2,
      question: "Cara menyikapi rukun iman bagi muslim?",
      answer:
        "Mengimani rukun iman harus sesuai dalil dari Al-Qur’an dan Sunnah sebab agama Islam dibangun dari tawaqquf, yaitu seluruh ibadah membutuhkan dalil. Rukun iman merupakan salah satu ibadah yang paling agung karena berisi pondasi keimanan.",
    },
    {
      id: 3,
      question:
        "Apa pentingnya memahami rukun iman dalam kehidupan sehari-hari?",
      answer: "Rukun iman merupakan salah satu ibadah yang paling agung...",
    },
  ];

  const information = [
    { id: 1, name: "Semua", route: "/semua" },
    { id: 2, name: "Pengingat", route: "/pengingat" },
    { id: 3, name: "Informasi", route: "/informasi" },
    { id: 4, name: "Iklan", route: "/iklan" },
    { id: 5, name: "Umum", route: "/umum" },
  ];
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Tanya Jawab</h1>
        </div>

        {/* Mapping name */}
        <div className="overflow-x-auto whitespace-nowrap pb-4 flex gap-3 px-4  scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
          {information.map((item) => (
            <Link
              to={item.route}
              key={item.id}
              className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                item.id === 1 && "bg-[hsl(218,93%,50%)] text-white"
              }`}
            >
              <h5 className="font-normal text-sm">{item.name}</h5>
            </Link>
          ))}
        </div>

        <div className="px-4 flex flex-col gap-4 mt-3">
          {questionsData.map((item, index) => (
            <div key={item.id} className="border   rounded-xl">
              <div
                onClick={() => toggleAccordion(index)}
                className={`flex justify-between items-center p-4 cursor-pointer border-[1px] bg-white  ${getBorderColor()} ${
                  activeIndex === index
                    ? "rounded-t-xl rounded-b-none"
                    : "rounded-xl"
                }`}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="text-md font-medium w-6 -mt-5">
                    {item.id}.
                  </span>
                  <p className="text-md font-[400] flex-1 m">{item.question}</p>
                </div>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-500 -mt-4" />
                ) : (
                  <FaChevronDown className="text-gray-500 -mt-4" />
                )}
              </div>
              {activeIndex === index && (
                <div
                  className={`p-4  text-base font-[300] rounded-b-xl border-[1px] ${getBorderColor()} ${getThemeModalCategory()}`}
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TanyaJawab;
