import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../Difficulties/Reducer/categories";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";
import { MdOutlineError, MdInfo } from "react-icons/md";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.categories);
  // const userId = localStorage.getItem("id");
  const location = useLocation();
  const { middleTheme, getIconColorAlert, getBorder } = useTheme();
  const { difficultyId } = useParams(); // Ambil difficultyId dari URL params
  
  // State untuk popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Mendapatkan data dari state navigasi (dikirim dari PilihCategory) - optional
  const categoryDetails = location.state?.categoryDetails;
  
  // Fallback difficultyId dari location.state jika tidak ada di params
  const finalDifficultyId = difficultyId || location.state?.difficultyId;

  useEffect(() => {
    if (finalDifficultyId) {
      dispatch(fetchAllCategories(finalDifficultyId));
    } else {
      // Jika tidak ada difficultyId, redirect ke halaman pemilihan difficulty
      // atau fetch semua categories tanpa filter
      console.log("No difficulty ID found, fetching all categories or redirecting");
      // Anda bisa dispatch action untuk fetch semua categories di sini
      // dispatch(fetchAllCategoriesWithoutFilter());
    }
  }, [dispatch, finalDifficultyId]);

  const handleBack = () => {
    navigate(-1);
  };

  // Function to close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Function untuk menangani klik pada kategori
  const handleCategoryClick = (category) => {
    // Arahkan ke halaman subcategories dengan mengirimkan id kategori
    navigate(`/categories-detail/${category.category_id}`, {
      state: {
        categoryDetails: category,
        difficultyId: finalDifficultyId,
      },
    });
  };

  // Function untuk mendapatkan nama difficulty
  const getDifficultyName = () => {
    // Prioritas: categoryDetails > data dari kategori pertama > default
    if (categoryDetails?.difficulty_name) {
      return categoryDetails.difficulty_name;
    }
    
    // Jika ada data kategori, ambil difficulty_name dari kategori pertama
    if (data && data.length > 0 && data[0].difficulty_name) {
      return data[0].difficulty_name;
    }
    
    return "Kategori Populer";
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-sm w-full mx-4 ${middleTheme()}`}
          >
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
          <h1 className="text-xl font-semibold">{getDifficultyName()}</h1>
        </div>

        {status === "loading" && (
          <div className="flex justify-center items-center h-40">
            <p>Loading...</p>
          </div>
        )}

        {status === "succeeded" && (
          <div className="mt-5">
            {data && data.length > 0 ? (
              data.map((category) => (
                <div
                  key={category.category_id}
                  className={`mb-4 bg-white rounded-xl shadow-sm  p-4 cursor-pointer ${getBorder()}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="text-lg font-semibold">
                      {category.category_name}
                    </h2>
                    <MdOutlineError className={`${getIconColorAlert()}`} />
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {category.category_description_short}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {category.category_total_subcategories &&
                      category.category_total_subcategories.length > 0
                        ? `${category.category_total_subcategories[0]} Subkategori`
                        : "0 Subkategori"}
                    </span>
                    <span className="text-sm text-blue-500">
                      Lihat Detail →
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40">
                <MdInfo size={48} className="text-gray-400 mb-3" />
                <p className="text-gray-600 text-center">
                  Tidak ada kategori yang tersedia untuk tingkat kesulitan ini
                </p>
              </div>
            )}
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center justify-center h-40">
            <MdOutlineError size={48} className="text-red-500 mb-3" />
            <p className="text-gray-700 text-center">
              Gagal memuat data kategori. Silakan coba lagi.
            </p>
            <button
              onClick={() => dispatch(fetchAllCategories(finalDifficultyId))}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;