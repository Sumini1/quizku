import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../pages/QuestionStatic/Reducer/modalSlice";
import { fetchTestExams } from "../Reducer/testExams";

const SurveyTestLevels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme, getButtonClassListCategory, getBorderClass, middleTheme } =
    useTheme();

  const [selectTingkatan, setSelectTingkatan] = useState(null);

  const exams = useSelector((state) => state.testExams.data);

  useEffect(() => {
    dispatch(fetchTestExams());
  }, [dispatch]);

const handleClick = () => {
  if (selectTingkatan) {
    dispatch(openModal());
    navigate(`/survey-test/${selectTingkatan}`);
  }
};


  const handleSelectTingkatan = (id) => {
    setSelectTingkatan(id);
  };

const selectedRoute = selectTingkatan ? `/survey-test/${selectTingkatan}` : "#";


  return (
    <div className="flex flex-col w-full mx-auto h-screen overflow-auto md:p-0">
      <div
        className={`w-full max-w-md mx-auto h-screen overflow-auto flex flex-col ${middleTheme()}  relative`}
      >
        <div className="flex flex-col mt-5 mx-5">
          <h1 className="text-xl font-semibold">Tes Pengetahuan Islam</h1>
          <h2 className="text-lg font-medium mt-3 mb-2">Mulai</h2>
          <p className="text-md ">Pilih tingkatan level</p>
        </div>

        <div className="flex-1 flex items-center justify-center pb-32">
          <form action="" className="mx-5 w-full gap-2 ">
            <div>
              {exams.map((exam) => (
                <button
                  key={exam.test_exam_id}
                  type="button"
                  onClick={() => handleSelectTingkatan(exam.test_exam_id)}
                  className={`w-full text-left rounded-xl p-3 pl-4 mb-4 border-[2px]  ${getButtonClassListCategory(
                    selectTingkatan === exam.test_exam_id
                  )}`}
                >
                  {exam.test_exam_name}
                </button>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 max-w-md mx-auto mt-20">
              <p className="text-sm mb-3">
                * Pilihan level tidak mempengaruhi apapun. Hanya untuk mengukur
                kemampuan diri.
              </p>
              <Link to={selectedRoute} className="w-full">
                <button
                  onClick={handleClick}
                  type="button"
                  className={`p-3 w-full border-none rounded-xl ${getBorderClass()} ${
                    selectTingkatan
                      ? theme === "dark"
                        ? "bg-gray-800 text-white"
                        : theme === "cupcake"
                        ? "bg-pink-500 text-white border-[#FFE6FA]"
                        : theme === "bumblebee"
                        ? "bg-yellow-500 text-white"
                        : theme === "lemonade"
                        ? "bg-[#027A7D] text-white"
                        : "bg-[hsl(218,93%,50%)] text-white"
                      : "bg-[#0961F5] text-[#0961F5]"
                  }`}
                  disabled={!selectTingkatan}
                >
                  Tes Sekarang
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyTestLevels;
