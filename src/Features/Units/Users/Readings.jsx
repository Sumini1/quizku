import React, { useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnitsById } from "../Reducer/unitsSlice";
import { fetchReadings } from "../Reducer/readingsSlice";


// Function to format text with the special requirements
const formatText = (text) => {
  if (!text || typeof text !== "string") return text;

  // Regular expression to match patterns with = followed by numbers
  const parts = text.split(/(\S*=\d+\S*)/g);

  if (parts.length <= 1) return text;

  return parts.map((part, index) => {
    // Check if this part contains the pattern
    if (part.match(/\S*=\d+\S*/)) {
      // Extract the text before the = character
      const visibleText = part.split("=")[0];
      return (
        <span
          key={index}
          className="underline decoration-dotted underline-offset-4"
        >
          {visibleText}
        </span>
      );
    }
    return part;
  });
};

const Readings = () => {
  const navigate = useNavigate();
  const { theme, getButtonClass, getThemeModalCategory, middleTheme } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();

  const readingsState = useSelector((state) => state.readings);
  const unitsState = useSelector((state) => state.units);

  const readings = readingsState ? readingsState.data : [];
  const readingsStatus = readingsState ? readingsState.status : "idle";

  const detail = unitsState ? unitsState.detail : {};
  const status = unitsState ? unitsState.status : "idle";

  useEffect(() => {
    console.log("Fetching unit with ID:", id); // Log ID
    if (id) {
      dispatch(fetchUnitsById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchReadings());
  }, [dispatch]);

  // Log status and detail for debugging
  console.log("Fetch status:", status);
  console.log("Unit detail:", detail);
  console.log("Readings data:", readings);

  if (status === "failed") {
    return <div>Error fetching unit data.</div>;
  }

  if (readingsStatus === "failed") {
    return <div>Error fetching readings data.</div>;
  }

  // Filter readings based on the current unit ID
  const filteredReadings = readings.filter(
    (reading) => reading.reading_unit_id === parseInt(id)
  );

  return (
    <div
      className={`flex flex-col min-h-screen w-full ${middleTheme()} max-w-md justify-center items-center mx-auto`}
    >
      <div className={`flex flex-col min-h-screen ${getThemeModalCategory()}`}>
        <div
          className="flex items-center gap-3 mt-5 mx-3 text-lg mb-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl"> Artikel</h1>
        </div>

        <div className="flex flex-col p-5 gap-3">
          {/* Display filtered readings */}
          <div>
            {filteredReadings.length > 0 ? (
              filteredReadings.map((reading) => (
                <div key={reading.reading_id} className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {formatText(reading.reading_title)}
                  </h2>
                  <p className="text-md ">
                    {formatText(reading.reading_description_long)}
                  </p>
                  <div
                    onClick={() => navigate(-1)}
                    className="fixed bottom-4 left-2  px-5 mx-auto max-w-md right-2 flex justify-center items-center"
                  >
                    <button
                      className={`${getButtonClass()} border-none p-3 px-5 rounded-lg shadow-lg w-full max-w-md`}
                    >
                      Selesai Membaca
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Tidak ada bacaan untuk unit ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readings;
