import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../Context/ThemeContext";
import point from "../../../../assets/papanPeringkat/point.png";


const Pangkat = () => {
  const navigate = useNavigate();
const { middleTheme } = useTheme();
  const level = [
    {
      id: 1,
      image: <img src="/News.png" alt="" srcset="" />,
      name: "Pangkat Sebelumnya",
      link: "/pangkat-sebelumnya",
      ket: "Pangkat yang telah berhasil terlewati",
      score: 5,
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      image: <img src="/Order.png" alt="" srcset="" />,
      name: "Seluruh Pangkat",
      link: "/seluruh-pangkat",
      ket: "Lihat seluruh pangkat",
      score: 30,
      symbol: <RiArrowRightSLine />,
    },
  ];
  return (
    <div
      className={`flex flex-col  min-h-screen  max-w-md w-full ${middleTheme()} mx-auto`}
    >
      <div
        className={`flex  flex-col flex-grow bg-[#FFFEF1] justify-center  `}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-5 md:-mt-44"
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Pangkat</h1>
        </div>

        <div className="flex flex-col gap-3 p-5 ">
          <h1 className="text-base font-normal ">
            Raih pangkat setinggi-tingginya sebagai bentuk semangat dalam
            menuntut ilmu.
          </h1>
          {/* Pangkat saat ini */}
          <div className="flex flex-col md:mt-5">
            <h2 className="text-lg font-medium ">Pangkat Saat Ini</h2>
            <div className="flex flex-col p-3  rounded-xl border-[#E4C726] border mt-2">
              <div className="flex items-center text-center ">
                <img
                  src={point}
                  alt="pangkat"
                  className="w-7 h-auto mb-1 -ml-1"
                />
                <h5 className="text-sm font-semibold text-[#4B4B4B]">
                  Pelopor (1 - 10)
                </h5>
              </div>
              <p className="text-sm font-normal">
                Merupakan pangkat yang diperuntukkan untuk level 1-10,
                melambangkan semangat bagi peserta yang baru mulai belajar.
              </p>
            </div>
          </div>

          {/* pangkat selanjutnya */}
          <div className="flex flex-col">
            <h2 className="text-lg font-medium ">Pangkat Selanjutnya</h2>
            <div className="flex flex-col border-[#E4C726] bg-[#FFFDE1] border-2 p-3 rounded-xl mt-2">
              <div className="flex items-center text-center">
                <img
                  src={point}
                  alt="pangkat"
                  className="w-7 h-auto mb-1 -ml-1"
                />
                <h5 className="text-sm font-semibold text-[#4B4B4B]">
                  Pelopor (11 - 20)
                </h5>
              </div>
              <p className="text-sm font-normal">
                Persyaratan : <span className="text-[#0961F5]">2000 poin</span>
              </p>
              <p className="text-sm font-normal mb-2">
                Poin saya : <span className="text-[#28A745]">1900 poin</span>
              </p>
              <p className="text-sm font-normal">
                Merupakan pangkat yang diperuntukkan untuk level 1-10,
                melambangkan semangat bagi peserta yang baru mulai belajar.
              </p>
            </div>
          </div>
        </div>
        <hr className="text-[#EEEEEE] font-bold  border-8" />
        <div className="p-3 md:mt-5">
          {level.map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className="flex items-center justify-between gap-4   py-3 "
            >
              <div className="flex items-center gap-3 mx-1">
                <span className={`text-3xl`}>{item.image}</span>
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <span className="text-base font-normal -mt-2">
                      {item.name}
                    </span>
                    <span className="text-[8px] -mt-2 bg-[#0961F5] p-1 text-white px-1 h-4 w-4 flex items-center justify-center text-center rounded-full">
                      {item.score}
                    </span>
                  </div>

                  <span className="text-xs text-[#777777] font mt-1">
                    {item.ket}
                  </span>
                </div>
              </div>
              <span className="text-3xl  font-semibold">{item.symbol}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pangkat;
