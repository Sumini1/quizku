import React, { useState } from 'react';
import { MdOutlineError } from "react-icons/md";
import { useTheme } from '../../../../Context/ThemeContext';
import { MdArrowForwardIos } from "react-icons/md";
import gambar from "../../../../assets/beranda/toko.png";
import books from "../../../../assets/beranda/book.png";
import reading from "../../../../assets/jelajahAplikasi/reading.png";
import progress1 from "../../../../assets/jelajahAplikasi/progress.png";
import settings from "../../../../assets/jelajahAplikasi/Settings.png";
import tampilan from "../../../../assets/jelajahAplikasi/tampilan.png";
import website from "../../../../assets/beranda/website.png";

const List = () => {
    const {
      theme,
      getTextTitle,
      borderColor,
      getIconColorAlert,
      getTextTitle1,
    } = useTheme();
const [isSearchActive, setIsSearchActive] = useState(false);

// Bagian List
  const navigasiUtamaList = [
    {
      id: 1,
      name: "Beranda",
      title: "Halaman Utama Quiz App",
      icon: <img src={gambar} alt="gambar"  />,
    },
    {
      id: 2,
      name: "Pembelajaran",
      title: "Mode utama yang tersedia",
      icon: <img src={books} alt="books"  />,
    },
    {
      id: 3,
      name: "Belajar Sekarang",
      title: "Pembelajaran mode utama yang sedang dipelajari",
      icon: <img src={reading} alt=""  />,
    },
    {
      id: 4,
      name: "Progress",
      title: "Statistik yang telah tercatat selama user pembelajaran",
      icon: <img src={progress1} alt="progress"  />,
    },
    {
      id: 5,
      name: "Pengaturan",
      title: "Pengaturan mengenai akun dan aplikasi",
      icon: <img src={settings} alt="settings"  />,
    },
    {
      id: 6,
      name: "Tampilan",
      title: "Pengaturan tampilan seperti tema, warna, ikon dan tampilan lain",
      icon: <img src={tampilan} alt="tampilan"  />,
    },
    {
      id: 7,
      name: "Beranda",
      title: "Tempat untuk memposting informasi lengkap quiz app",
      icon: <img src={website} alt="website"  />,
    },
  ];
    return (
      <div>
        <div className="flex flex-col p-5">
          {isSearchActive && (
            <div className="relative mb-10 flex items-center w-full bg-[#EEEEEE] border border-gray-300 rounded-xl p-2 -mt-7 ">
              <input
                type="text"
                placeholder="Cari warna belajar..."
                className="bg-transparent w-full pl-10 rounded-xl outline-none m"
              />
              <IoSearch className="absolute left-3 text-xl text-gray-500 -mt-1 md:-mt-0" />
            </div>
          )}
        </div>
        <>
          <div className="flex flex-col">
            <div className="flex flex-col  p-5">
              <div className="flex -mt-16">
                <h2 className="text-lg font-semibold">Navigasi Utama</h2>
                <MdOutlineError className={`${getIconColorAlert()}`} />
              </div>
              <div className="flex flex-col ">
                {navigasiUtamaList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2"
                  >
                    {/* Bagian Kiri: Ikon dan Teks */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Ikon */}
                      <span className="flex items-center w-[40px] h-[50px]">
                        {item.icon}
                      </span>

                      {/* Teks Name & Title */}
                      <div className="flex flex-col flex-1 min-w-0 text-start">
                        <h1 className="font-medium text-sm">{item.name}</h1>
                        <p className="text-xs font-normal  ">{item.title}</p>
                      </div>
                    </div>

                    {/* Panah Navigasi (Tidak akan terdorong keluar) */}
                    <MdArrowForwardIos className="text-lg shrink-0  items-center  flex mt-3" />
                  </div>
                ))}
              </div>
            </div>
            <hr className="w-full text-[#EEEEEE] font-bold  border-[6px] m-0 mb-5 " />
          </div>
        </>
      </div>
    );
};

export default List;