import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../Context/ThemeContext";
import point from "../../../../assets/papanPeringkat/point.png";
import diamond from "../../../../assets/progress/diamond.png";

const PangkatPemula = () => {
  const { middleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        {/* Header tetap di atas */}
        <div className="p-5">
          <div className="flex items-center gap-3">
            <FaArrowLeft
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
            <h1 className="font-semibold text-xl">Pangkat</h1>
          </div>
        </div>

        {/* Content di tengah layar */}
        <div className="flex flex-1 items-center justify-center gap-3 ">
          <div className="flex flex-col items-center ">
            <img src={point} alt="point" className="w-28 h-28" />
            <h2 className="text-2xl font-medium">Pemula</h2>
            <p className="items-center mx-auto justify-center text-center p-5">
              “ Merupakan pangkat yang diperuntukkan untuk level 1-10,
              melambangkan semangat bagi peserta yang baru mulai belajar.{" "}
            </p>
            <p className="text-lg font-semibold">Hadiah</p>
            <p>
              <span>Warna baru</span>
              <span className="text-[#28A745] ml-2">“Breeze Midnight”</span>
            </p>
            <p className="flex items-center ">
              <span className="">Berlian</span>
              <img src={diamond} alt="diamond" className="w-7 h-7" />

              <span className="text-lg font-semibold text-[#0961F5]">60</span>
            </p>
            <p className="mt-10">
              <span>persyaratan :</span>
              <span className="text-[#28A745] ml-2">4000 point</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PangkatPemula;
