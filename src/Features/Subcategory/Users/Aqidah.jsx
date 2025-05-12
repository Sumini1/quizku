import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../Reducer/subcategory";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineError, MdInfo } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";

const Aqidah = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.subcategory);
  const userId = localStorage.getItem("id");
  const location = useLocation();
  const { middleTheme, getIconColorAlert, getBorder, getButtonClass } =
    useTheme();
  const { id } = useParams();
  const difficultyId = location.state?.difficultyId;

  const categoryDetails = location.state?.categoryDetails;

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [viewingThemes, setViewingThemes] = useState(false);
  const [subcategoryProgress, setSubcategoryProgress] = useState({});

  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (userId && difficultyId) {
      dispatch(fetchSubcategory({ userId, difficultyId }));
    }
  }, [dispatch, userId, difficultyId]);

  useEffect(() => {
    // Generate progress values once when data is loaded
    if (data && data.length > 0) {
      const currentCategory =
        data.find((cat) => cat.id === categoryDetails?.id) || null;
      if (currentCategory?.subcategories) {
        const progressData = { ...subcategoryProgress }; // Pertahankan nilai yang sudah ada

        currentCategory.subcategories.forEach((subcategory) => {
          // Hanya buat progress jika belum ada di state
          if (
            subcategory.progress === undefined &&
            subcategory.themes_or_levels?.length > 0 &&
            !progressData[subcategory.id] // Tambahkan pengecekan ini
          ) {
            const total = subcategory.themes_or_levels.length;
            // Gunakan ID subcategory sebagai seed untuk random yang konsisten
            const seed = parseInt(
              subcategory.id.toString().replace(/[^0-9]/g, "") || "1"
            );
            if (!progressData[subcategory.id]) {
              progressData[subcategory.id] = 0;
            }

          } else if (subcategory.progress !== undefined) {
            // Gunakan progress yang sudah ada dari data jika tersedia
            progressData[subcategory.id] = subcategory.progress;
          }
        });

        setSubcategoryProgress(progressData);

        // Simpan ke localStorage untuk persistensi
        localStorage.setItem(
          "subcategoryProgress",
          JSON.stringify(progressData)
        );
      }
    }
  }, [data, categoryDetails]);

  // Tambahkan useEffect untuk memuat progress dari localStorage saat komponen mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("subcategoryProgress");
    if (savedProgress) {
      try {
        setSubcategoryProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error("Error parsing saved progress", error);
      }
    }
  }, []);

  const handleBack = () => {
    if (viewingThemes) {
      setViewingThemes(false);
      setSelectedSubcategory(null);
    } else {
      navigate(-1);
    }
  };

  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const currentCategory =
    data?.find((cat) => cat.id === categoryDetails?.id) || null;

  const getProgressColor = (percentage) => {
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-green-500";
    return "bg-yellow-500";
  };

  const getProgressForSubcategory = (subcategory) => {
    if (
      !subcategory.themes_or_levels ||
      subcategory.themes_or_levels.length === 0
    ) {
      return null;
    }

    if (subcategory.progress !== undefined) return subcategory.progress;

    return subcategoryProgress[subcategory.id] || 0;
  };

  const handleSubcategoryClick = (subcategory) => {
    if (
      subcategory.themes_or_levels &&
      subcategory.themes_or_levels.length > 0
    ) {
      setSelectedSubcategory(subcategory);
      setViewingThemes(true);
    } else {
      // Tampilkan popup alih-alih navigasi
      setPopupMessage("Mohon maaf belum ada tema tersedia");
      setShowPopup(true);
    }
  };

  const handleThemeClick = (theme) => {
    navigate(`/theme-detail/${theme.id}`, {
      state: {
        themeDetails: theme,
        subcategoryDetails: selectedSubcategory,
        difficultyId,
      },
    });
  };

  const [activeTab, setActiveTab] = useState("materi");
  const tabs = [
    {
      id: "materi",
      icon: <MdOutlineFormatListBulleted className="w-[20px] h-[20px]" />,
    },
    {
      id: "informasi",
      icon: <HiInformationCircle className="w-[20px] h-[20px]" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <MdInfo size={60} className="text-gray-400 mb-4" />
              <p className="text-gray-600 mb-6">{popupMessage}</p>
              <button
                onClick={handleClosePopup}
                className="bg-blue-500 text-white rounded-lg px-6 py-2 font-medium hover:bg-blue-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`py-2 flex flex-col px-5 flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        {/* Header */}
        <div className="flex items-center mb-4 mt-2">
          <button onClick={handleBack} className="mr-2">
            <FaArrowLeft className="2xl" />
          </button>
          <h1 className="text-xl font-semibold">
            {viewingThemes
              ? `Tema: ${selectedSubcategory?.name}`
              : `Kategori ${categoryDetails?.name}` || "Materi Pembelajaran"}
          </h1>
        </div>

        <div>
          {!viewingThemes &&
            currentCategory?.themes_or_levels?.map((theme) => (
              <div key={theme.id}>
                <p>{theme.name}</p>
              </div>
            ))}
        </div>

        {/* Content */}
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && (
          <div>
            {!viewingThemes ? (
              currentCategory?.subcategories?.length > 0 ? (
                <div className="mt-3 flex flex-col gap-3">
                  {currentCategory.subcategories.map((subcategory) => {
                    const progress = getProgressForSubcategory(subcategory);
                    const hasThemes = subcategory.themes_or_levels?.length > 0;
                    const progressColor =
                      progress !== null ? getProgressColor(progress) : "";

                    return (
                      <div
                        key={subcategory.id}
                        className="cursor-pointer"
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        <div className="flex flex-col border-2 rounded-xl p-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-base font-medium">
                              {subcategory.name}
                            </h3>
                            <MdOutlineError
                              className={`${getIconColorAlert()}`}
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-600 mt-1">
                            {hasThemes
                              ? `${subcategory.themes_or_levels.length} tema`
                              : "Belum ada tema"}
                          </p>

                          {hasThemes && progress !== null && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`${progressColor} h-2.5 rounded-full`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-gray-500">
                                  {progress > 0 && progress < 100
                                    ? `${progress}%`
                                    : progress >= 100
                                    ? "Selesai dikerjakan"
                                    : "Belum dikerjakan"}
                                </span>
                              </div>
                            </div>
                          )}

                          {hasThemes && progress === 100 && (
                            <div className="flex justify-between mt-1">
                              <span className="text-sm text-gray-600">
                                Selesai dikerjakan
                              </span>
                              <span className="text-sm text-blue-500">
                                Sertifikat
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-20">
                  <MdInfo size={60} className="text-gray-400 mb-4" />
                  <p className="text-gray-600">
                    Tidak ada subkategori untuk kategori ini
                  </p>
                </div>
              )
            ) : // function untuk menampilkan subkategori atau tema
            selectedSubcategory?.themes_or_levels?.length > 0 ? (
              <div className="flex flex-col gap-3 mt-3">
                {selectedSubcategory.themes_or_levels.map((theme) => {
                  console.log("Theme ID:", theme.id);
                  console.log("total_unit:", theme.total_unit);
                  console.log("complete_unit:", theme.complete_unit);

                  return (
                    <div
                      key={theme.id}
                      className="border-2 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleThemeClick(theme)}
                    >
                      <h3 className="font-medium">{theme.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {theme.description_short}
                      </p>

                      {Array.isArray(theme.total_unit) &&
                        theme.total_unit.length > 0 && (
                          <div className="mt-2 flex items-center">
                            <span className="text-sm text-blue-600">
                              {theme.total_unit.length} Unit
                            </span>

                            {Array.isArray(theme.complete_unit) && (
                              <div className="ml-auto">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {Math.round(
                                    (theme.complete_unit.length /
                                      theme.total_unit.length) *
                                      100
                                  )}
                                  %
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-20">
                <MdInfo size={60} className="text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Mohon maaf belum ada tema tersedia
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Aqidah;
