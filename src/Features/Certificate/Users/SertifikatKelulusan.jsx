import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from "../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import barCode from "../../../assets/sertifikat/barcode.png"

const SertifikatKelulusan = () => {
  const navigate = useNavigate();
  const { theme, getButtonClass, getBorderClass, middleTheme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={` flex flex-col text-xl  flex-grow max-w-md mx-auto w-full  md:bg-[#DCE6F8] bg-white`}
      >
        <div className="flex flex-col p-4 -mt-1">
          <div onClick={() => navigate(-1)} className="flex items-center gap-2">
            <FaArrowLeft className="text-2xl cursor-pointer" />
            <h1 className="text-2xl md:text-xl font-semibold">
              Sertifikat Kelulusan
            </h1>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col items-center  bg-[#DCE6F8] ">
          <h1 className="text-2xl md:text-xl font-semibold text-[#4B4B4B] mt-3">
            EduLearn
          </h1>
          <h2 className="text-2xl font-semibold mt-5 md:text-xl">
            Sertifikat Kelulusan
          </h2>
          <p className="text-base font-medium mt-2">No. 221/03-05-2025</p>
          <h1 className="text-base font-medium mt-6">Diberikan Kepada</h1>
          <h1 className="text-2xl md:text-xl font-semibold">Nama Lengkap</h1>
          <p className="text-base font-medium">
            Nomor Induk Peserta : 10202025
          </p>
          <h1 className="text-base font-medium mt-3 text-center md:p-5">
            Atas pencapaiannya sebagai peserta telah menyelesaikan pembelajaran
          </h1>
          <h2 className="text-base font-semibold">
            Tingkat Dasar Islam Kategori Keimanan Level
          </h2>
          <h1 className="text-base font-medium mt-3">Dengan Nilai</h1>
          <h1 className="text-base font-bold">90 ( Baik Sekali )</h1>
          <p className="text-base font-medium  text-center p-5 -mt-2 ">
            Semoga Ilmu yang telah dipelajari bermanfaat dan mendapatkan ridho
            Allah ta’ala
          </p>
          <img src={barCode} alt="barcode" className="w-20 h-20" />
          <div className="flex justify-between w-full p-5">
            <p>www.quiz-app.com</p>
            <p>Halaman 1 dari 3</p>
          </div>
        </div>

        {/* Button */}
        <div className="md:bg-[#DCE6F8] flex justify-between gap-4 p-3">
          <button
            onClick={() => navigate("/transkip-nilai")}
            className={`${getButtonClass()} border-none p-2 md:p-1 w-3/4 rounded-xl`}
          >
            lanjut
          </button>
          <button className={`${getBorderClass()} md:bg-white  p-2 md:p-1 rounded-xl w-1/3`}>
            unduh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SertifikatKelulusan;
