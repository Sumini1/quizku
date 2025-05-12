import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../Reducer/subcategory";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineError, MdInfo } from "react-icons/md";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.subcategory);
  const userId = localStorage.getItem("id");
  const location = useLocation();
  const { middleTheme, getIconColorAlert } = useTheme();
  const { id } = useParams();
  const difficultyId = location.state?.difficultyId; // ambil dari state navigasi

  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [subcategoryProgress, setSubcategoryProgress] = useState({});

  // Mendapatkan data dari state navigasi (dikirim dari PilihCategory)
  const categoryDetails = location.state?.categoryDetails;

  useEffect(() => {
    if (userId && difficultyId) {
      dispatch(fetchSubcategory({ userId, difficultyId }));
    }
  }, [dispatch, userId, difficultyId]);

  // Buat generate progress yang konsisten setelah data dimuat
  useEffect(() => {
    if (data && data.length > 0) {
      // Cek apakah progress sudah ada di localStorage
      const savedProgress = localStorage.getItem("subcategoryProgress");

      // Jika sudah ada, gunakan data yang tersimpan
      if (savedProgress) {
        setSubcategoryProgress(JSON.parse(savedProgress));
      } else {
        // Jika belum ada, buat data baru dan simpan di localStorage
        const progressData = {};

        data.forEach((category) => {
          if (category.subcategories) {
            category.subcategories.forEach((subcategory) => {
              if (
                subcategory.progress === undefined &&
                subcategory.themes_or_levels?.length > 0
              ) {
                const total = subcategory.themes_or_levels.length;
                // Gunakan id subcategory sebagai seed untuk deterministic random
                const seed = parseInt(
                  subcategory.id
                    .toString()
                    .split("")
                    .map((char) => char.charCodeAt(0))
                    .join("")
                    .slice(0, 8)
                );
                const seedRandom = ((seed * 9301 + 49297) % 233280) / 233280;
                const completed = Math.floor(seedRandom * (total + 1));

                progressData[subcategory.id] = Math.round(
                  (completed / total) * 100
                );
              }
            });
          }
        });

        // Simpan ke localStorage
        localStorage.setItem(
          "subcategoryProgress",
          JSON.stringify(progressData)
        );
        setSubcategoryProgress(progressData);
      }
    }
  }, [data]);

  const handleBack = () => {
    navigate(-1);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Function untuk menentukan warna progress bar berdasarkan persentase
  const getProgressColor = (percentage) => {
    if (percentage > 75) return "bg-green-500"; // Hijau untuk di atas 75%
    if (percentage > 50) return "bg-blue-500"; // Biru untuk 50-75%
    return "bg-yellow-500"; // Kuning untuk di bawah 50%
  };

  // Function to generate progress for subcategory
  const getProgressForSubcategory = (subcategory) => {
    // If there are no themes, return null to indicate no progress to show
    if (
      !subcategory.themes_or_levels ||
      subcategory.themes_or_levels.length === 0
    ) {
      return null;
    }

    // Use progress from API if available
    if (subcategory.progress !== undefined) return subcategory.progress;

    // Otherwise use our generated consistent progress
    return subcategoryProgress[subcategory.id] || 0;
  };

  // Function to handle subcategory click
  const handleSubcategoryClick = (subcategory) => {
    if (
      subcategory.themes_or_levels &&
      subcategory.themes_or_levels.length > 0
    ) {
      // Arahkan ke halaman detail tema/level
      navigate(`/theme-detail/${subcategory.id}`, {
        state: {
          subcategoryDetails: subcategory,
          difficultyId,
        },
      });
    } else {
      // Tampilkan popup jika tidak ada tema
      setPopupMessage("Mohon maaf belum ada tema tersedia");
      setShowPopup(true);
    }
  };

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
            {categoryDetails?.name || "Materi Pembelajaran"}
          </h1>
        </div>
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && (
          <div className="">
            {data.map((category) => (
              <div
                key={category.id}
                className="p-3 text-lg font-semibold flex flex-col gap-1"
              >
                <div className="flex items-center gap-1">
                  <h2> {category.name}</h2>
                  <MdOutlineError className={`${getIconColorAlert()}`} />
                </div>
                <div>
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-col gap-2 pb-4">
                          {category.subcategories.map((subcategory) => {
                            const progress =
                              getProgressForSubcategory(subcategory);
                            const hasThemes =
                              subcategory.themes_or_levels &&
                              subcategory.themes_or_levels.length > 0;
                            const progressColor =
                              progress !== null
                                ? getProgressColor(progress)
                                : "";

                            return (
                              <div
                                key={subcategory.id}
                                className="cursor-pointer"
                                onClick={() =>
                                  handleSubcategoryClick(subcategory)
                                }
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

                                  {/* Progress bar - only show if there are themes */}
                                  {hasThemes && progress !== null && (
                                    <div className="mt-2">
                                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                          className={`${getProgressColor(
                                            progress
                                          )} h-2.5 rounded-full`}
                                          style={{ width: `${progress}%` }}
                                        ></div>
                                      </div>
                                      <div className="flex justify-end mt-1">
                                        <span className="text-xs text-gray-500">
                                          {progress > 0 && progress < 25
                                            ? "Baru memulai"
                                            : progress >= 25 && progress < 100
                                            ? `${progress}%`
                                            : progress >= 100
                                            ? "Selesai dikerjakan"
                                            : "Belum dikerjakan"}
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Show certificate option only if progress is 100% */}
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
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
