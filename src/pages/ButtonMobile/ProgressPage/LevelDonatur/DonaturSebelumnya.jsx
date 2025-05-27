import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useTheme } from "../../../../Context/ThemeContext";


const DonaturSebelumnya = () => {
  const navigate = useNavigate();
  const { getBorder, middleTheme } = useTheme();

  const level = [
    {
      id: 1,
      nameLevel: "Level 1 Sapphire",
      status: "",
      link : "/progress/level/penghargaan",
      icon: <img src="/emerald.png" alt="" />,
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
      <div>
        <div className="flex flex-col flex-grow  p-5">
          <div className="flex gap-2  items-center">
            <FaArrowLeft onClick={() => navigate(-1)} />
            <h1 className="font-semibold text-xl">Level Donatur Sebelumnya</h1>
          </div>
          {/* level */}
          <div className="flex flex-col gap-y-5 mt-7">
            {level.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(item.link)}
                className={`flex flex-col border p-3 rounded-xl ${
                  item.id === 1
                    ? "border-[#50C878] bg-[#D9FFF0]"
                    : "border-[#0961F5] bg-[#E1EBFF]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h1 className="flex items-center gap-1">
                    {item.icon}{" "}
                    <span className="text-base font-medium">
                      {item.nameLevel}
                    </span>
                  </h1>
                  <h2 className="text-base font-medium">{item.status}</h2>
                </div>
                <p className="text-xs font-normal mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <hr className="text-white font-bold  border-[5px] mt-5" />

        {/* level1 */}
        {/* <div className="p-3 flex flex-col gap-y-3 mt-5">
          {level1.map((item) => (
            <div
              onClick={() => navigate(item.link)}
              key={item.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 mx-1">
                <span className={`text-5xl w-12 h-16 mt-2`}>{item.image}</span>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center ">
                    <span className="text-base font-base ">{item.name}</span>
                    <span className="text-[8px] -mt-2 bg-[#0961F5] p-1 text-white px-1 h-4 w-4 flex items-center justify-center text-center rounded-full">
                      {item.score}
                    </span>
                  </div>

                  <span className="text-sm text-[#777777] font  ">
                    {item.ket}
                  </span>
                </div>
              </div>
              <span className="text-3xl  font-medium">{item.symbol}</span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DonaturSebelumnya;
