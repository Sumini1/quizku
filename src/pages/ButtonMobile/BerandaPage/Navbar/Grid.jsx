import React, { useState } from 'react';
import { useTheme } from '../../../../Context/ThemeContext';
import { MdOutlineError } from "react-icons/md";
import gambar from "../../../../assets/beranda/toko.png"
import books from "../../../../assets/beranda/book.png"
import reading from "../../../../assets/jelajahAplikasi/reading.png"
import papan from "../../../../assets/jelajahAplikasi/papan.png"
import settings from "../../../../assets/jelajahAplikasi/Settings.png"
import tampilan from "../../../../assets/jelajahAplikasi/tampilan.png"
import progress1 from "../../../../assets/jelajahAplikasi/progress.png"
import website from "../../../../assets/beranda/website.png"
import dukungan1 from "../../../../assets/jelajahAplikasi/dukungan.png"
import laporan from "../../../../assets/jelajahAplikasi/laporan.png"
import donasi from "../../../../assets/themes_or_levels/donasi.png"
import people from "../../../../assets/beranda/people.png"
import kerjasama from "../../../../assets/jelajahAplikasi/kerjasama.png"
import notif from "../../../../assets/beranda/notifikasi.png"
import new1 from "../../../../assets/jelajahAplikasi/new.png"
import quran from "../../../../assets/beranda/quran.png"
import kaaba from "../../../../assets/beranda/kaaba.png"
import tematik from "../../../../assets/beranda/tematik.png"
import artikel1 from "../../../../assets/beranda/artikel.png"
import kuiskilat from "../../../../assets/beranda/kuiskilat.png"
import tantangan from "../../../../assets/beranda/tantangan.png"
import lainnya1 from "../../../../assets/beranda/lainnya.png"
import lencana from "../../../../assets/beranda/lencana.png"
import pangkat from "../../../../assets/jelajahAplikasi/pangkat.png"
import profil from "../../../../assets/jelajahAplikasi/profil.png"
import sertifikat from "../../../../assets/jelajahAplikasi/sertifikat.png"
import tanyaJawab from "../../../../assets/jelajahAplikasi/tanyaJawab.png"
import feedback from "../../../../assets/jelajahAplikasi/feedback.png"
import ketentuan from "../../../../assets/jelajahAplikasi/ketentuan.png"
import pertemanan from "../../../../assets/jelajahAplikasi/pertemanan.png"

const Grid = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const {
      borderColor,
      theme,
      getIconColorAlert,
      getTextTitle,
      getTextTitle1,
    } = useTheme();
     const navigasiUtama = [
       {
         id: 1,
         name: "Beranda",
         icon: <img src={gambar} alt="gambar" />,
       },
       {
         id: 2,
         name: "Pembelajaran",
         icon: <img src={books} alt="books" />,
       },
       {
         id: 3,
         name: "Belajar Sekarang",
         icon: <img src={reading} alt="readings" />,
       },
       {
         id: 4,
         name: "Progress",
         icon: <img src={papan} alt="papan" />,
       },
       {
         id: 5,
         name: "Pengaturan",
         icon: <img src={settings} alt="settings" />,
       },
       {
         id: 6,
         name: "Tampilan",
         icon: <img src={tampilan} alt="tampilan" />,
       },
       {
         id: 7,
         name: "Progress",
         icon: <img src={progress1} alt="progress" />,
       },
       {
         id: 8,
         name: "Website",
         icon: <img src={website} alt="progress" />,
       }

     ];
      const dukungan = [
        {
          id: 1,
          name: "Toko",
          icon: <img src={gambar} alt="gambar"  />,
        },
        {
          id: 2,
          name: "Dukungan Pengguna",
          icon: <img src={dukungan1} alt="dukungan"  />,
        },
        {
          id: 3,
          name: "Laporan Dukungan",
          icon: <img src={laporan} alt="laporan"  />,
        },
        {
          id: 4,
          name: "Dukungan Kami",
          icon: <img src={donasi} alt="donasi"  />,
        },
        {
          id: 5,
          name: "Kontributor",
          icon: <img src={people} alt="people"  />,
        },
        {
          id: 6,
          name: "Kerjasama",
          icon: <img src={kerjasama} alt="kerjasama"  />,
        },
      ];
      const menuUtama = [
        {
          id: 1,
          name: "Notifikasi",
          icon: <img src={notif} alt="notifikasi"  />,
        },
        {
          id: 2,
          name: "Sedang Dipelajari",
          icon: <img src={progress1} alt=""  />,
        },
        {
          id: 3,
          name: "Materi Terbaru",
          icon: <img src={new1} alt="new"  />,
        },
      ];
    
      const modeBelajar = [
        {
          id: 1,
          name: "Mode Utama",
          icon: <img src={books} alt="books"  />,
        },
        {
          id: 2,
          name: "Qur'an Hadist",
          icon: <img src={quran} alt=""  />,
        },
        {
          id: 3,
          name: "Agenda Spesial",
          icon: <img src={kaaba} alt="kaaba"  />,
        },
        {
          id: 4,
          name: "Tematik Pilihan",
          icon: <img src={tematik} alt="tematik"  />,
        },
        {
          id: 5,
          name: "Artikel",
          icon: <img src={artikel1} alt="artikel"  />,
        },
        {
          id: 6,
          name: "Kuis Kilat 1 menit",
          icon: <img src={kuiskilat} alt="kuiskilat"  />,
        },
        {
          id: 7,
          name: "Ikuti Tantangan",
          icon: <img src={tantangan} alt="tantangan"  />,
        },
        {
          id: 8,
          name: "Mode Lainnya",
          icon: <img src={lainnya1} alt="lainnya"  />,
        },
      ];
    
      const progress = [
        {
          id: 1,
          name: "Lencana",
          icon: <img src={lencana} alt="lencana"  />,
        },
        {
          id: 2,
          name: "Statistik",
          icon: <img src={progress1} alt="progress"  />,
        },
        {
          id: 3,
          name: "Pangkat",
          icon: <img src={pangkat} alt="pangkat"  />,
        },
       
      ];
    
      const lainnya = [
        {
          id: 1,
          name: "Profile",
          icon: <img src={profil} alt="profil" />,
        },
        {
          id: 2,
          name: "Sertifikat",
          icon: <img src={sertifikat} alt="sertifikat" />,
        },
        {
          id: 3,
          name: "Tanya Jawab",
          icon: <img src={tanyaJawab} alt="tanyajawab" />,
        },
        {
          id: 4,
          name: "Pertemanan",
          icon: <img src={pertemanan} alt="pertemanan" />,
        },
        {
          id: 5,
          name: "Ketentuan",
          icon: <img src={ketentuan} alt="ketentuan" />,
        },
        {
          id: 6,
          name: "Saran dan Masukan",
          icon: <img src={feedback} alt="" />,
        },
      ];
    return (
      <div className="flex flex-col -mt-5">
        <div className="flex flex-col p-5 ">
          {isSearchActive && (
            <div className="relative flex items-center w-full bg-[#EEEEEE] border mb-3 border-gray-300 rounded-xl p-2  ">
              <input
                type="text"
                placeholder="Cari warna belajar..."
                className="bg-transparent w-full pl-10 rounded-xl outline-none m"
              />
              <IoSearch className="absolute left-3 text-xl text-gray-500" />
            </div>
          )}
          <div className="flex flex-col ">
            <div className="flex ">
              <h2 className="text-lg font-semibold">Navigasi Utama</h2>
              <MdOutlineError className={`${getIconColorAlert()}`} />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {navigasiUtama.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl  rounded-xl p-2 border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm  -mt-2  font-medium  w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />

        {/* dukungan */}
        <div className="flex flex-col p-5 bg-[#F8FFF6] pt-10 -mt-5 ">
          <div className="flex flex-col -mt-5">
            <div className={`flex  ${getTextTitle1()}`}>
              <h1 className="text-lg font-semibold">Dukungan</h1>
              <MdOutlineError />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {dukungan.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl p-2 rounded-xl border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm -mt-2  font-medium  w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />

        {/* Menu Utama */}
        <div className="flex flex-col p-5">
          <div className="flex flex-col -mt-5">
            <div className={`flex `}>
              <h2 className="text-lg font-semibold">Menu Utama</h2>
              <MdOutlineError className={`${getIconColorAlert()}`} />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {menuUtama.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl p-2 rounded-xl border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm -mt-2  font-medium  w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />

        {/* Mode Belajar */}
        <div className="flex flex-col p-5">
          <div className="flex flex-col -mt-5">
            <div className={`flex `}>
              <h2 className="text-lg font-semibold">Mode Belajar</h2>
              <MdOutlineError className={`${getIconColorAlert()}`} />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {modeBelajar.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl p-2 rounded-xl border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm -mt-2  font-medium  w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />

        {/* Progress */}
        <div className="flex flex-col p-5">
          <div className="flex flex-col -mt-5">
            <div className={`flex ${getTextTitle1()}`}>
              <h1 className="text-lg font-semibold">Progress</h1>
              <MdOutlineError />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {progress.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl p-2 rounded-xl border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm -mt-2  font-medium  w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />

        {/* Lainnya */}
        <div className="flex flex-col p-5">
          <div className="flex flex-col -mt-5">
            <div className={`flex ${getTextTitle1()}`}>
              <h5 className="text-lg font-semibold">Lainnya</h5>
              <MdOutlineError />
            </div>
            <div className="grid grid-cols-4 gap-3  mt-3 text-center ">
              {lainnya.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center   gap-3 "
                >
                  <div
                    className={`flex items-center justify-center w-[70px] h-[70px] text-3xl p-2 rounded-xl border-4 ${borderColor()} ${
                      theme === "dark" ? "text-white" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`text-center text-sm -mt-2  font-medium w-full ${getTextTitle()}`}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5  " />
      </div>
    );
};

export default Grid;