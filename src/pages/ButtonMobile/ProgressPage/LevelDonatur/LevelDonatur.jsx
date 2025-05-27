import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../../../Context/ThemeContext";
import { RiArrowRightSLine } from "react-icons/ri";

const LevelDonatur = () => {
  const navigate = useNavigate();
  const { getBorder, middleTheme } = useTheme();

  const level = [
    {
      id: 1,
      level: "Level 2 Sapphire",
      description:
        "Merupakan pangkat yang diperuntukkan untuk level 1-10, melambangkan semangat bagi peserta yang baru mulai belajar.",
    },
  ];
  const levelSelanjutnya = [
    {
      id: 1,
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
      name: "Level Sebelumnya",
      link: "/progress/level-donatur-sebelumnya",
      ket: "Level Donatur yang telah berhasil terlewati",
      score: 5,
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      image: <img src="/Order.png" alt="" srcset="" />,
      name: "Seluruh Level",
      link: "/progress/seluruh-level",
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
            <h1 className="font-semibold text-xl">Level Donatur</h1>
          </div>

          {/* Paragraf */}
          <p className="text-sm font-medium mt-5">
            Level donatur sebagai bentuk penghargaan bagi donatur yang telah
            menyisihkan harta untuk dakwah.
          </p>
          {/* leveldonatur */}
          <div className="flex flex-col mt-5">
            <h2 className="text-base font-semibold">Level Donatur Saat Ini</h2>
            {level.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col  gap-3 mt-2 text-lg mb-4 border-[#0961F5] border rounded-xl p-3`}
              >
                <div className="flex gap-2">
                  <img src="/Shapir.png" alt="" />

                  <h1 className="font-semibold text-sm">{item.level}</h1>
                </div>

                <p className="text-sm -mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          {/* Level Donatur selanjutnya */}
          <h2 className="text-base font-medium mb-2">
            Level Donatur Selanjutnya
          </h2>
          <div className="flex flex-col  gap-2  text-lg  border-[#E0115F] bg-[#FFDAE8] border rounded-xl p-3">
            {levelSelanjutnya.map((item) => (
              <div key={item.id} className={`flex flex-col  -mt-2`}>
                <div className="flex gap-2 items-center">
                  <img src="/Rubby.png" alt="" />
                  <h1 className="text-sm font-semibold">{item.level}</h1>
                </div>
                <div className="flex flex-col gap-y-2 mt-1">
                  <p className="text-sm  flex -mt-1">
                    <span className="text-sm font-normal ">Persyaratan :</span>{" "}
                    <span className="text-sm text-[#E0115F] font-medium ml-1">
                      {item.syarat}
                    </span>
                  </p>
                  <p className="text-sm  flex -mt-1">
                    <span className="text-sm font-normal ">Terkumpul :</span>{" "}
                    <span className="text-sm text-[#28A745] font-medium ml-1">
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
        <div className="p-3 flex flex-col gap-y-3 -ml-12">
          {level1.map((item) => (
            <div
              onClick={() => navigate(item.link)}
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center  mx-1">
                <span className={`text-5xl w-14 h-14`}>{item.image}</span>
                <div className="flex flex-col">
                  <div className="flex gap-2 ">
                    <span className="text-base font-base ">{item.name}</span>
                    <span className="text-[8px] -mt-2 bg-[#0961F5] p-1 text-white px-1 h-4 w-4 flex items-center justify-center text-center rounded-full">
                      {item.score}
                    </span>
                  </div>

                  <span className="text-sm text-[#777777] ">
                    {item.ket}
                  </span>
                </div>
              </div>
              <span className="text-2xl  font-medium">{item.symbol}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelDonatur;
