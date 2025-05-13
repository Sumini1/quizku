import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../Reducer/subcategory";
import { fetchCategories } from "../../Difficulties/Reducer/categories";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import category from "../../../assets/category/category.webp";
import category2 from "../../../assets/category/category2.webp";
import category3 from "../../../assets/category/category3.jpg";

const Subcategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { getIconColorAlert } = useTheme();
  const { difficultyId } = useParams(); // Mendapatkan difficultyId dari URL
  const { data, status, error } = useSelector((state) => state.subcategory);
  const { data: categories } = useSelector((state) => state.categories);
  // console.log("subcategory", data);
  console.log("categories", categories);
  const { middleTheme } = useTheme();

  // Mendapatkan userId dari localStorage
  //   const userId = localStorage.getItem("id");

  // Mendapatkan data dari state navigasi (dikirim dari PilihCategory)
  const categoryDetails = location.state?.categoryDetails;

 useEffect(() => {
   if (difficultyId) {
     dispatch(fetchSubcategory(difficultyId));
     dispatch(fetchCategories(difficultyId));
   } else {
     console.log("Missing difficultyId for API call");
   }
 }, [dispatch, difficultyId]);

  // Handler untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`py-2 flex flex-col px-3 flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
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

        {/* Status loading */}
        {status === "loading" && (
          <div className="animate-pulse space-y-4 px-2 mt-4">
            {/* Banner Skeleton */}
            <div className="w-full h-[200px] bg-gray-300 rounded-xl"></div>

            {/* Title Skeleton */}
            <div className="h-6 bg-gray-300 rounded w-2/3"></div>

            {/* Kategori Chips Skeleton */}
            <div className="flex gap-3 mt-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-8 bg-gray-300 rounded-full"
                ></div>
              ))}
            </div>

            {/* Subcategories Skeleton Cards */}
            <div className="grid grid-cols-1 gap-4 mb-5">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-4 space-y-4"
                >
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="flex gap-3 overflow-x-auto">
                    {[...Array(2)].map((_, j) => (
                      <div
                        key={j}
                        className="min-w-[280px] h-40 bg-gray-200 rounded-xl"
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BANNER CARAOSEL */}
        <div className="w-full max-w-md mx-auto ">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-xl "
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <img
                src={category}
                alt="Banner 1"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <img
                src={category2}
                alt="Banner 2"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <img
                src={category3}
                alt="Banner 3"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* KATEGORY POPULER */}
        <div className="flex flex-col mt-3 px-2">
          <h2 className="text-base font-semibold">Kategori Populer</h2>
          <div>
            {/* Mapping name */}
            <div className="flex flex-col mt-3">
              <div>
                <div className="flex-wrap pb-4 flex gap-3 mt-5">
                  {Array.isArray(data) && data.length > 0 ? (
                    categories.map((item) => (
                      <Link
                        to={`/category/${item.id}`}
                        key={item.id}
                        state={{
                          difficultyId,
                          categoryDetails: {
                            name: item.name,
                            id: item.id,
                          },
                        }}
                        className={`bg-[#EEE] px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out ${
                          item.id === 1 && "bg-[hsl(218,93%,50%)] text-white"
                        }`}
                      >
                        <h5 className="font-normal text-sm ">{item.name}</h5>
                      </Link>
                    ))
                  ) : (
                    <div>No subcategories available</div>
                  )}

                  {/* Link to all categories with categoryDetails */}
                  {data.length > 0 && (
                    <Link
                      to="/categories" // Change this to your all categories page route
                      state={{
                        difficultyId,
                        categoryDetails: {
                          name: categoryDetails?.name || data[0].name,
                          id: "all", // You can use a special ID for "all categories"
                        },
                      }}
                      className="bg-[#EEE] px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
                    >
                      <span className="font-normal text-sm">
                        seluruh kategori
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data berhasil dimuat */}
        {status === "succeeded" && data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mt-5 px-2">
            {data.map((category) => (
              <div
                key={category.id}
                className="bg-white flex flex-col rounded-xl  "
              >
                <div className="flex gap-1 items-center">
                  <h2 className="text-base font-semibold mb-2">
                    {category.name}
                  </h2>
                  <MdOutlineError className={`${getIconColorAlert()}`} />
                  <div className="text-sm font-medium underline-offset-2 underline ml-auto">
                    <p
                      className="cursor-pointer text-sm font-medium underline underline-offset-2 ml-auto"
                      onClick={() =>
                        navigate(`/category/${category.id}`, {
                          state: {
                            difficultyId,
                            categoryDetails: {
                              name: category.name,
                              id: category.id,
                            },
                          },
                        })
                      }
                    >
                      Lihat seluruhnya
                    </p>
                  </div>
                </div>

                <div>
                  {/* Tampilkan subcategories jika ada */}
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="mt-3">
                        <div className="flex overflow-x-auto space-x-4 ">
                          <div className="overflow-x-auto">
                            <div className="flex space-x-4  px-2">
                              {category.subcategories.map((subcategory) => (
                                <div
                                  key={subcategory.id}
                                  className="shadow-lg bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 min-w-[280px] flex-shrink-0 border-2 border-gray-100"
                                  onClick={() =>
                                    navigate(`/theme/${subcategory.id}`)
                                  }
                                >
                                  <div className="flex flex-col">
                                    <div className="w-full ">
                                      <div className="w-full h-24 mx-auto rounded-b-none rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                          src={category2}
                                          alt={subcategory.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </div>

                                    <div className="border-t border-gray-200 rounded-t-none rounded-lg bg-gray-50 p-4 ">
                                      <h3 className="text-base font-semibold">
                                        {subcategory.name}
                                      </h3>
                                      <p className="text-sm font-medium text-gray-600 mt-1">
                                        {subcategory.themes_or_levels &&
                                        subcategory.themes_or_levels.length > 0
                                          ? `${subcategory.themes_or_levels.length} tema`
                                          : "Belum ada tema"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        ) : status === "succeeded" ? (
          <div className="flex justify-center items-center p-4">
            <p>Tidak ada data yang tersedia</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Subcategory;
