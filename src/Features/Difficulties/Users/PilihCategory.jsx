import React, { useState, useEffect } from "react";
import { MdOutlineError } from "react-icons/md";
import Dasar from "../Modals/Dasar";
import { useTheme } from "../../../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchDifficulties } from "../Reducer/difficulties";
import { useNavigate } from "react-router-dom";
import bukuCategory from "../../../assets/category/bukuCategory.jpeg";
import { fetchCreateUserSubcategory } from "../../Subcategory/Reducer/subcategory";

const PilihCategory = () => {
  const {
    getLanjutkanClass,
    getButtonClass,
    getBorderClass,
    getButtonClassSelected,
    getIconColorAlert,
    middleTheme,
  } = useTheme();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mengambil data dari state redux
  const {
    data = [],
    status,
    error,
  } = useSelector((state) => state.difficulties);

  const {
    data: subcategoryData,
    status: subcategoryStatus,
    error: subcategoryError,
  } = useSelector((state) => state.subcategory);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDifficulties());
    }
  }, [status, dispatch]);

  const handleIconClick = (categoryId) => {
    console.log("Icon clicked for category ID:", categoryId);
    setActiveModal(categoryId);
  };

  const handleCloseModal = () => setActiveModal(null);

  // Modifikasi fungsi handleSelectCategory untuk include create user subcategory
  const handleSelectCategory = async (categoryId) => {
    setSelectedCategory(categoryId);

    try {
      // Dispatch action untuk create user subcategory
      const payload = {
        subcategory_id: categoryId, // Menggunakan categoryId sebagai subcategory_id
      };

      await dispatch(fetchCreateUserSubcategory(payload));
      console.log(
        "User subcategory created successfully for category:",
        categoryId
      );
    } catch (error) {
      console.error("Error creating user subcategory:", error);
      // Anda bisa menambahkan error handling di sini jika diperlukan
      // Misalnya menampilkan toast atau alert
    }
  };

  const handleContinue = () => {
    const selected = data.find(
      (category) => category.difficulty_id === selectedCategory
    );
    if (selected) {
      setIsLoading(true);

      // Navigasi ke subcategory dengan difficultyId yang benar
      navigate(`/subcategory/${selected.difficulty_id}`, {
        state: {
          selectedDifficultyId: selected.difficulty_id,
          categoryDetails: selected,
        },
      });

      setIsLoading(false);
    } else {
      console.log("Silakan pilih kategori terlebih dahulu");
    }
  };

  // Fungsi pembantu untuk menentukan modal mana yang ditampilkan berdasarkan ID kategori
  const renderModalBasedOnCategory = () => {
    const activeCategory = data.find(
      (category) => category.difficulty_id === activeModal
    );

    if (!activeCategory) return null;

    const categoryName =
      activeCategory.difficulty_name?.trim().toLowerCase() || "";

    if (categoryName.includes("dasar islam")) {
      return (
        <Dasar
          isOpen={true}
          onClose={handleCloseModal}
          categoryId={activeModal}
        />
      );
    }

    // Default case
    return (
      <Dasar
        isOpen={true}
        onClose={handleCloseModal}
        categoryId={activeModal}
      />
    );
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center p-4">Memuat...</div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center p-4 text-red-500">
        <p>Tolong untuk login kembali</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-2 px-4 py-2 bg-red-100 rounded-md"
        >
          login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col text-xl px-5 flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <h1 className="text-xl font-semibold mb-6 mt-1">
          Tingkat Pembelajaran
        </h1>

        {/* Grid kategori */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-6">
          {data.map((category) => (
            <div
              key={category.difficulty_id}
              className={`relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${
                selectedCategory === category.difficulty_id
                  ? getButtonClassSelected()
                  : "bg-white"
              } flex flex-col h-[280px]`}
            >
              <img
                src={bukuCategory}
                alt={category.difficulty_name}
                className="w-full h-[120px] object-cover"
              />

              {/* Konten */}
              <div className="p-2 mx-1 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="font-semibold text-base md:text-sm">
                    {category.difficulty_name}
                  </h1>
                  <MdOutlineError
                    className={`text-lg cursor-pointer ${getIconColorAlert()}`}
                    onClick={() => handleIconClick(category.difficulty_id)}
                  />
                </div>

                <div className="flex-grow overflow-y-auto ">
                  <h5 className="text-sm font-light line-clamp-2">
                    {category.difficulty_description_long}
                  </h5>
                </div>

                {/* Tombol Pilih */}
                <div className="mt-auto pt-2 ">
                  <button
                    onClick={() => handleSelectCategory(category.difficulty_id)}
                    className={`w-full py-1 md:py-1 md:text-base rounded-xl text-sm font-medium ${
                      selectedCategory === category.difficulty_id
                        ? "bg-white text-black border text-sm font-medium md:text-base "
                        : "bg-[#DCE6F8] text-[#333]"
                    }`}
                    disabled={subcategoryStatus === "loading"} // Disable saat loading
                  >
                    {subcategoryStatus === "loading" &&
                    selectedCategory === category.difficulty_id
                      ? "Memproses..."
                      : selectedCategory === category.difficulty_id
                      ? "Dipilih"
                      : "Pilih"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Rendering Dinamis */}
        {activeModal && renderModalBasedOnCategory()}

        {/* Tombol Lanjutkan */}
        <div className="relative bottom-0 md:fixed  md:bottom-0  left-0 right-0 flex flex-col justify-center items-center mx-auto w-full max-w-md md:p-5">
          <button
            onClick={handleContinue}
            disabled={!selectedCategory || isLoading}
            className={`flex p-2 md:p-2 md:text-base md:mb-5 rounded-xl w-full mt-10  md:mt-10 items-center justify-center ${
              selectedCategory && !isLoading
                ? `${getLanjutkanClass()} `
                : `${getBorderClass()} text-base font-medium`
            }`}
          >
            {isLoading ? "Sedang memproses..." : "Lanjutkan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PilihCategory;
