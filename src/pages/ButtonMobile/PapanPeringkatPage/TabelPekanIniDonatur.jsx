import React from "react";
import { useTheme } from "../../../Context/ThemeContext";
import point from "../../../assets/papanPeringkat/point.png";
import goldMedali from "../../../assets/papanPeringkat/goldMedali.png";
import bronzeMedali from "../../../assets/papanPeringkat/bronzeMedali.png";
import silverMedali from "../../../assets/papanPeringkat/silverMedali.png";
import pemula from "../../../assets/beranda/pemula.png";

const TabelPekanIniDonatur = () => {
  const { borderColor } = useTheme();
  const table = [
    {
      id: 1,
      icon: [
        <img
          key="medali"
          src={goldMedali}
          alt="Medali"
          className="w-6 h-6"
        />,
        <img
          key="pangkat"
          src={point}
          alt="Pangkat"
          className="w-6 h-6"
        />,
      ],

      name: "Muhammad",
      level: "lv-1",
      donate: 500000,
    },
    {
      id: 2,
      icon: [
        <img
          key="medali"
          src={bronzeMedali}
          alt="Medali"
          className="w-6 h-6"
        />,
        <img
          key="pangkat"
          src={point}
          alt="Pangkat"
          className="w-6 h-6"
        />,
      ],

      name: "Ibrahim",
      level: "lv-1",
      donate: 500000,
    },
    {
      id: 3,
      icon: [
        <img
          key="medali"
          src={silverMedali}
          alt="Medali"
          className="w-6 h-6"
        />,
        <img
          key="pangkat"
          src={pemula}
          alt="Pangkat"
          className="w-6 h-6"
        />,
      ],

      name: "Yusuf",
      level: "lv-1",
      donate: 500000,
    },
    {
      id: 4,
      icon: [
        <img
          key="pangkat"
          src={pemula}
          alt="Pangkat"
          className="w-6 h-6"
        />,
      ],

      name: "Ismail",
      level: "lv-1",
      donate: 500000,
    },
    {
      id: 5,
      icon: [
        <img
          key="pangkat"
          src={point}
          alt="Pangkat"
          className="w-6 h-6"
        />,
      ],
      symbol: <img src="/segitigaTurun.png" alt="" srcset="" />,
      name: "Budi",
      level: "lv-1",
      donate: 500000,
    },
  ];
  const formatToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className="flex flex-col gap-2 gap-y-3">
      {table.map((item) => (
        <div
          key={item.id}
          className={`flex justify-between items-center p-5 border-2 py-3 ${borderColor()}  rounded-xl`}
        >
          <div className="flex gap-2 items-center ">
            <p
              className={`text-sm font-normal bg-[#DDDDDD] p-3 w-5 h-5 rounded-full flex items-center justify-center ${
                item.id <= 3 ? "hidden" : ""
              }`}
            >
              {item.id}
            </p>

            <div className="flex gap-2">{item.icon}</div>
            <p className=" text-center">{item.name}</p>
            <p className=" text-center text-[9px] bg-[#83F9B6] p-2 w-7 h-5  rounded-xl whitespace-nowrap items-center flex justify-center">
              {item.level}
            </p>
          </div>
          <p className="w-16 items-center font-medium text-sm flex justify-center">
            {formatToIDR(item.donate)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TabelPekanIniDonatur;
