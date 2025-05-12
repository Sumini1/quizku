import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../Reducer/modalSlice";
import { useNavigate } from "react-router-dom";

const Tutorial3 = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/page-empat"); // Pindah ke halaman 2
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      {/* Bagian Informasi Tambahan */}
      <div className=" bg-white p-3 fixed bottom-20 w-[250px] rounded-lg shadow-md text-sm text-gray-800 mr-28">
        {/* Konten Informasi */}
        <p className="border-b border-gray-400 pb-2">
          Artikel untuk membantu menjawab soal
        </p>

        {/* Panah kecil di bawah dan bergeser ke kanan */}
        <div className="absolute -bottom-2 left-4 rotate-180">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 0L0 10h20L10 0z"></path>
          </svg>
        </div>

        <div
          onClick={handleClick}
          className="flex justify-end gap-2 items-center pt-2 font-medium"
        >
          <span>3/11</span>
          <button className="hover:underline text-[#0961F5] underline underline-offset-2">
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial3;
