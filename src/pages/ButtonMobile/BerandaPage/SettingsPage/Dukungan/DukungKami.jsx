import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPrayingHands } from "react-icons/fa";
import berita from "../../../../../assets/lainnya/berita.png";
import doaHarapan from "../../../../../assets/lainnya/doaHarapan.png"
import informasi from "../../../../../assets/lainnya/informasi.png";
import latar from "../../../../../assets/lainnya/latar.png";
import love from "../../../../../assets/lainnya/love.png";
import riwayat from "../../../../../assets/lainnya/riwayat.png";
import sertifikatNilai from "../../../../../assets/lainnya/sertifikatNilai.png"
import lencana from "../../../../../assets/beranda/lencana.png";
import point from "../../../../../assets/papanPeringkat/point.png";
import pemula from "../../../../../assets/beranda/pemula.png";

const DukungKami = () => {
  const navigate = useNavigate();
  const {
    getLatarBeranda,
    getIconTheme,
    getButtonClass,
    getTextTitle1,
    borderColor,
    middleTheme
  } = useTheme();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const category = [
    { id: 1, name: "Informasi", link: "/semua" },
    { id: 2, name: "Latar Belakang", link: "/pengingat" },
    { id: 3, name: "Penghargaan", link: "/informasi" },
    { id: 4, name: "Riwayat Dana", link: "/iklan" },
    { id: 5, name: "Donatur", link: "/umum" },
    { id: 6, name: "Doa", link: "/umum" },
    { id: 7, name: "Hadiah Apresiasi", link: "/umum" },
  ];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let anyVisible = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anyVisible = true;
            setActiveCategory(entry.target.getAttribute("data-category"));
          }
        });
        setIsScrolled(!anyVisible); // Geser navbar jika tidak ada section yang terlihat
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[data-category]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (categoryName) => {
    setActiveCategory(categoryName);
    const section = document.querySelector(`[data-category="${categoryName}"]`);
    if (section) {
      const offset = 80; // Sesuaikan dengan tinggi navbar
      const elementPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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

  const donate = [
    {
      id: 1,
      name: "Ibrahim",
      score: 100,
      level: "Lv-1",
      time: "3 hari yang lalu",
      description:
        "Semoga Allah ta’ala mudahkan kita dalam menuntut ilmu agama. Allah ta’ala berikan kemudahan bagi kita semua terutama bagi orang-orang yang sedang kesulitan agar dilancarkan usahanya.",
    },
    {
      id: 2,
      name: "Aisyah",
      score: 100,
      level: "Lv-1",
      time: "3 hari yang lalu",
      description:
        "Semoga Allah ta’ala mudahkan kita dalam menuntut ilmu agama. Allah ta’ala berikan kemudahan bagi kita semua terutama bagi orang-orang yang sedang kesulitan agar dilancarkan usahanya.",
    },
  ];

  const penghargaan = [
    {
      id: 1,
      name: "Berita",
      title: "Update berita terbaru",
      point: 100,
      link: "/dukung-kami/berita",
      image: <img src={berita} alt="" />,
    },
    {
      id: 2,
      name: "Riwayat Dana",
      title: "Update pemanfaatan dana",
      point: 10,
      link: "/dukung-kami/riwayat-dana",
      image: <img src={riwayat} alt="" />,
    },
  ];
  return (
    <>
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          className={`flex flex-col ${getLatarBeranda()} flex-grow h-[250px]`}
        >
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
          >
            <FaArrowLeft />
            <h1 className="font-semibold text-xl">Dukung Kami</h1>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Donasi Section */}
          <div className="flex flex-col p-5">
            <div className="flex gap-2">
              <BiSolidDonateBlood className={`text-2xl ${getIconTheme()}`} />
              <h2 className="font-[500] text-lg">
                Donasi Perkembangan Aplikasi ( 1 )
              </h2>
            </div>
            <p className="text-sm font-normal mt-3">
              Abadikan harta dengan partisipasi pembuatan 10.000 soal & materi
              dalam mendukung pendidikan dan dakwah islam.
            </p>
            <p className="flex mt-3 text-xs">
              Terkumpul:{" "}
              <span className={`ml-2 ${getTextTitle1()}`}>Rp.5.000.000</span>
            </p>
            <div className="flex justify-between mt-1">
              <p className="flex text-xs">
                Dibutuhkan:{" "}
                <span className={`ml-2 ${getIconTheme()}`}>Rp.5.000.000</span>
              </p>
              <p className="text-xs font-normal">
                Sisa hari: <span className="text-xs font-bold">20</span>
              </p>
            </div>
            <div className="flex items-center w-full mt-3 mb-2">
              <div className="h-2 w-1/5 bg-orange-500 rounded-l-xl p-2"></div>
              <div className="h-2 w-4/5 bg-[#EEEEEE] rounded-r-xl p-2"></div>
            </div>
          </div>

          {/* Category Navigation */}
          <div
            className={`overflow-x-auto whitespace-nowrap pb-4 flex gap-1 px-2 scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack sticky top-0 z-50 bg-white   `}
          >
            {category.map((item) => (
              <div
                key={item.id}
                onClick={() => scrollToSection(item.name)}
                className="px-3 py-2 rounded-full flex-shrink-0 transition-opacity duration-700 ease-in-out cursor-pointer"
              >
                <h5
                  className={`font-normal text-sm underline underline-offset-8 ${
                    activeCategory === item.name ? "text-[#0961F5]" : ""
                  }`}
                >
                  {item.name}
                </h5>
              </div>
            ))}
          </div>

          <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5 mt-4" />

          {/* Informasi Section */}
          <div data-category="Informasi" className="flex flex-col p-5 -mt-2">
            <div className="flex gap-2">
              <img src={informasi} alt="informasi" />
              <h2 className="text-lg font-[500]">Informasi</h2>
            </div>

            <p className="text-sm font-normal mt-2">
              Donasi dipergunakan untuk 2 kebutuhan utama
            </p>
            <ol className="list-decimal mx-3">
              <li className="text-xs font-normal">
                Membangun sistem pendidikan, teknologi, pengelolaan dan
                komunitas.
              </li>
              <li className="text-xs font-normal">
                Pembuatan 10.000 soal dan materi pendidikan islam dan bahasa
                arab.
              </li>
            </ol>
            <div
              onClick={() => navigate("/dukung-kami/informasi")}
              className={`flex justify-between items-center mt-5 border-2 p-2 px-2 rounded-xl ${borderColor()}`}
            >
              <p className="text-xs font-normal items-center">
                Informasi selengkapnya
              </p>
              <MdOutlineArrowForwardIos className="text-md font-bold items-center ml-auto" />
            </div>
          </div>

          {/* Latar Belakang Section */}
          <div
            data-category="Latar Belakang"
            className="flex flex-col p-5 -mt-5"
          >
            <div
              onClick={() => navigate("/dukung-kami/latar-belakang")}
              className="flex gap-2"
            >
              <img src={latar} alt="latar" className="flex items-center" />
              <div className="flex flex-col mt-1">
                <p className="flex items-center text-sm">
                  Latar Belakang, tujuan, visi dan misi
                </p>
                <h5 className="text-xs text-[#777] items-center">
                  Latar Belakang, tujuan, visi dan misi
                </h5>
              </div>
              <MdOutlineArrowForwardIos className="text-md font-bold items-center mt-3 ml-auto" />
            </div>
          </div>

          <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5 mt-4" />

          {/* Penghargaan Section */}
          <div data-category="Penghargaan" className="flex flex-col -mt-2">
            <div className="flex flex-col p-5">
              <div className="flex gap-2">
                <img src={lencana} alt="lencana" />
                <h2 className="text-lg font-[500]">Penghargaan</h2>
              </div>
              <p className="text-sm font-normal mt-2">
                Kami sediakan berbagai macam penghargaan yaitu lencana dan
                berbagai macam hadiah seperti warna, tema dan icon spesial
                sebagai bentuk apresiasi tertinggi
              </p>
              <div
                className={`flex justify-between border-2 ${borderColor()} p-2 px-2 rounded-xl mt-5`}
              >
                <p className="text-xs font-normal items-center">
                  Lihat penghargaan dan hadiah
                </p>
                <MdOutlineArrowForwardIos />
              </div>
              {penghargaan.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.link)}
                  className={`flex justify-between items-center mt-7 gap-2 gap-y-1 `}
                >
                  <h1>{item.image}</h1>
                  <div className="flex flex-col">
                    <p className="text-sm font-normal  flex items-center">
                      {item.name}{" "}
                      <span className="text-[8px] text-white ml-2 bg-[#0961F5] rounded-full px-2">
                        {item.point}
                      </span>
                    </p>
                    <h5 className="text-xs text-[#777] font-normal items-center">
                      {item.title}
                    </h5>
                  </div>
                  <MdOutlineArrowForwardIos className="text-md font-bold items-center ml-auto" />
                </div>
              ))}
            </div>
          </div>

          <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5 mt-4" />

          {/* Donatur Section */}
          <div data-category="Donatur" className="flex flex-col">
            <div className="flex flex-col p-5 -mt-2">
              <div className="flex items-center gap-2">
                <FaHeart className={`${getIconTheme()} text-xl`} />
                <h2 className="text-lg font-[500]">Donatur</h2>
              </div>
              <p className="mt-2 text-sm font-normal">
                Jaazakumullah khair kepada para donatur. Semoga Allah ta'ala
                ganti dengan yang jauh lebih baik lagi
              </p>
            </div>

            <div className="flex flex-col p-5 -mt-5">
              <div className="overflow-x-auto rounded-lg shadow ">
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
                  <tr className="bg-gray-100">
                    <td
                      colSpan="2"
                      className="px-5 py-4 text-sm text-gray-700 font-semibold"
                    >
                      Lihat seluruh donatur
                    </td>
                    <td></td>
                    <td className=" py-4 text-sm text-gray-700 font-semibold flex">
                      {/* Jumlah kontribusi, misalnya dari data donatur */}
                      <FaArrowRightLong className="mt-1 text-xl ml-5" />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <hr className="w-full text-[#EEEEEE] font-bold border-[6px] m-0 mb-5 mt-4" />

            {/* Doa dan Harapan */}
            <div data-category="Doa" className="flex flex-col">
              <div className="flex flex-col p-5">
                <div className="flex gap-2 items-center -mt-2">
                  <FaPrayingHands className={`${getIconTheme()} text-xl`} />
                  <h2 className="text-lg font-[500]">Do'a dan Harapan</h2>
                </div>
                <p className="text-sm font-normal mt-2">
                  Semoga doa dan harapan kita semua akan Allah ta’ala mudahkan
                </p>
              </div>
              {donate.map((item) => (
                <div
                  key={item.id}
                  className={`flex -mt-1  flex-col border-2  m-5 p-5 rounded-xl ${borderColor()}`}
                >
                  <div className="flex justify-between">
                    <p className="flex items-center gap-2 -mt-3 mb-2">
                      <img src={pemula} alt="" />
                      <span className="text-xs font-medium">{item.name}</span>
                      <span className="text-[7px] px-2 p-1 bg-[#F9C883] rounded-lg">
                        {item.score}
                      </span>
                      <span className="text-[8px] bg-[#83F9B6] px-2 p-1 rounded-lg">
                        {item.level}
                      </span>
                    </p>
                    <h5 className="text-xs font-normal text-[#777]">
                      {item.time}
                    </h5>
                  </div>
                  <p className="text-xs font-normal">{item.description}</p>
                </div>
              ))}
              <div
                className={`flex mx-5 border-2 items-center px-2 rounded-xl p-2  justify-between ${borderColor()}`}
              >
                <p className="text-xs mx-1 font-medium">
                  Doa dan harapan lainnya
                </p>
                <MdOutlineArrowForwardIos className="mt-1  text-lg ml-16" />
              </div>
              <button
              onClick={() => navigate("/progress/donasi-sekarang")}
                className={`${getButtonClass()} border-none p-3 m-5 mt-10 mb-5 `}
              >
                Donasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DukungKami;
