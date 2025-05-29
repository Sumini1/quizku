import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../../Context/ThemeContext";
import lencana from "../../../../../assets/beranda/lencana.png";
import moneyBag from "../../../../../assets/lainnya/moneyBag.png";
import donationBag from "../../../../../assets/lainnya/donationBag.png";
import gift from "../../../../../assets/lainnya/Gift.png";
import reportFile from "../../../../../assets/lainnya/reportFile.png";

const ProfilPengguna = () => {
  const navigate = useNavigate();
  const { middleTheme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()}`}
      >
        <div
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 mt-5 px-5 text-lg mb-8"
        >
          <FaArrowLeft />
          <h1 className="font-semibold">Profil Dukungan Pengguna</h1>
        </div>

        {/* Content */}
        <div className="flex flex-col m-4 mt-1 gap-3 px-3 bg-[#DCE6F8] p-5 rounded-xl border-[2px] border-[#0961F5]">
          <h1 className="text-lg font-[500]">Sdr. Agus Widodo</h1>
          <div className="flex items-center gap-3 bg-[#FFF] rounded-xl py-2 px-2 w-[240px]">
            <img src={lencana} alt="Prize" className="w-6 h-6" />
            <h5 className="text-sm font-base">Level Donatur : Pendukung</h5>
          </div>
          <Link to={"/riwayat-donasi"}>
            <div className="flex items-center gap-3 bg-[#FFF] mb-10 rounded-xl py-2 px-2 w-full ">
              <img src={moneyBag} alt="Money Bag" className="w-6 h-6" />
              <h5 className="text-sm font-base">
                Kontribusi: Rp. 45.000 | 45 Soal Materi
              </h5>
            </div>
          </Link>
          <p className="text-sm font-normal -mt-7">
            Jaazakumullah khair terimakasih atas segala kontribusinya.
          </p>
        </div>

        <div className="-mt-3">
          {/* Kotak 1*/}
          <div className="flex flex-col m-4 gap-3 px-3  p-5 rounded-xl border-[1px] border-[#28A745]">
            <h1 className="text-[#28A745] font-[500] text-base">
              Daftar Sekarang
            </h1>
            <div className="flex gap-3">
              <p className="font-normal text-sm">
                Tingkatkan partisipasi anda dalam perkembangan dakwah Quiz App.
              </p>
              <img
                src={donationBag}
                alt="donation"
                className="-mt-10 w-[80px] h-[80px]"
              />
            </div>
          </div>
          {/* Kotak 2 */}
          <div className="flex flex-col m-4 gap-3 px-3  p-5 rounded-xl border-[1px] border-[#F59D09]">
            <h1 className="text-[#F59D09] font-[500] text-base">
              Hadiah Apresiasi
            </h1>
            <div className="flex gap-3">
              <p className="font-normal text-sm">
                Apresiasi tertinggi kepada para donatur berupa hadiah istimewa.
              </p>
              <img src={gift} alt="gift" className="-mt-10 w-[80px] h-[80px]" />
            </div>
          </div>
          {/* Kotak 3 */}
          <div className="flex flex-col m-4 gap-3 px-3  p-5 rounded-xl border-[1px] border-[#0961F5]">
            <h1 className="text-[#0961F5] font-[500] text-base">
              Laporan Dukungan
            </h1>
            <div className="flex gap-3">
              <p className="font-normal text-sm">
                Laporan dukungan dari para donatur sebagai pertanggungjawaban.
              </p>
              <img
                src={reportFile}
                alt="report"
                className="-mt-10 w-[80px] h-[80px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPengguna;
