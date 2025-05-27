import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../Reducer/modalSlice";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoDiamond } from "react-icons/io5";

const TutorialPrestasi = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/papan-peringkat-nama-prestasi"); // Pindah ke halaman 2
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="w-[250px] h-[200px] -mt-48">
        {" "}
        {/* Tambahkan margin atas */}
        {/* Konten */}
        <div className="relative bg-white p-3 rounded-lg shadow-md text-sm text-gray-800">
          {/* Panah kecil di atas */}
          <div className="absolute -top-2 left-6 transform -translate-x-1/2">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0L0 10h20L10 0z"></path>
            </svg>
          </div>

          {/* Konten Informasi */}
          <p className="border-b border-gray-400 pb-2 ">
            Papan peringkat prestasi dari para peserta belajar
          </p>
          <div
            onClick={handleClick}
            className="flex justify-end gap-2 items-center pt-2  font-medium"
          >
            <button className="hover:underline text-[#0961F5] underline underline-offset-2">
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPrestasi;
