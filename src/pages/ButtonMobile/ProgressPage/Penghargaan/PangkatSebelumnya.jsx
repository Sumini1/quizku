import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../../Context/ThemeContext";

const PangkatSebelumnya = () => {
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
      name: "Seluruh Pangkat",
      link: "/seluruh-pangkat",
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
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
    {
      id: 2,
      image: <img src="/pangkat2.png" alt="" srcset="" />,
      nameLevel: "Pemula (Level 11 - 20)",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];
  return (
    <div
      className={`flex flex-col  min-h-screen  max-w-md w-full ${middleTheme()} mx-auto`}
    >
      <div className="flex flex-col flex-grow bg-[#FFFEF1]  ">
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg "
        >
          <FaArrowLeft />
          <h1 className="font-semibold text-xl">Pangkat Sebelumnya</h1>
        </div>

        <div className="flex flex-col gap-3 p-5  md:mt-5">
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
              <p className="text-sm font-normal">{item.description}</p>
            </div>
          ))}
        </div>
        <hr className="text-[#EEEEEE] font-bold  border-[5px] mt-5" />
        <div className="p-3 flex flex-col mt-5">
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
              <span className="text-xl  font-semibold">{item.symbol}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PangkatSebelumnya;
