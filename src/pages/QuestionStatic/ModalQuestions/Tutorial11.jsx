import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../Reducer/modalSlice";
import { IoCloseSharp } from "react-icons/io5";

const Tutorial11 = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(1);
  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/page-satu-keimanan"); // Pindah ke halaman 2
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      {/* Konten */}
      <IoCloseSharp className="text-2xl text-white font-medium mr-5" />
      <div className="relative bg-white p-3 w-[250px] mt-5 mr-20 rounded-lg shadow-md text-sm text-gray-800">
        {/* Panah kecil di atas */}
        <div className="absolute -top-3 left-4 transform -translate-x-1/2">
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
          Keluar dari pembelajaran dan progres akan terhapus
        </p>
        <div
          onClick={handleClick}
          className="flex justify-end gap-2 items-center pt-2  font-medium"
        >
          <span>11/11</span>
          <button className="hover:underline text-[#0961F5] underline underline-offset-2">
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial11;
