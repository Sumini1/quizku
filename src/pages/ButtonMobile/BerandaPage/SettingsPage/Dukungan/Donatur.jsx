import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { IoIosArrowForward } from "react-icons/io";
import { BiSolidTimeFive } from "react-icons/bi";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaArrowDownShortWide } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import point from "../../../../../assets/papanPeringkat/point.png";
import pemula from "../../../../../assets/beranda/pemula.png";

const Donatur = () => {
  const navigate = useNavigate();
  const { borderColor, getButtonClass, getTextTitle1, getBorder, middleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("terbaru");

  const tabs = [
    {
      id: "terbaru",
      icon: <MdArrowOutward className="w-[20px] h-[20px] " />,
    },
    {
      id: "tertinggi",
      icon: <FaArrowDownShortWide className="w-[20px] h-[20px] " />,
    },
    {
      id: "tanggal",
      icon: <BsFillCalendar2DateFill className="w-[20px] h-[20px] " />,
    },
  ];

  const information = [
    {
      id: 1,
      date: "Januari 2025",
      income: 5000000,
      link: "/dukung-kami/informasi/riwayat-update-dana-januari",
    },
    {
      id: 2,
      date: "Februari 2025",
      income: 6000000,
      link: "/dukung-kami/informasi/riwayat-update-dana-februari",
    },
    {
      id: 3,
      date: "Maret 2025",
      income: 7000000,
      link: "/dukung-kami/informasi/riwayat-update-dana-maret",
    },
  ];
  const getScoreColor = (score) => {
    if (score >= 100) return "bg-yellow-200";
    if (score >= 50) return "bg-pink-200";
    return "bg-gray-200";
  };

  const getLevelColor = (level) => {
    return "bg-emerald-200";
  };
  const formatToIDR = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(price);
  };
  const donatur = [
    {
      id: 1,
      name: "Muhammad",
      score: 100,
      soal: 50,
      price: 500000,
      image: pemula,
      level: "lv-1",
    },
    {
      id: 2,
      name: "Yahya",
      score: 100,
      soal: 50,
      price: 500000,
      image: point,
      level: "lv-2",
    },
    {
      id: 3,
      name: "Fatimah",
      score: 100,
      soal: 50,
      price: 500000,
      image: point,
      level: "lv-2",
    },
    {
      id: 4,
      name: "Aisyah",
      score: 100,
      soal: 50,
      price: 500000,
      image: point,
      level: "lv-2",
    },
  ];
  return (
    <div className="flex flex-col  min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div className="flex flex-col p-5">
          <div onClick={() => navigate(-1)} className="flex gap-2 items-center">
            <FaArrowLeft
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-semibold">Donatur</h1>
          </div>
          <div
            className={`flex gap-3 mt-7 text-sm font-normal justify-between ${getBorder()}`}
          >
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
        flex items-center gap-2 text-sm font-medium p-2 rounded-full transition-all duration-300 flex-1
        ${
          activeTab === tab.id
            ? `${getButtonClass()} border-[#DCE6F8] px-4 border-[2px] justify-center text-white`
            : "bg-transparent justify-center border-gray-300"
        } cursor-pointer
      `}
              >
                {tab.icon}
                <span>
                  {tab.id
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
            ))}
          </div>

          {/* Terbaru */}
          {activeTab === "terbaru" && (
            <div className="flex flex-col">
              <div className="overflow-x-auto rounded-lg shadow mt-7">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 border-b text-xs">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        No
                      </th>
                      <th className="px-2 py-2 text-left font-semibold text-gray-700">
                        Nama
                      </th>
                      <th className="px-5 py-2 text-left font-semibold text-gray-700">
                        Donasi Soal
                      </th>
                      <th className=" py-2 text-left font-semibold text-gray-700 ">
                        Nominal (Rupiah)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 text-xs">
                    {donatur.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-700">{item.id}</td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <img
                              src={item.image}
                              alt=""
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-normal">{item.name}</span>
                            <span
                              className={`text-[8px] px-1 py-0.5 rounded-lg ${getScoreColor(
                                item.score
                              )}`}
                            >
                              {item.score}
                            </span>
                            <span
                              className={`text-[8px] px-1 py-0.5 whitespace-nowrap rounded-lg ${getLevelColor(
                                item.level
                              )}`}
                            >
                              {item.level}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-2">
                          <a href="#" className="text-blue-600">
                            {item.soal}
                          </a>
                        </td>
                        <td className=" py-2 text-green-600 whitespace-nowrap">
                          {formatToIDR(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tertinggi */}
          {activeTab === "tertinggi" && (
            <div className="flex flex-col">
              <div className="overflow-x-auto rounded-lg shadow mt-7">
                <table className="w-full bg-white">
                  <thead>
                    <tr className="bg-gray-200 border-b text-xs">
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">
                        No
                      </th>
                      <th className="px-2 py-2 text-left font-semibold text-gray-700">
                        Nama
                      </th>
                      <th className="px-5 py-2 text-left font-semibold text-gray-700">
                        Donasi Soal
                      </th>
                      <th className=" py-2 text-left font-semibold text-gray-700 ">
                        Nominal (Rupiah)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 text-xs">
                    {donatur.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-gray-700">{item.id}</td>
                        <td className="px-2 py-2">
                          <div className="flex items-center gap-1">
                            <img
                              src={item.image}
                              alt=""
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="font-normal">{item.name}</span>
                            <span
                              className={`text-[8px] px-1 py-0.5 rounded-lg ${getScoreColor(
                                item.score
                              )}`}
                            >
                              {item.score}
                            </span>
                            <span
                              className={`text-[8px] px-1 py-0.5 whitespace-nowrap rounded-lg ${getLevelColor(
                                item.level
                              )}`}
                            >
                              {item.level}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-2">
                          <a href="#" className="text-blue-600">
                            {item.soal}
                          </a>
                        </td>
                        <td className=" py-2 text-green-600 whitespace-nowrap">
                          {formatToIDR(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* Tanggal */}
          {activeTab === "tanggal" && (
            <div className="flex flex-col mt-5">
              {information.map((item) => (
                <div
                  onClick={() => navigate(item.link)}
                  key={item.id}
                  className={`flex justify-between border-2 rounded-xl p-4 gap-2 mt-3 ${borderColor()}`}
                >
                  <div className="flex flex-col ">
                    <p className="text-sm font-semibold mb-1">{item.date}</p>
                    <p className="text-sm  flex">
                      {" "}
                      Dana Masuk :
                      <span className={`font-semibold ml-1 ${getTextTitle1()}`}>
                        {" "}
                        Rp {formatToIDR(item.income)}
                      </span>
                    </p>
                  </div>

                  <IoIosArrowForward className="text-xl items-center flex mt-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donatur;
