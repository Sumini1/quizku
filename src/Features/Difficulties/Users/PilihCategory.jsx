import React, { useState, useEffect } from "react";
import { MdOutlineError } from "react-icons/md";
import Dasar from "../Modals/Dasar";
import { useTheme } from "../../../Context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchDifficulties } from "../Reducer/difficulties";
import { useNavigate } from "react-router-dom";
import bukuCategory from "../../../assets/category/bukuCategory.jpeg"
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

  // Gunakan user dari state auth jika diperlukan
//   const { user } = useSelector((state) => state.auth);

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
  const handleSelectCategory = (categoryId) => setSelectedCategory(categoryId);

  const handleContinue = () => {
    const selected = data.find((category) => category.id === selectedCategory);
    if (selected) {
      setIsLoading(true); // Mulai loading

      // Buat subcategory pengguna - identitas pengguna akan diambil dari token di API
      
      dispatch(
        fetchCreateUserSubcategory({
          subcategory_id: selectedCategory,
          // tidak perlu mengirim user_id karena akan diambil dari token di backend
        })
      )
        .then(() => {
          navigate(`/subcategory/${selected.id}`, {
            state: {
              selectedCategory,
              categoryDetails: selected,
            },
          });
        })
        .catch((error) => {
          console.error("Gagal membuat user subcategory:", error);
          // Tetap navigasi meskipun terjadi error
          navigate(`/subcategory/${selected.id}`, {
            state: {
              selectedCategory,
              categoryDetails: selected,
            },
          });
        })
        .finally(() => {
          setIsLoading(false); // Akhiri loading
        });
    } else {
      // Jika belum memilih kategori
      console.log("Silakan pilih kategori terlebih dahulu");
    }
  };

  // Fungsi pembantu untuk menentukan modal mana yang ditampilkan berdasarkan ID kategori
  const renderModalBasedOnCategory = () => {
    // Cari kategori aktif berdasarkan ID
    const activeCategory = data.find((category) => category.id === activeModal);

    if (!activeCategory) return null;

    // Mengembalikan modal yang sesuai berdasarkan nama kategori
    const categoryName = activeCategory.name.trim().toLowerCase();

    if (categoryName.includes("dasar islam")) {
      return (
        <Dasar
          isOpen={true}
          onClose={handleCloseModal}
          categoryId={activeModal}
        />
      );
    }

    // Add other modal conditions if needed
    // Example:
    // if (categoryName.includes("umum")) {
    //   return <ModalUmum isOpen={true} onClose={handleCloseModal} categoryId={activeModal} />;
    // }

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
              key={category.id}
              className={`relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? getButtonClassSelected()
                  : "bg-white"
              } flex flex-col h-[280px]`} // Fixed height for all cards
            >
              <img
                src={bukuCategory}
                alt={category.name}
                className="w-full h-[120px] object-cover"
              />

              {/* Konten */}
              <div className="p-2 mx-1 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="font-semibold text-base md:text-sm">
                    {category.name}
                  </h1>
                  <MdOutlineError
                    className={`text-lg cursor-pointer ${getIconColorAlert()}`}
                    onClick={() => handleIconClick(category.id)}
                  />
                </div>

                <div className="flex-grow overflow-y-auto ">
                  <h5 className="text-sm font-light line-clamp-2">
                    {category.description_long}
                  </h5>
                </div>

                {/* Tombol Pilih */}
                <div className="mt-auto pt-2 ">
                  <button
                    onClick={() => handleSelectCategory(category.id)}
                    className={`w-full py-1 md:py-1 md:text-base rounded-xl text-sm font-medium ${
                      selectedCategory === category.id
                        ? "bg-white text-black border text-sm font-medium md:text-base "
                        : "bg-[#DCE6F8] text-[#333]"
                    }`}
                  >
                    {selectedCategory === category.id ? "Dipilih" : "Pilih"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Rendering Dinamis */}
        {activeModal && renderModalBasedOnCategory()}

        {/* Tombol Lanjutkan */}
        <div className="relative bottom-0 md:sticky md:bottom-0 md:mt-20 left-0 right-0 flex flex-col justify-center items-center mx-auto w-full max-w-md">
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
