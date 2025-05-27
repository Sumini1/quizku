import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import diamond from "../../../../assets/progress/diamond.png";

const TokoBerlian = () => {
  const navigate = useNavigate();
  const { getBorderClass, middleTheme } = useTheme();
  const [nominal, setNominal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setNominal(value);
    setIsTyping(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsTyping(false);
      if (isNaN(value) || value < 5000) {
        setErrorMessage("Tolong input dengan nominal di atas 5000");
      }
    }, 500);
  };

  const handleSubmit = () => {
    if (!isNaN(nominal) && nominal >= 5000) {
      navigate("/progress/donasi-sekarang");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Toko Berlian</h1>
        </div>{" "}
        <div className="p-5 flex flex-col -mt-7">
          <h2 className="flex mb-3 text-lg font-medium">Berlian saat ini</h2>
          <div className="flex gap-3 items-center justify-between border-2 rounded-full p-1 px-2 border-[#DCE6F8]">
            <p className="flex gap-1 items-center">
              <img src={diamond} alt="berlian" />
              <span className="text-sm font-semibold flex items-center">
                100
              </span>
            </p>
            <RiArrowRightSLine className="text-2xl -ml-1  " />
          </div>
          <p className="text-sm mt-3">
            Berlian digunakan untuk membeli berbagai macam tema, warna, icon dan
            lainnya.
          </p>
          <p className="text-sm mt-3 font-bold underline">
            Lihat penggunaan berlian
          </p>
        </div>
        <hr className="text-[#EEEEEE] font-bold  border-4" />
        <div className="p-5 flex flex-col mt-1">
          <h2 className="flex text-lg mb-2 font-medium">Beli Berlian</h2>
          <p className="text-sm font-normal">
            Dukung perkembangan aplikasi dengan membeli berlian sebagai bentuk
            kontribusi pembuatan soal dan materi
          </p>
          <div className="flex flex-col mt-5">
            <h1 className="text-base font-medium">
              Kontribusi pembuatan per 1 soal
            </h1>
            <div className="flex justify-between mt-1 gap-1">
              <p className="text-sm font-normal flex  ">
                Nominal = <span className="ml-1 font-semibold">Rp. 10.000</span>
              </p>
              <p className="text-sm font-normal flex ">
                Hadiah Berlian =
                <span className="flex items-center ml-1 font-semibold">
                  <img src={diamond} alt="Diamond" className="w-4 h-4 mr-1" />
                  20
                </span>
              </p>
            </div>
          </div>
          <Link to="/progress/donasi-sekarang">
            <div
              className={`flex gap-3 mt-4 items-center justify-between border-2 rounded-full p-2 px-3 ${getBorderClass()}`}
            >
              <p
                className={`flex gap-1 mx-1 items-center text-sm font-semibold `}
              >
                Pilihan nominal yang sudah ada
              </p>
              <RiArrowRightSLine className="text-2xl -ml-1 text-[#333]" />
            </div>
          </Link>
        </div>
        {/* Berliat */}
        <div className="p-5 flex flex-col -mt-5">
          <div className="flex flex-col border-[#DCE6F8] border-2 rounded-xl p-1 px-3 ">
            <h1 className="text-base font-medium mb-1 mt-2">Masukan Nominal</h1>
            <div className="flex border border-[#DCE6F8] rounded-xl p-2">
              <input
                type="number"
                placeholder="Rp."
                className="w-full bg-transparent outline-none border-none text-sm font-medium px-2"
                value={nominal}
                onChange={handleChange}
              />
            </div>
            {errorMessage && !isTyping && (
              <h5 className="text-[#F59D09] text-xs font-semibold mt-2">
                {errorMessage}
              </h5>
            )}
            <p className="text-xs font-normal mt-2 mb-2">
              Untuk mempermudah, mohon masukkan nominal dengan kelipatan 10.000.
            </p>
          </div>
          <button
            className={`${getBorderClass()} rounded-xl p-2 mt-14 mb-3 ${
              isNaN(nominal) || nominal < 5000
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isNaN(nominal) || nominal < 5000}
            onClick={handleSubmit}
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokoBerlian;
