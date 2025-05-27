import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";
import diamond from "../../../../assets/progress/diamond.png";

const DonasiSekarang = () => {
  const navigate = useNavigate();
  const { getButtonClass, getBorderClass, borderColor, middleTheme } = useTheme();
  const [nominal, setNominal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

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
      navigate("/progress/donasi-pembayaran");
    }
  };
  const handleNominalSelect = (amount) => {
    setNominal(amount);
    setErrorMessage("");
  };

  const donasi = [
    {
      id: 1,
      price: 50000,
    },
    {
      id: 2,
      price: 20000,
    },
    {
      id: 3,
      price: 70000,
    },
  ];

  const soal = [
    {
      id: 1,
      name: "Soal dan 2 - 5 opsi jawaban.",
    },
    {
      id: 2,
      name: "Penjelasan saat jawaban.",
    },
    {
      id: 3,
      name: "Perkata yang perlu dijelaskan seperti istilah syar’i atau bahasa arab akan disediakan dua penjelasan secara ringkas dan mendalam..",
    },
    {
      id: 4,
      name: "Artikel untuk bantuan menjawab soal 2-10 paragraf.",
    },
  ];

  const benefitDonate = [
    {
      id: 1,
      name: "Insya Allah semoga menjadi amal jariyah dengan memudahkan muslimin dan umum dalam belajar islam dan bahasa arab",
    },
    {
      id: 2,
      name: "Transparansi dalam pengelolaan dana, pembuatan soal materi serta dokumen bukti donasi.",
    },
    {
      id: 3,
      name: "Dicantumkan nama donatur kepada soal materi yang didonasikan ( bisa dengan nama asli, alias atau anonim )",
    },
    {
      id: 4,
      name: "Diberikan hak untuk menyampaikan pesan, motivasi, nasihat kepada peserta yang ditampilkan pada halaman soal.",
    },
    {
      id: 5,
      name: "Diberikan hak untuk mendapatkan statistik berapa banyak peserta yang belajar dengan soal materi beserta persentasi jawaban dijawab benar.",
    },
  ];
  const formatToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5  mb-8"
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Donasi Sekarang</h1>
        </div>

        <div className="flex flex-col px-5">
          <h2 className="text-sm font-[500] mb-3">Pilih Nominal Donasi</h2>

          <div className="flex flex-col gap-3">
            {donasi.map((data, index) => (
              <div
                key={data.id}
                ref={index === 0 ? buttonRef : null}
                className={`flex gap-3 items-center justify-between  rounded-xl p-3 px-2  ${
                  nominal == data.price
                    ? `${getButtonClass()} text-white border-none`
                    : `${borderColor()} border-2`
                }`}
                onClick={() => handleNominalSelect(data.price)}
              >
                <h5 className="flex gap-1 items-center text-sm mx-2 font-medium">
                  {formatToIDR(data.price)}
                </h5>
                <RiArrowRightSLine className="text-2xl   " />
              </div>
            ))}
          </div>

          {/* Donasi lain */}
          <div className="flex flex-col  gap-3 mt-5">
            <h2 className="text-sm font-medium">Masukan Donasi Lain</h2>
            <div className="flex gap-3  justify-between border-2 rounded-xl p-3 px-3 border-[#DCE6F8]">
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
            <p className="text-xs ">
              Untuk mempermudah, mohon masukkan nominal dengan kelipatan 10.000.
            </p>
          </div>

          {/* Hasil */}
          <div className="flex flex-col mt-5">
            <h2 className="flex text-sm font-medium">Hasil</h2>
            <p className="text-sm flex items-center ">
              Donasi <span className="font-semibold mx-2 ">10 soal</span>
              <img className="w-5 h-5" src={diamond} alt="Diamond icon" />
              <span className="font-semibold">100</span>
            </p>
          </div>

          <div
            className={`flex items-center  justify-between mt-5  p-1   border-2 rounded-xl ${borderColor()}`}
          >
            <h1 className="text-xs font-medium mx-2">
              Peruntukan materi hak dan donatur
            </h1>
            <RiArrowRightSLine className="text-2xl   " />
          </div>
          {/* peruntukan */}
          <div className="flex flex-col space-y-1 mt-3">
            <h2 className="text-sm font-medium">
              Satu soal dan materi meliputi
            </h2>
            {soal.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-sm font-normal min-w-[10px]">
                  {item.id}.
                </span>
                <p className="text-sm font-normal whitespace-normal">
                  {item.name}
                </p>
              </div>
            ))}
          </div>

          {/* Benefit */}
          <div className="flex flex-col space-y-1 mt-3 pb-16">
            <h2 className="text-sm font-medium">Yang didapatkan donatur</h2>
            {benefitDonate.map((item) => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="text-sm font-normal min-w-[10px]">
                  {item.id}.
                </span>
                <p className="text-sm font-normal whitespace-normal">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <div className="sticky bottom-2  z-10 flex justify-center">
            <button
              style={{ width: buttonWidth || "100%" }}
              className={`w-full ${
                nominal ? `${getButtonClass()} border-none` : getBorderClass()
              } border-none rounded-xl p-3 ${
                isNaN(nominal) || nominal < 5000 ? " cursor-not-allowed" : ""
              }`}
              disabled={isNaN(nominal) || nominal < 5000}
              onClick={handleSubmit}
            >
              Lanjut Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonasiSekarang;
