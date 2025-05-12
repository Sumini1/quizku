import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaAffiliatetheme } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdNotificationsActive, MdEmail } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";
import { FaUsers, FaPersonCircleQuestion } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { AiFillSafetyCertificate } from "react-icons/ai";
import ButtonNavbar from "../../../Components/ListButton/ButtonNavbar";
import { useTheme } from "../../../Context/ThemeContext";
import { TbLogout } from "react-icons/tb";
import { PiCertificateFill } from "react-icons/pi";
import { IoColorPalette } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../../Features/Auth/Reducer/loginSlice";
import Swal from "sweetalert2";

const Settings = () => {
  const navigate = useNavigate();
  const { theme, middleTheme } = useTheme();
  const dispatch = useDispatch();
  // Handler logout pada komponen - Versi yang Diperbaiki
  const handleLogout = async () => {
    const userId = localStorage.getItem("id");

    try {
      // Panggil API terlebih dahulu selama token masih valid
      await dispatch(fetchLogout()).unwrap();

      // Hapus localStorage hanya setelah API call berhasil
      if (userId) {
        localStorage.removeItem(`loginCount_${userId}`);
      }
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("token");

      Swal.fire({
        icon: "success",
        title: "Berhasil logout",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout API gagal:", error);

      // Tampilkan pesan error yang spesifik
      Swal.fire({
        icon: "error",
        title: "Gagal logout dari server",
        text:
          error?.message || "Token sudah tidak valid atau telah diblacklist",
      });

      // Jika API gagal, tetap hapus data di localStorage sebagai fallback
      if (userId) {
        localStorage.removeItem(`loginCount_${userId}`);
      }
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem("token");

      navigate("/");
    }
  };

  const listSettings = [
    {
      id: 1,
      name: "Profil",
      icon: <FaUserAlt />,
      link: "/profil",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      name: "Notifikasi",
      icon: <MdNotificationsActive />,
      link: "/notifikasi",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 3,
      name: "Tampilan",
      icon: <IoColorPalette />,
      link: "/tampilan",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 4,
      name: "Sertifikat",
      link: "/sertifikat",
      icon: <PiCertificateFill />,
      symbol: <RiArrowRightSLine />,
    },
  ];

  const dukungan = [
    {
      id: 1,
      name: "Dukung Kami",
      icon: <BiSolidDonateHeart />,
      link: "/dukung-kami",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      name: "Gabung berikan kontribusi",
      icon: <FaUsers />,
      link: "/kontributor",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 3,
      name: "Profil Dukungan Pengguna",
      icon: <img src="/dukung.png" alt="" />,
      link: "/profil-pengguna",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 4,
      name: "Kerjasama",
      icon: <img src="/handshake.png" alt="" />,
      link: "/kontribusi",
      symbol: <RiArrowRightSLine />,
    },
  ];

  const lainnya = [
    {
      id: 1,
      name: "Website",
      icon: <TbWorldWww />,
      link: "/website",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 2,
      name: "Tanya Jawab",
      icon: <FaPersonCircleQuestion />,
      link: "/tanya-jawab",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 3,
      name: "Saran dan Masukan",
      icon: <MdEmail />,
      link: "/saran-masukan",
      symbol: <RiArrowRightSLine />,
    },
    {
      id: 4,
      name: "Ketentuan dan Keamanan",
      icon: <AiFillSafetyCertificate />,
      link: "/ketentuan-keamanan",
      symbol: <RiArrowRightSLine />,
    },
  ];
  const getThemeClass = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white  rounded-lg p-3"
      : theme === "cupcake"
      ? "bg-pink-500 text-white rounded-lg p-3"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white rounded-lg p-3"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white  rounded-lg p-3"
      : "bg-[#F4F4F4] text-[#222]  rounded-lg p-3";
  };

  const keluar = [
    {
      id: 1,
      name: "Keluar",
      icon: <TbLogout />,
      link: "/",
      symbol: <RiArrowRightSLine />,
    },
  ];
  return (
    <div className="relative min-h-screen w-full ">
      <div
        className={`flex flex-col text-xl md:px-5 max-w-md mx-auto w-full pb-20 ${middleTheme()}`}
      >
        <div className="p-5 pb-0 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-5 mt-3">Lainnya</h1>

          <div className="mb-5">
            <h2 className="text-lg font-medium mb-3">Akun</h2>
            <div className={`${getThemeClass()}`}>
              {listSettings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(item.link)}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="flex items-center gap-4 mx-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base font-base">{item.name}</span>
                  </div>
                  <span className="text-3xl">{item.symbol}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h2 className="font-medium text-lg mb-3">Dukungan</h2>
            <div className={`p-1 ${getThemeClass()}`}>
              {dukungan.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="flex items-center gap-4 mx-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base font-base">{item.name}</span>
                  </div>
                  <span className="text-3xl">{item.symbol}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <h2 className="font-medium text-lg mb-3">Lainnya</h2>
            <div className={`p-2 ${getThemeClass()}`}>
              {lainnya.map((item) => (
                <Link
                  to={item.link}
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="flex items-center gap-4 mx-1">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-base font-base">{item.name}</span>
                  </div>
                  <span className="text-3xl">{item.symbol}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={`p-2 ${getThemeClass()}`}>
            {keluar.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                onClick={handleLogout}
                className="flex items-center justify-between gap-4 p-1 py-1"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base font-base">{item.name}</span>
                </div>
                <span className="text-3xl">{item.symbol}</span>
              </Link>
            ))}
          </div>

          <div className="mt-2 mb-3">
            <h1 className="text-lg font-semibold">Quizz App</h1>
            <p className="text-sm">Version 1.00</p>
          </div>
        </div>
      </div>

      {/* Navbar tetap di bawah */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-50">
        <ButtonNavbar />
      </div>
    </div>
  );
};

export default Settings;
