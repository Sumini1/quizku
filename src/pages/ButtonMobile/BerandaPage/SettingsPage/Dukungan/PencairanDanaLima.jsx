import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";

const PencairanDanaLima = () => {
  const navigate = useNavigate();
  const { getIconTheme, getButtonClass, getBorder, getTextTitle1, middleTheme } = useTheme();

  const dana = [
    {
      id: 1,
      name: "Pencairan ke-5",
      price: 1000000.0,
      date: "2 November 2025",
      description:
        "Digunakan untuk pembuatan soal dan materi meliputi pengembangan konten, penelitian materi dan validasi jawaban. ",
    },
    {
      id: 2,
      name: "Pencairan ke-6",
      price: 1000000.0,
      date: "2 November 2025",
      description:
        "Digunakan untuk pembuatan soal dan materi meliputi pengembangan konten, penelitian materi dan validasi jawaban. ",
    },
  ];

  const formatToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="flex flex-col min-h-screen  w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex flex-col p-5">
          <div
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center cursor-pointer "
          >
            <FaArrowLeft className="text-xl" />
            <h1 className="font-semibold text-lg">Pencairan Dana Ke-2</h1>
          </div>
          <div className="flex flex-col gap-2 mt-10 ">
            {dana.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="flex justify-between">
                  <h1 className="text-sm font-medium flex gap-2">
                    {item.id}. <span>{item.name}</span>
                  </h1>
                  <p className="text-xs">{item.date}</p>
                </div>
                <div className="flex flex-col px-[18px] mb-3 mt-1">
                  <h5 className={`text-sm font-medium mb-2 ${getTextTitle1()}`}>
                    {formatToIDR(item.price)}
                  </h5>

                  <p className="text-sm font-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PencairanDanaLima;
