import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useTheme} from "../../../../Context/ThemeContext";
import dokument from "../../../../assets/progress/dokument.png";
import diamond from "../../../../assets/progress/diamond.png";

const DonasiPembayaran = () => {
  const navigate = useNavigate();
  const {middleTheme} = useTheme();

  const detailDonate = [
    { id: 1, description: "Nominal Donasi", total: 40000 },
    { id: 2, description: "Donasi Soal Materi", total: 5 },
    { id: 3, description: "Diamond Didapatkan", total: 40 },
    { id: 4, description: "Biaya Transaksi dan Server", total: 5000 },
  ];

  const formatToIDR = (price) => {
    return price.toLocaleString("id-ID", { style: "decimal" });
  };

  // Hanya menghitung total dari item yang memiliki nilai uang
  const totalTransfer = detailDonate
    .filter((item) => item.total !== 5 && item.total !== 40) // Menyaring item yang bukan gambar
    .reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <div
        className={`flex-grow flex flex-col max-w-md mx-auto w-full ${middleTheme()} p-5`}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <FaArrowLeft
            className="cursor-pointer text-xl"
            onClick={() => navigate(-1)}
          />
          <h1 className="font-semibold text-xl tracking-wide">
            Donasi Sekarang
          </h1>
        </div>

        {/* Judul */}
        <div className="flex flex-col mt-5">
          <h2 className="text-base font-semibold">Detail Donasi</h2>
          <p className="text-base font-normal mt-3">
            Berikut adalah rincian donasi Anda.
          </p>
        </div>

        {/* Tabel Donasi */}
        <div className="overflow-hidden rounded-xl border border-gray-300 mt-5">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-sm font-semibold border-gray-300 text-left">
                  No
                </th>
                <th className="p-2 border text-sm font-semibold border-gray-300 text-left">
                  Deskripsi
                </th>
                <th className="p-2 border text-sm font-semibold border-gray-300 text-left">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {detailDonate.map((item) => (
                <tr key={item.id} className="border-[1px] border-gray-300">
                  <td className="p-2 text-center text-sm border-gray-300">
                    {item.id}
                  </td>
                  <td className="p-2 text-sm border-gray-300">
                    {item.description}
                  </td>
                  <td className="p-2 text-sm flex items-center gap-2 border-gray-300">
                    {/* Jika item memiliki gambar, tidak menggunakan format rupiah */}
                    {item.total === 5 || item.total === 40 ? (
                      <>
                        {item.total}
                        <img
                          src={item.total === 5 ? dokument : diamond}
                          alt={item.total === 5 ? "Dokumen" : "Diamond"}
                          className="w-7 h-5"
                        />
                      </>
                    ) : (
                      `Rp ${formatToIDR(item.total)}`
                    )}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#DCE6F8] font-semibold">
                <td colSpan={2} className="p-2 border-gray-300">
                  Total Transfer
                </td>
                <td className="p-2 border-gray-300">
                  Rp {formatToIDR(totalTransfer)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Keterangan */}
        <p className="text-sm font-normal mt-5">
          * Biaya transaksi dan server digunakan untuk biaya per transaksi dan
          operasional server aplikasi.
        </p>
      </div>
    </div>
  );
};

export default DonasiPembayaran;
