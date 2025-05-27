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

  // Regex untuk menemukan pola seperti kata=123 (tanpa spasi di sekitarnya)
  const regex = /(\w+)=\d+/g;

  // Gunakan array untuk menyimpan bagian hasil parsing
  const result = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    // Tambahkan teks sebelum match
    if (match.index > lastIndex) {
      result.push(
        <React.Fragment key={`text-${key++}`}>
          {text.slice(lastIndex, match.index)}
        </React.Fragment>
      );
    }

    // Tambahkan teks yang di-format dengan hanya kata (tanpa angka)
    const wordOnly = match[1]; // Hanya ambil kata, bukan angka
    result.push(
      <span
        key={`formatted-${key++}`}
        className="underline decoration-dotted underline-offset-4"
      >
        {wordOnly}
      </span>
    );

    // Tambahkan bagian angka (=123) tanpa format
    const numberPart = match[0].substring(match[1].length); // =123
    result.push(
      <React.Fragment key={`number-${key++}`}>{numberPart}</React.Fragment>
    );

    lastIndex = regex.lastIndex;
  }

  // Tambahkan sisa teks setelah match terakhir
  if (lastIndex < text.length) {
    result.push(
      <React.Fragment key={`final-${key++}`}>
        {text.slice(lastIndex)}
      </React.Fragment>
    );
  }

  // Jika tidak ada match, return teks asli
  if (result.length === 0) {
    return text;
  }

  // Return sebagai React Fragment
  return <>{result}</>;
};

const ReadingDetail = () => {
  const navigate = useNavigate();
  const { theme, getButtonClass, getThemeModalCategory, middleTheme } = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();

  const readingsState = useSelector((state) => state.readings);
  console.log("readings", readingsState);

  const readings = readingsState?.data || [];
  const readingsStatus = readingsState ? readingsState.status : "idle";

  useEffect(() => {
    if (id) {
      dispatch(fetchUnitsById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchReadings());
  }, [dispatch]);

  if (readingsStatus === "failed") {
    return <div>Error fetching readings data.</div>;
  }

  // Filter readings based on the current unit ID
  const filteredReadings = readings.filter(
    (reading) => reading.reading_id === parseInt(id)
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
                  <p className="text-md">
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

export default ReadingDetail;
