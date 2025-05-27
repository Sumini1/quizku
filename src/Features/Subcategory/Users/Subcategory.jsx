// React & React Router
import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../Reducer/subcategory";
import {
  fetchAllCategories,
  fetchCategories,
} from "../../Difficulties/Reducer/categories";

// Context
import { useTheme } from "../../../Context/ThemeContext";

// Third-Party UI Components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Icons
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

// Assets
import category from "../../../assets/category/category.webp";
import category2 from "../../../assets/category/category2.webp";
import category3 from "../../../assets/category/category3.jpg";

const Subcategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { getIconColorAlert, middleTheme } = useTheme();
  const { difficultyId } = useParams();

  const { data, status } = useSelector((state) => state.subcategory);
  const { data: categories } = useSelector((state) => state.categories);

  const categoryDetails = location.state?.categoryDetails;

  useEffect(() => {
    if (difficultyId) {
      dispatch(fetchSubcategory(difficultyId));
      dispatch(fetchAllCategories(difficultyId));
      dispatch(fetchCategories(difficultyId));
    } else {
      console.log("Missing difficultyId for API call");
    }
  }, [dispatch, difficultyId]);

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 px-3 flex flex-col flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex items-center mb-4 mt-2">
          <button onClick={handleBack} className="mr-2">
            <FaArrowLeft className="2xl" />
          </button>
          <h1 className="text-xl font-semibold">
            {categoryDetails?.difficulty_name || "Materi Pembelajaran"}
          </h1>
        </div>

        {status === "loading" && (
          <div className="animate-pulse space-y-4 px-2 mt-4">
            <div className="w-full h-[200px] bg-gray-300 rounded-xl" />
            <div className="h-6 bg-gray-300 rounded w-2/3" />
            <div className="flex gap-3 mt-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-24 h-8 bg-gray-300 rounded-full" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 mb-5">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-4 space-y-4"
                >
                  <div className="h-4 w-1/2 bg-gray-300 rounded" />
                  <div className="flex gap-3 overflow-x-auto">
                    {[...Array(2)].map((_, j) => (
                      <div
                        key={j}
                        className="min-w-[280px] h-40 bg-gray-200 rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-md mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="rounded-xl"
          >
            {[category, category2, category3].map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col mt-3 px-2">
          <h2 className="text-base font-semibold">Kategori Populer</h2>
          <div className="flex-wrap pb-4 flex gap-3 mt-5">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((item) => (
                <Link
                  to={`/categories-detail/${item.category_id}`}
                  key={item.category_id} // ✅ gunakan key yang benar
                  state={{ difficultyId, categoryDetails: item }}
                  className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                    item.category_id === 1
                      ? "bg-[hsl(218,93%,50%)] text-white"
                      : ""
                  }`}
                >
                  <h5 className="font-normal text-sm">{item.category_name}</h5>
                </Link>
              ))
            ) : (
              <div className="text-sm text-gray-500">
                Belum ada kategori tersedia.
              </div>
            )}

            {data.length > 0 && (
              <Link
                to={`/categories/${difficultyId}`}
                className="bg-[#EEE] px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
              >
                <span className="font-normal text-sm">seluruh kategori</span>
              </Link>
            )}
          </div>
        </div>

        {status === "succeeded" && data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mt-5 px-2">
            {data.map((category) => (
              <div
                key={category.categories_id}
                className="bg-white flex flex-col rounded-xl"
              >
                <div className="flex gap-1 items-center">
                  <h2 className="text-base font-semibold mb-2">
                    {category.categories_name}
                  </h2>
                  <MdOutlineError className={`${getIconColorAlert()}`} />
                  <div className="text-sm font-medium underline-offset-2 underline ml-auto">
                    <p
                      className="cursor-pointer text-sm font-medium underline underline-offset-2"
                      onClick={() =>
                        navigate(`/subcategories/${category.categories_id}`, {
                          state: {
                            difficultyId,
                            categoryDetails: {
                              name: category.difficulty_name,
                              id: category.difficulty_id,
                            },
                          },
                        })
                      }
                    >
                      Lihat seluruhnya
                    </p>
                  </div>
                </div>

                {category.subcategories_progress?.length > 0 ? (
                  <div className="mt-3">
                    <div className="flex overflow-x-auto space-x-4 px-2">
                      {category.subcategories_progress.map((subcategory) => (
                        <div
                          key={subcategory.subcategory_id}
                          className="shadow-lg bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 min-w-[280px] flex-shrink-0 border-2 border-gray-100"
                          onClick={() =>
                            navigate(
                              `/theme-detail/${subcategory.subcategory_id}`,
                              {
                                state: {
                                  subcategoryDetails: {
                                    subcategory_id: subcategory.subcategory_id,
                                    subcategory_name:
                                      subcategory.subcategory_name,
                                    subcategory_status:
                                      subcategory.subcategory_status,
                                    subcategory_long_description:
                                      subcategory.subcategory_long_description,
                                    subcategory_total_themes:
                                      subcategory.subcategory_total_themes,
                                    subcategory_image_url:
                                      subcategory.subcategory_image_url,
                                    categories_id: subcategory.categories_id,
                                    themes_or_levels:
                                      subcategory.themes_with_progress?.map(
                                        (theme) => ({
                                          id: theme.theme_id,
                                          name: theme.theme_name,
                                          status: theme.theme_status,
                                          description_short:
                                            theme.theme_short_description,
                                          description_long:
                                            theme.theme_long_description,
                                          total_unit:
                                            theme.theme_total_units || [],
                                          image_url: theme.theme_image_url,
                                          subcategory_id:
                                            theme.theme_subcategory_id,
                                          user_grade_result:
                                            theme.user_theme_grade_result,
                                          user_complete_unit:
                                            theme.user_theme_complete_unit,
                                          user_has_progress:
                                            theme.user_has_theme_progress,
                                        })
                                      ) || [],
                                  },
                                  categoryData: category,
                                  difficultyId: subcategory.subcategory_id,
                                },
                              }
                            )
                          }
                        >
                          <div className="flex flex-col">
                            <div className="w-full h-24 mx-auto rounded-b-none rounded-lg overflow-hidden border border-gray-200">
                              <img
                                src={category2}
                                alt={subcategory.subcategory_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="border-t border-gray-200 bg-gray-50 p-4">
                              <h3 className="text-base font-semibold">
                                {subcategory.subcategory_name}
                              </h3>
                              <p className="text-xs text-green-600 mt-1">
                                {subcategory.themes_with_progress?.length > 0
                                  ? `${subcategory.themes_with_progress.length} tema tersedia`
                                  : "Belum ada tema tersedia"}
                              </p>
                              <div className="mt-2">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    subcategory.themes_with_progress?.length > 0
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {subcategory.themes_with_progress?.length > 0
                                    ? "Siap Dipelajari"
                                    : "Dalam Pengembangan"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-gray-600">
                      Subcategory sedang dalam pengembangan
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : status === "succeeded" ? (
          <div className="flex justify-center items-center p-4">
            <p>Tidak ada data yang tersedia</p>
          </div>
        ) : (
          <div className="flex justify-center items-center p-4 annimate-pulse ">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subcategory;
