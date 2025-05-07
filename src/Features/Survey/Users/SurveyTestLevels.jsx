import React, { useState } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../pages/QuestionStatic/Reducer/modalSlice";

const SurveyTestLevels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    theme,
    getButtonClassListCategory,
    getBorderClass,
    getBorder,
    middleTheme,
  } = useTheme();
  const [selectTingkatan, setSelectTingkatan] = useState(null);

  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/page-dua"); // Pindah ke halaman 2
  };

  const handleSelectTingkatan = (tingkatanId) => {
    setSelectTingkatan(tingkatanId);
  };

  const tingkatan = [
    { id: 1, tingkatan: "Pemula", route: "/page-satu" },
    { id: 2, tingkatan: "Dasar", route: "/list-category-dasar" },
    { id: 3, tingkatan: "Menengah", route: "/list-category-menengah" },
    {
      id: 4,
      tingkatan: "Menengah Lanjutan",
      route: "/list-category-menengah-lanjutan",
    },
    { id: 5, tingkatan: "Lanjutan", route: "/list-category-lanjutan" },
    {
      id: 6,
      tingkatan: "Lanjutan Tinggi",
      route: "/list-category-lanjutan-tinggi",
    },
    { id: 7, tingkatan: "Ahli", route: "/list-category-ahli" },
    {
      id: 8,
      tingkatan: "Makhluk Allah",
      route: "/list-category-makhluk-allah",
    },
  ];

  // Mendapatkan rute berdasarkan tingkatan yang dipilih
  const selectedRoute =
    tingkatan.find((tingkat) => tingkat.id === selectTingkatan)?.route || "#";

  return (
    <div className="flex flex-col w-full mx-auto h-screen overflow-hidden md:p-0">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-auto flex flex-col justify-between ${middleTheme()}  relative`}
      >
        <div className="flex flex-col mt-5 mx-5">
          <h1 className="text-xl font-semibold">Tes Pengetahuan Islam</h1>
          <h2 className="text-lg font-medium mt-3 mb-2">Mulai</h2>
          <p className="text-md ">Pilih tingkatan level</p>
        </div>
        <form action="" className="mx-5 mt-3">
          <div>
            {tingkatan.map((tingkat) => (
              <button
                key={tingkat.id}
                type="button"
                onClick={() => handleSelectTingkatan(tingkat.id)}
                className={` w-full text-left rounded-xl p-3 pl-4  mb-4 border-[2px]  ${getButtonClassListCategory(
                  selectTingkatan === tingkat.id
                )}`}
              >
                {tingkat.tingkatan}
              </button>
            ))}
            <div className=" mt-5">
              <p className="text-sm">
                * Pilihan level tidak mempengaruhi apapun. Hanya untuk mengukur
                kemampuan diri.
              </p>
            </div>
            <div className="flex justify-center items-center mt-7">
              <Link to={selectedRoute} className="w-full">
                <button
                  onClick={handleClick}
                  type="button"
                  className={`p-3 mb-10 w-full  border-none rounded-xl ${getBorderClass()} ${
                    selectTingkatan
                      ? theme === "dark"
                        ? "bg-gray-800 text-white "
                        : theme === "cupcake"
                        ? "bg-pink-500 text-white border-[#FFE6FA]   "
                        : theme === "bumblebee"
                        ? "bg-yellow-500 text-white "
                        : theme === "lemonade"
                        ? "bg-[#027A7D] text-white "
                        : "bg-[hsl(218,93%,50%)] text-white  "
                      : "bg-[#0961F5] text-[#0961F5]   "
                  }`}
                  disabled={!selectTingkatan}
                >
                  Tes Sekarang
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyTestLevels;
