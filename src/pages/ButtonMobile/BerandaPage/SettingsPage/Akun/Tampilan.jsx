import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Tampilan = () => {
  const navigate = useNavigate();
  const { getButtonClass, middleTheme } = useTheme();

  const kotakData = [
    {
      title: "Tema",
      description: "Susunan tata letak dan cara pengguna berinteraksi.",
      image: "/tema.png",
      current: "Clean Grid",
      color: "#0849B6",
      link: "/settings/theme",
    },
    {
      title: "Warna",
      description: "Gabungan warna yang memberikan suasana tertentu.",
      image: "/bendera.png",
      current: "Default",
      color: "#328D8B",
      link: "/warna",
    },
    {
      title: "Icon",
      description:
        "Gambar kecil yang menunjukkan fungsi atau fitur dalam aplikasi.",
      image: "/icon.png",
      current: "Default",
      color: "#79130D",
      link: "/settings/icons",
    },
    {
      title: "Tampilan Lainnya",
      description:
        "Gambar kecil yang menunjukkan fungsi atau fitur dalam aplikasi.",
      image: "/lainnya.png",
      current: "",
      color: "#F59D09",
      link: "/settings/other",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-5"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Tema</h1>
        </div>

        <div className="-mt-3">
          {kotakData.map((kotak, index) => (
            <Link to={kotak.link} key={index}>
              <div
                className={`flex flex-col m-4 gap-3 px-3 p-5 rounded-xl border-[1px]`}
                style={{ borderColor: kotak.color }}
              >
                <h1
                  className="font-medium text-base"
                  style={{ color: kotak.color }}
                >
                  {kotak.title}
                </h1>
                <div className="flex gap-3">
                  <p className="font-normal text-sm">{kotak.description}</p>
                  <img
                    src={kotak.image}
                    alt={kotak.title}
                    className="-mt-8 w-[80px] h-[80px]"
                  />
                </div>
                {kotak.current && (
                  <h1 className="text-sm font-normal">
                    {kotak.title} sekarang :{" "}
                    <span className="font-medium">{kotak.current}</span>
                  </h1>
                )}
              </div>
            </Link>
          ))}
        </div>

        <button
          className={`p-3 rounded-xl m-4 ${getButtonClass()} border-none md:mt-32`}
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default Tampilan;
