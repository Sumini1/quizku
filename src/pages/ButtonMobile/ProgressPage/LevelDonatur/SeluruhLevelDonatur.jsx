import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";

const SeluruhLevelDonatur = () => {
  const navigate = useNavigate();
  const { getBorder, middleTheme } = useTheme();

  const level = [
    {
      id: 1,
      nameLevel: "Level 1 Sapphire",
      status: "",

      icon: <img src="/emerald.png" alt="" />,
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];
  const levelDonate = [
    {
      id: 1,
      image: <img src="/Shapir.png" alt="" />,
      level: "Level 2 Sapphire",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
    {
      id: 2,
      image: <img src="/Rubby.png" alt="" />,
      level: "Level 3 Ruby",
      syarat: "10 soal /Rp.10.000",
      total: "1 Soal / Rp.1000",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];
  const level1 = [
    {
      id: 1,
      image: <img src="/News.png" alt="" srcset="" />,
      name: "Level Donatur",
      link: "/progress/level-donatur",
      ket: "Level Donatur yang telah berhasil terlewati",
      score: 5,
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      image: <img src="/Order.png" alt="" srcset="" />,
      name: "Level sebelumnya",
      link: "/progress/level-donatur-sebelumnya",
      ket: "Lihat seluruh level donatur",
      score: 30,
      symbol: <RiArrowRightSLine />,
    },
  ];
  return (
    <div
      className={`flex flex-col  min-h-screen  max-w-md w-full ${middleTheme()} mx-auto`}
    >
      <div className="flex flex-col flex-grow bg-[#FFFEF1] ">
        <div className="flex flex-col p-5">
          <div className="flex gap-2  items-center">
            <FaArrowLeft onClick={() => navigate(-1)} />
            <h1 className="font-semibold text-xl">Seluruh Level Donatur</h1>
          </div>
          {/* level */}
          <div className="flex flex-col gap-y-5 mt-7">
            {level.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col border p-3 rounded-xl ${
                  item.id === 1
                    ? "border-[#50C878] bg-[#D9FFF0]"
                    : "border-[#0961F5] bg-[#E1EBFF]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h1 className="flex items-center gap-2">
                    {item.icon}{" "}
                    <span className="text-base font-medium">
                      {item.nameLevel}
                    </span>
                  </h1>
                  {/* <h2 className="text-base font-medium">{item.status}</h2> */}
                </div>
                <p className="text-sm font-normal mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          {/* leveldonatur */}
          <div className="flex flex-col mt-5 gap-y-3">
            <h2 className="font-semibold text-base">Level saat Ini</h2>
            {levelDonate.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col border p-3 rounded-xl ${
                  item.id === 1
                    ? "bg-blue-200 border-[#254FB9]"
                    : item.id === 2
                    ? "bg-[#FFDAE8] border-[#E0115F]"
                    : "bg-gray-200 border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <h1>{item.image}</h1>
                  <p className="text-base font-medium">{item.level}</p>
                </div>
                <div
                  className={`flex flex-col gap-y-2 mt-1 ${
                    item.id === 1 && "hidden"
                  }`}
                >
                  <p className="text-sm  flex -mt-1">
                    <span className="text-sm font-normal ">Persyaratan :</span>{" "}
                    <span className="text-sm text-[#E0115F] font-normal ml-1">
                      {item.syarat}
                    </span>
                  </p>
                  <p className="text-sm  flex -mt-1">
                    <span className="text-sm font-normal ">Terkumpul :</span>{" "}
                    <span className="text-sm text-[#28A745] font-normal ml-1">
                      {item.total}
                    </span>
                  </p>
                </div>
                <p className="text-sm mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-white font-bold  border-[5px]" />

        {/* level1 */}
      
      </div>
    </div>
  );
};

export default SeluruhLevelDonatur;
