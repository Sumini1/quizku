import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import { fetchUserUnits } from "../Reducer/userUnitsSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaAddressBook, FaBook } from "react-icons/fa6";
import ModalOverView from "../Modals/ModalOverview";
import ModalQuiz from "../Modals/ModalQuiz";
import { fetchExams } from "../Reducer/examsSlice";
import { GrHelpBook } from "react-icons/gr";
import { PiExamFill } from "react-icons/pi";
import { fetchEvaluations } from "../Reducer/evaluationsSlice";
import ModalEvaluasi from "../Modals/ModalEvaluasi";
import ModalUjianAkhir from "../Modals/ModalUjianAkhir";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";
import { fetchReadings } from "../Reducer/readingsSlice";
import { fetchSubcategory } from "../../Subcategory/Reducer/subcategory";

const TemaBelajar = () => {
  const { themeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { middleTheme } = useTheme();

  // Data dari location.state
  const { themeDetails } = location.state || {};
  const themeDetail = location.state?.themeDetail;

  // State lokal untuk menyimpan data theme yang diambil dari berbagai sumber
  const [localThemeDetail, setLocalThemeDetail] = useState(null);

  const [activeModal, setActiveModal] = useState(
    location.state?.returnToModal || null
  );
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [activeSectionQuiz, setActiveSectionQuiz] = useState(null);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState({});
  const [loadingReadings, setLoadingReadings] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // Redux state
  const { data: evaluations } = useSelector((state) => state.evaluations);
  const { data: exams } = useSelector((state) => state.exams);
  const { data: readings } = useSelector((state) => state.readings); // ✅ langsung ambil array-nya
  const { data: subcategoryData, status } = useSelector(
    (state) => state.subcategory
  );

  const {
    data: units,
    loading,
    error,
  } = useSelector((state) => state.userUnits);
  console.log("units", units);
  console.log("readings", readings);

  // Function to navigate back
  const handleBack = () => {
    navigate(-1);
  };

  // Fetch subcategory data if not already loaded
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSubcategory());
    }
  }, [dispatch, status]);

  // Mencoba mendapatkan themeDetail dari localStorage jika tidak ada di location.state
  useEffect(() => {
    if (!themeDetail && !themeDetails && themeId) {
      // Coba ambil dari localStorage
      const savedThemeDetail = localStorage.getItem("selectedThemeDetail");
      if (savedThemeDetail) {
        try {
          setLocalThemeDetail(JSON.parse(savedThemeDetail));
        } catch (e) {
          console.error("Failed to parse saved theme detail:", e);
        }
      }
    }
  }, [themeDetail, themeDetails, themeId]);

  // Jika tidak ada di localStorage, cari dari data subcategory
  useEffect(() => {
    if (
      !themeDetail &&
      !themeDetails &&
      !localThemeDetail &&
      subcategoryData?.length > 0 &&
      themeId
    ) {
      // Flatten dan cari theme berdasarkan ID
      const allThemes = subcategoryData.flatMap(
        (category) =>
          category.subcategories?.flatMap(
            (sub) => sub.themes_or_levels || []
          ) || []
      );

      const foundTheme = allThemes.find(
        (theme) => theme.id === parseInt(themeId, 10)
      );

      if (foundTheme) {
        setLocalThemeDetail(foundTheme);
        // Simpan ke localStorage untuk future use
        localStorage.setItem("selectedThemeDetail", JSON.stringify(foundTheme));
      }
    }
  }, [subcategoryData, themeId, themeDetail, themeDetails, localThemeDetail]);

  // Improved error handling for fetch operations
  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingReadings(true);
      setErrorMessage(null);

      try {
        // Fetch all required data in parallel
        await Promise.all([
          dispatch(fetchEvaluations()),
          dispatch(fetchExams()),
          dispatch(fetchReadings()),
          // Fixed: Only pass themeId, not as an object
          themeId ? dispatch(fetchUserUnits(themeId)) : Promise.resolve(),
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMessage("Gagal memuat data. Silakan coba lagi.");
      } finally {
        setLoadingReadings(false);
      }
    };

    fetchAllData();
  }, [dispatch, themeId]);

  // Try to load clicked boxes from localStorage on component mount
  useEffect(() => {
    const savedClickedBoxes = localStorage.getItem("clickedBoxes");
    if (savedClickedBoxes) {
      try {
        setClickedBoxes(JSON.parse(savedClickedBoxes));
      } catch (e) {
        console.error("Failed to parse saved clicked boxes:", e);
      }
    }
  }, []);

  // Fixed: Update filtering logic to handle the correct data structure
  useEffect(() => {
    if (units && units.length > 0 && themeId) {
      const numericId = parseInt(themeId);
      if (numericId === 3) {
        setFilteredUnits(units);
      } else {
        // Fixed: Use correct property name from JSON data
        setFilteredUnits(
          units.filter((unit) => unit.unit_themes_or_level_id === numericId)
        );
      }
    }
  }, [units, themeId]);

  const getBoxBgColor = (unitId, boxType) => {
    return clickedBoxes[unitId]?.[boxType]
      ? "bg-[#28A745] text-white"
      : "bg-[#DDDDDD]";
  };

  // Handle the modal opening logic
  const handleBoxClick = (unitId, boxType = null, sectionQuiz = null) => {
    setClickedBoxes((prev) => {
      const newState = {
        ...prev,
        [unitId]: {
          ...prev[unitId],
          [boxType]: true,
        },
      };
      localStorage.setItem("clickedBoxes", JSON.stringify(newState));
      return newState;
    });

    if (boxType === "overview") {
      setActiveModal("ModalOverView");
      setActiveUnitId(unitId);
    } else if (boxType === "reading") {
      setTimeout(() => navigate(`/readings/${unitId}`), 100);
      return;
    } else if (boxType && boxType.startsWith("quiz_")) {
      setActiveModal("ModalQuiz");
      setActiveUnitId(unitId);
      setActiveSectionQuiz(sectionQuiz);
    } else if (boxType === "evaluation") {
      setActiveModal("ModalEvaluasi");
      setActiveUnitId(unitId);
    } else if (boxType === "exam") {
      setActiveModal("ModalUjianAkhir");
      setActiveUnitId(unitId);
    } else {
      setActiveModal("ModalUjianAkhir");
      setActiveUnitId(unitId);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setActiveUnitId(null);
    setActiveSectionQuiz(null);
  };

  const handleRetry = () => {
    // Reset error state
    setErrorMessage(null);

    // Fixed: Retry fetching data with correct parameters
    if (themeId) {
      dispatch(fetchUserUnits(themeId));
    }
    dispatch(fetchEvaluations());
    dispatch(fetchExams());
    dispatch(fetchReadings());
  };

  // Menggunakan fallbacks untuk nama tema
  const getThemeName = () => {
    return (
      themeDetails?.name ||
      themeDetail?.name ||
      localThemeDetail?.name ||
      "Tema Pembelajaran"
    );
  };

  if (loading || loadingReadings)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0961F5] mx-auto mb-4"></div>
          <p>Memuat data...</p>
        </div>
      </div>
    );

  if (error || errorMessage)
    return (
      <div className="flex flex-col items-center justify-center h-screen p-5">
        <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg p-6 w-full max-w-md">
          <p className="font-semibold text-lg mb-4">
            Error fetching unit data.
          </p>
          <p className="mb-4">
            Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.
          </p>
          <button
            onClick={handleRetry}
            className="bg-[#0961F5] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full h-full min-h-screen">
      <div
        className={` flex flex-col flex-grow max-w-md mx-auto w-full ${middleTheme()}`}
      >
        {/* Modal OverView */}
        {activeModal === "ModalOverView" && (
          <ModalOverView onClose={closeModal} unitId={activeUnitId} />
        )}

        {/* Modal Quiz */}
        {activeModal === "ModalQuiz" && activeSectionQuiz && (
          <ModalQuiz
            onClose={closeModal}
            unitId={activeUnitId}
            sectionQuiz={activeSectionQuiz}
            quizId={activeSectionQuiz?.quizzes?.[0]?.id || null} // ✅ kirim quiz.id
          />
        )}

        <div className="relative w-full p-3">
          <FaArrowLeft
            onClick={handleBack}
            className="text-3xl rounded-full p-1 cursor-pointer"
          />
        </div>

        <div className="flex flex-col p-5 -mt-7">
          <h1 className="text-lg font-semibold mb-2">{getThemeName()}</h1>

          {/* kumpulan readings */}
          {readings && readings.length > 0 && (
            <div className="flex flex-col mt-3">
              <h2 className="text-base font-semibold mb-2">Kumpulan Artikel</h2>
              <div className="flex flex-col mb-5 cursor-pointer">
                <div className="flex flex-col border border-[#0961F5] rounded-lg w-full h-full cursor-pointer mt-4">
                  <div className="relative">
                    <div className="flex items-center w-full">
                      <div className="flex items-center justify-center border border-[#0961F5] bg-white rounded-full px-4 py-2 -mt-4">
                        <span className="font-bold text-md">Artikel</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-base font-normal">
                      Kumpulan artikel pembelajaran
                    </p>
                    <div className="grid grid-cols-5 gap-5 gap-y-5 p-3 w-full place-items-center rounded-md gap-x-10">
                      {readings.map((reading, index) => (
                        <span
                          key={reading.reading_id || index}
                          onClick={() =>
                            navigate(`/reading-detail/${reading.reading_id}`)
                          }
                          className={`${getBoxBgColor(
                            reading.reading_id,
                            "reading"
                          )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                        >
                          {index + 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Display units */}
          <div className="flex flex-col mt-3">
            <h2 className="text-base font-semibold mb-2">Unit Pembelajaran</h2>
            {units?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredUnits.map((unit, index) => (
                  <div
                    key={unit.unit_id || index}
                    className="flex mb-5 cursor-pointer"
                  >
                    <div className="flex flex-col border border-[#0961F5] rounded-lg w-full h-full cursor-pointer mt-4">
                      <div className="relative">
                        <div className="flex items-center w-full">
                          <div className="flex items-center justify-center border border-[#0961F5] bg-white rounded-full px-4 py-2 -mt-4">
                            <span className="font-bold text-md">
                              {unit.unit_name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-base font-normal">
                          {unit.unit_description_short}
                        </p>
                        <div className="grid grid-cols-5 gap-5 gap-y-5 p-3 w-full place-items-center rounded-md gap-x-10">
                          {/* Overview button */}
                          <span
                            onClick={() =>
                              handleBoxClick(unit.unit_id, "overview")
                            }
                            className={`${getBoxBgColor(
                              unit.unit_id,
                              "overview"
                            )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                          >
                            <FaAddressBook className="text-2xl" />
                          </span>

                          {/* Reading material button */}
                          <span
                            onClick={() =>
                              handleBoxClick(unit.unit_id, "reading")
                            }
                            className={`${getBoxBgColor(
                              unit.unit_id,
                              "reading"
                            )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                          >
                            <FaBook className="text-2xl" />
                          </span>

                          {/* Render quiz buttons for each section_quiz */}
                          {unit.section_quizzes &&
                            unit.section_quizzes.map((sectionQuiz, idx) => (
                              <span
                                key={sectionQuiz.section_quizzes_id}
                                onClick={() =>
                                  handleBoxClick(
                                    unit.unit_id,
                                    `quiz_${sectionQuiz.section_quizzes_id}`,
                                    sectionQuiz
                                  )
                                }
                                className={`${getBoxBgColor(
                                  unit.unit_id,
                                  `quiz_${sectionQuiz.section_quizzes_id}`
                                )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                              >
                                {idx + 1}
                              </span>
                            ))}

                          {/* Evaluation button */}
                          <span
                            onClick={() =>
                              handleBoxClick(unit.unit_id, "evaluation")
                            }
                            className={`${getBoxBgColor(
                              unit.unit_id,
                              "evaluation"
                            )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                          >
                            <GrHelpBook className="text-2xl" />
                          </span>

                          {/* Exam button */}
                          <span
                            onClick={() => handleBoxClick(unit.unit_id, "exam")}
                            className={`${getBoxBgColor(
                              unit.unit_id,
                              "exam"
                            )} flex items-center justify-center rounded-md text-2xl font-[500] w-[60px] h-[60px] transition-colors duration-200`}
                          >
                            <PiExamFill className="text-2xl" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg text-center">
                <p>Belum ada unit pembelajaran tersedia.</p>
                <button
                  onClick={handleRetry}
                  className="text-[#0961F5] mt-2 underline"
                >
                  Muat ulang
                </button>
              </div>
            )}
          </div>
        </div>

        {activeModal === "ModalEvaluasi" && activeUnitId && (
          <ModalEvaluasi
            isOpen={true}
            onClose={closeModal}
            unitId={activeUnitId}
          />
        )}

        {activeModal === "ModalUjianAkhir" && activeUnitId && (
          <ModalUjianAkhir
            isOpen={true}
            onClose={closeModal}
            unitId={activeUnitId}
          />
        )}
      </div>
      <div className="flex justify-center w-full fixed bottom-0 left-0 right-0">
        <div className="w-full md:max-w-md">
          <ButtonNavbar />
        </div>
      </div>
    </div>
  );
};

export default TemaBelajar;
