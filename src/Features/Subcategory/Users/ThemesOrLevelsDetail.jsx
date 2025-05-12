import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import {
  MdOutlineError,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../../../Components/ListButton/Button";
import category from "../../../assets/category/category.webp";
import informasi from "../../../assets/themes_or_levels/informasi.png"
import sertifikat from "../../../assets/themes_or_levels/certificate.png"
import nilai from "../../../assets/themes_or_levels/nilai.png"
import statistik  from "../../../assets/themes_or_levels/statistik.png"
import donasi from "../../../assets/themes_or_levels/donasi.png"
import profil from "../../../assets/themes_or_levels/profil.png"
import donatur from "../../../assets/themes_or_levels/donatur.png"
import quote from "../../../assets/themes_or_levels/quote.png"

const ThemesOrLevelsDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { middleTheme, getIconColorAlert, getBorder, getButtonClass } =
    useTheme();
  const { subcategoryDetails, difficultyId } = location.state || {};

  const [activeTab, setActiveTab] = useState("belajar");
  const [expandedThemeId, setExpandedThemeId] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const tabs = [
    {
      id: "belajar",
    },
    {
      id: "informasi",
    },
  ];

  const tabsInformasi = [
    {
      id: 1,
      name: "Informasi",
      image: informasi,
    },
    {
      id: 2,
      name: "Sertifikat",
      image: sertifikat,
    },
    {
      id: 3,
      name: "Nilai",
      image: nilai,
    },
    {
      id: 4,
      name: "Statistik",
      image: statistik,
    },
    {
      id: 5,
      name: "Donasi",
      image: donasi,
    },
    {
      id: 6,
      name: "Profil",
      image: profil,
    },
    {
      id: 7,
      name: "Donatur",
      image: donatur,
    },
    {
      id: 8,
      name: "Motivasi",
      image: quote,
    },
  ];

  // Fungsi untuk menangani klik pada ikon
  const handleIconClick = (e, themeId) => {
    e.stopPropagation(); // Mencegah event klik tema utama
    if (expandedThemeId === themeId) {
      setExpandedThemeId(null); // Tutup deskripsi jika sudah terbuka
    } else {
      setExpandedThemeId(themeId); // Buka deskripsi jika belum terbuka
    }
  };

  // Fungsi untuk memilih tema
  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
  };

  // Fungsi untuk navigasi ke tema belajar
  const navigateToTheme = () => {
    if (selectedTheme) {
      const selectedThemeData = subcategoryDetails?.themes_or_levels?.find(
        (theme) => theme.id === selectedTheme
      );

      if (selectedThemeData) {
        navigate(`/tema-belajar/${selectedTheme}`, {
          state: {
            themeDetails: selectedThemeData,
            subcategoryId: id,
          },
        });
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      {/* Section Image */}
      <div
        className={`py-2 flex flex-col flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="relative w-full p-3">
          {/* Gambar full width */}
          <FaArrowLeft
            onClick={handleBack}
            className="text-3xl mb-3 rounded-full p-1 cursor-pointer"
          />
          <img
            src={category}
            alt=""
            className="w-full h-[200px] object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col p-5">
          <h1 className="text-lg font-semibold mb-2">
            Tema : {subcategoryDetails?.name}
          </h1>
          <p className="text-base font-medium">
            Pelajaran yang membahas tentang kajian islam mengenai aqidah dasar.
          </p>
          {/* Tabs */}
          <div className="flex gap-3 text-base font-medium">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center mt-5 text-base font-medium transition-all duration-300 cursor-pointer
                ${
                  activeTab === tab.id
                    ? "text-[#0961F5] underline underline-offset-4"
                    : "bg-transparent"
                }
              `}
              >
                {tab.icon}
                <span>
                  {tab.id
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>

          {/* active tab belajar */}
          {activeTab === "belajar" && (
            <div className="mt-5 flex flex-col gap-5">
              {subcategoryDetails?.themes_or_levels?.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`border-2 flex flex-col p-3 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedTheme === theme.id
                        ? "border-[#0961F5] bg-blue-50"
                        : "border-gray-200"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold">{theme.name}</h2>
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={(e) => handleIconClick(e, theme.id)}
                    >
                      {expandedThemeId === theme.id ? (
                        <MdKeyboardArrowUp
                          className={`${getIconColorAlert()} text-lg`}
                        />
                      ) : (
                        <MdOutlineError
                          className={`${getIconColorAlert()} text-lg`}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-base font-medium">
                    {theme.description_short}
                  </p>

                  {/* Deskripsi panjang yang akan muncul ketika icon diklik */}
                  {expandedThemeId === theme.id && (
                    <div
                      className="mt-1 p-2 bg-gray-50 rounded-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-sm text-gray-700">
                        {theme.description_long}
                      </p>
                    </div>
                  )}

                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {theme.total_unit?.length > 0 && (
                      <div className="flex items-center gap-y-2">
                        <span className="text-xs font-medium">
                          {theme.total_unit.length} Unit
                        </span>
                      </div>
                    )}
                  </p>
                </div>
              ))}

              {/* Button lanjutkan di bagian bawah */}
              <Button
                type="submit"
                onClick={navigateToTheme}
                disabled={!selectedTheme}
                className={`${getButtonClass()} mt-10 w-full bottom-0 ${
                  !selectedTheme ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {selectedTheme ? "Mulai Belajar" : "Pilih Tema Terlebih Dahulu"}
              </Button>
            </div>
          )}

          {/* active tab informasi */}
          {activeTab === "informasi" && (
            <>
              <div className="grid grid-cols-4 gap-5 mt-10 mx-auto w-full max-w-xl">
                {tabsInformasi?.map((tab) => (
                  <div
                    key={tab.id}
                    className="flex flex-col items-center text-center p-4 rounded-lg shadow-md bg-white"
                  >
                    <img
                      src={tab.image}
                      alt={tab.name}
                      className="w-7 h-7 object-contain mb-2"
                    />
                    <p className="text-sm font-medium">{tab.name}</p>
                  </div>
                ))}
              </div>

              {/* Button di luar grid, ditaruh di tengah */}
              <div className="mt-10 flex justify-center md:mt-20 bottom-0 w-full items-center mx-auto">
                <Button
                  type="submit"
                  onClick={() => navigate("/belajar")}
                  className={getButtonClass()}
                >
                  Belajar sekarang
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemesOrLevelsDetails;
