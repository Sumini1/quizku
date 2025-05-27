import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../Context/ThemeContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchCategoriesById } from "../../Difficulties/Reducer/categories";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

const CategoriesDetail = () => {
  const navigate = useNavigate();
  const { middleTheme, getIconColorAlert } = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const categoryId = Number(id);

  // Ambil dari state router jika ada
  const difficultyId = location.state?.difficultyId;
  const categoryDetailsFromState = location.state?.categoryDetails;

  const { data, status, error } = useSelector((state) => state.categories);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Gabungkan logic dalam satu useEffect untuk menghindari race condition
  useEffect(() => {
    const findAndSetCategory = () => {
      if (categoryDetailsFromState) {
        // Jika data sudah ada dari navigasi state
        setSelectedCategory(categoryDetailsFromState);
        setIsLoading(false);
      } else if (
        status === "succeeded" &&
        Array.isArray(data) &&
        data.length > 0
      ) {
        // Cari dari data yang sudah di-fetch
        const found = data.find((item) => item.category_id === categoryId);
        setSelectedCategory(found || null);
        setIsLoading(false);
      } else if (difficultyId && status !== "loading") {
        // Fetch data jika belum ada
        dispatch(fetchCategoriesById(difficultyId));
      } else if (status === "failed") {
        setIsLoading(false);
      }
    };

    findAndSetCategory();
  }, [
    categoryDetailsFromState,
    status,
    data,
    categoryId,
    difficultyId,
    dispatch,
  ]);

  // Set loading false ketika status berubah dari loading
  useEffect(() => {
    if (status !== "loading" && !categoryDetailsFromState) {
      setIsLoading(false);
    }
  }, [status, categoryDetailsFromState]);

  const handleBack = () => navigate(-1);

  // Helper function untuk render deskripsi
  const renderDescription = () => {
    if (!selectedCategory) return null;

    const description = selectedCategory.category_description_short;

    // Log untuk debugging
    console.log("Category data:", selectedCategory);
    console.log("Description value:", description);
    console.log("Description type:", typeof description);

    // Check berbagai kondisi untuk deskripsi kosong
    if (
      !description ||
      description === "" ||
      description === null ||
      description === undefined ||
      (typeof description === "string" && description.trim() === "")
    ) {
      return "Tidak ada deskripsi.";
    }

    return description;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`p-6 max-w-md w-full h-full min-h-screen ${middleTheme()}`}
      >
        <button onClick={handleBack} className="mb-4 flex items-center gap-2">
          <FaArrowLeft />
          <p className="text-xl font-semibold">
            {selectedCategory ? `${selectedCategory.category_name}` : "Kembali"}
          </p>
        </button>

        {/* Loading state */}
        {(status === "loading" || isLoading) && <p>Memuat data...</p>}

        {/* Error state */}
        {status === "failed" && (
          <div className="text-red-500 flex items-center gap-2">
            <MdOutlineError /> Gagal memuat data: {error}
          </div>
        )}

        {/* Success state dengan data */}
        {selectedCategory && !isLoading ? (
          <div className={`p-4 rounded-xl shadow bg-transparent gap-2`}>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 mb-2">{renderDescription()}</p>
              <MdOutlineError className={`${getIconColorAlert()}`} />
            </div>
            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {selectedCategory.category_total_subcategories &&
              selectedCategory.category_total_subcategories.length > 0
                ? `${selectedCategory.category_total_subcategories[0]} Subkategori`
                : "0 Subkategori"}
            </span>
          </div>
        ) : (
          // Kategori tidak ditemukan (hanya tampil jika sudah selesai loading)
          !isLoading &&
          status === "succeeded" && (
            <div className="text-red-500">
              Kategori dengan ID {id} tidak ditemukan.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CategoriesDetail;
