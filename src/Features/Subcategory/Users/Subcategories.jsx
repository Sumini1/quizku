import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../Reducer/subcategory";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineError, MdInfo } from "react-icons/md";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";

const Subcategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.subcategory);
  const location = useLocation();
  const { middleTheme, getIconColorAlert, getBorder, getButtonClass } =
    useTheme();
  const { id } = useParams(); // This should be categories_id

  // Get data from navigation state
  const categoryDetails = location.state?.categoryDetails;
  const difficultyId = location.state?.difficultyId;

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [viewingThemes, setViewingThemes] = useState(false);
  const [subcategoryProgress, setSubcategoryProgress] = useState({});

  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (difficultyId) {
      dispatch(fetchSubcategory(difficultyId));
    }
  }, [dispatch, difficultyId]);

  useEffect(() => {
    // Load progress from localStorage when component mounts
    const savedProgress = localStorage.getItem("subcategoryProgress");
    if (savedProgress) {
      try {
        setSubcategoryProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error("Error parsing saved progress", error);
      }
    }
  }, []);

  useEffect(() => {
    // Generate progress values once when data is loaded
    if (data && data.length > 0) {
      const currentCategory = data.find(
        (cat) => cat.categories_id === parseInt(id)
      );

      if (currentCategory?.subcategories_progress) {
        const progressData = { ...subcategoryProgress };

        currentCategory.subcategories_progress.forEach((subcategory) => {
          if (!progressData[subcategory.subcategory_id]) {
            // Calculate progress based on themes_with_progress
            const totalThemes = subcategory.themes_with_progress?.length || 0;
            if (totalThemes > 0) {
              const completedThemes = subcategory.themes_with_progress.filter(
                (theme) => theme.user_has_theme_progress
              ).length;
              progressData[subcategory.subcategory_id] = Math.round(
                (completedThemes / totalThemes) * 100
              );
            } else {
              progressData[subcategory.subcategory_id] = 0;
            }
          }
        });

        setSubcategoryProgress(progressData);
        localStorage.setItem(
          "subcategoryProgress",
          JSON.stringify(progressData)
        );
      }
    }
  }, [data, id, subcategoryProgress]);

  const handleBack = () => {
    if (viewingThemes) {
      setViewingThemes(false);
      setSelectedSubcategory(null);
    } else {
      navigate(-1);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Find current category based on the ID from URL params
  const currentCategory =
    data?.find((cat) => cat.categories_id === parseInt(id)) || null;

  const getProgressColor = (percentage) => {
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-green-500";
    return "bg-yellow-500";
  };

  const getProgressForSubcategory = (subcategory) => {
    if (
      !subcategory.themes_with_progress ||
      subcategory.themes_with_progress.length === 0
    ) {
      return null;
    }

    // Use calculated progress or default to 0
    return subcategoryProgress[subcategory.subcategory_id] || 0;
  };

  const handleSubcategoryClick = (subcategory) => {
    if (
      subcategory.themes_with_progress &&
      subcategory.themes_with_progress.length > 0
    ) {
      setSelectedSubcategory(subcategory);
      setViewingThemes(true);
    } else {
      setPopupMessage("Mohon maaf belum ada tema tersedia");
      setShowPopup(true);
    }
  };

  const handleThemeClick = (theme) => {
    navigate(`/theme-detail/${theme.theme_id}`, {
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
              ? `Tema: ${selectedSubcategory?.subcategory_name}`
              : `Kategori ${currentCategory?.categories_name}` ||
                "Materi Pembelajaran"}
          </h1>
        </div>

        {/* Content */}
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && (
          <div>
            {!viewingThemes ? (
              currentCategory?.subcategories_progress?.length > 0 ? (
                <div className="mt-3 flex flex-col gap-3">
                  {currentCategory.subcategories_progress.map((subcategory) => {
                    const progress = getProgressForSubcategory(subcategory);
                    const hasThemes =
                      subcategory.themes_with_progress?.length > 0;
                    const progressColor =
                      progress !== null ? getProgressColor(progress) : "";

                    return (
                      <div
                        key={subcategory.subcategory_id}
                        className="cursor-pointer"
                        onClick={() => handleSubcategoryClick(subcategory)}
                      >
                        <div className="flex flex-col border-2 rounded-xl p-3">
                          <div className="flex justify-between items-center">
                            <h3 className="text-base font-medium">
                              {subcategory.subcategory_name}
                            </h3>
                            <MdOutlineError
                              className={`${getIconColorAlert()}`}
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-600 mt-1">
                            {hasThemes
                              ? `${subcategory.themes_with_progress.length} tema`
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
            ) : // Display themes for selected subcategory
            selectedSubcategory?.themes_with_progress?.length > 0 ? (
              <div className="flex flex-col gap-3 mt-3">
                {selectedSubcategory.themes_with_progress.map((theme) => {
                  const totalUnits = theme.theme_total_units?.length || 0;
                  const completedUnits = Object.keys(
                    theme.user_theme_complete_unit || {}
                  ).length;
                  const progressPercentage =
                    totalUnits > 0
                      ? Math.round((completedUnits / totalUnits) * 100)
                      : 0;

                  return (
                    <div
                      key={theme.theme_id}
                      className="border-2 rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleThemeClick(theme)}
                    >
                      <h3 className="font-medium">{theme.theme_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {theme.theme_short_description}
                      </p>

                      {totalUnits > 0 && (
                        <div className="mt-2 flex items-center">
                          <span className="text-sm text-blue-600">
                            {totalUnits} Unit
                          </span>
                          <div className="ml-auto">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {progressPercentage}%
                            </span>
                          </div>
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

export default Subcategories;
