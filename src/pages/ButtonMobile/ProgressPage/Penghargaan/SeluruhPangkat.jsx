import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";
import point from "../../../../assets/papanPeringkat/point.png";

const SeluruhPangkat = () => {
  const navigate = useNavigate();
  const { middleTheme } = useTheme();
  const level = [
    {
      id: 1,
      image: <img src="/News.png" alt="" srcset="" />,
      name: "Pangkat Sekarang",
      link: "/pangkat-sebelumnya",
      ket: "Pangkat yang telah berhasil terlewati",
      score: 5,
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      image: <img src="/Order.png" alt="" srcset="" />,
      name: "Pangkat Donatur",
      link: "/pangkat",
      ket: "Lihat seluruh pangkat",
      score: 30,
      symbol: <RiArrowRightSLine />,
    },
  ];
  const pangkat = [
    {
      id: 1,
      image: <img src="/pangkat2.png" alt="" srcset="" />,
      nameLevel: "Pemula (Level 1 - 10)",
      syarat: "1000 point",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
    {
      id: 2,
      image: <img src="/pangkat2.png" alt="" srcset="" />,
      nameLevel: "Pelopor (Level 11 - 20)",
      syarat: "2000 point",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];

  const pangkatSekarang = [
    {
      id: 1,
      image: <img src="/pangkat2.png" alt="" srcset="" />,
      nameLevel: "Relawan (Level 21 - 30)",
      link: "/pangkat/pangkat-pemula",
      syarat: "2300 point",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
    {
      id: 2,
      image: <img src="/pangkat2.png" alt="" srcset="" />,
      nameLevel: "Relawan Utama (Level 31 - 40)",
      syarat: "3000 point",
      link: "/pangkat/pangkat-pemula",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];
  return (
    <div
      className={`flex flex-col  min-h-screen  max-w-md w-full ${middleTheme()} mx-auto`}
    >
      <div className="flex  flex-col flex-grow bg-[#FFFEF1] justify-center ">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg "
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Seluruh Pangkat</h1>
        </div>

        {/* Pangkat  sebelumnya*/}
        <div className="p-5 flex flex-col gap-y-3">
          {pangkat.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col mt-1 p-3  rounded-xl border-[#E4C726] border ${
                item.id === 1
                  ? "bg-[#f6f4ef]"
                  : item.id === 2
                  ? "bg-[#FDF3D8]"
                  : ""
              }`}
            >
              <div className="flex items-center text-center gap-1">
                <h1 className="w-auto h-auto">{item.image}</h1>
                <h5 className="text-base font-semibold text-[#4B4B4B]">
                  {item.nameLevel}
                </h5>
              </div>
              <p className="text-sm font-normal mb-1">
                <span className="font-normal">Persyaratan :</span>
                <span className="ml-1 text-[#0961F5]">{item.syarat}</span>
              </p>
              <p className="text-sm font-normal">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Pangkata Saat Ini */}
        <div className="p-5 flex flex-col -mt-3 gap-y-3">
          <h2 className="font-semibold text-base">Pangkat Saat Ini</h2>
          {pangkatSekarang.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.link)}
              className={`flex flex-col  p-3  rounded-xl border-[#E4C726] border ${
                item.id === 1
                  ? "bg-[rgb(238,232,168)]"
                  : item.id === 2
                  ? "bg-[rgb(236,231,78)]"
                  : ""
              }`}
            >
              <div className="flex items-center text-center gap-1">
                <h1 className="w-auto h-auto">{item.image}</h1>
                <h5 className="text-base font-semibold text-[#4B4B4B]">
                  {item.nameLevel}
                </h5>
              </div>
              <p className="text-sm font-normal mb-1">
                <span className="font-normal">Persyaratan :</span>
                <span className="ml-1 text-[#0961F5]">{item.syarat}</span>
              </p>
              <p className="text-sm font-normal">{item.description}</p>
            </div>
          ))}
        </div>

        <hr className="text-[#EEEEEE] font-bold  border-4" />
        <div className="p-3 mt-2 flex flex-col">
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
                    <span className="text-base font-base -mt-2">
                      {item.name}
                    </span>
                    <span
                      className={`text-[8px] -mt-2 bg-[#0961F5] p-1 text-white px-1 h-4 w-4 flex items-center justify-center text-center rounded-full  ${
                        item.id === 2 ? "block" : "hidden"
                      }`}
                    >
                      {item.score}
                    </span>
                  </div>

                  <span className="text-sm text-[#777777] font ">
                    {item.ket}
                  </span>
                </div>
              </div>
              <span className="text-2xl  font-semibold">{item.symbol}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeluruhPangkat;
