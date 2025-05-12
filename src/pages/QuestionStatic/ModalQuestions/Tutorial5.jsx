import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../Reducer/modalSlice";

const Tutorial5 = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(1);
  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/page-enam"); // Pindah ke halaman 2
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5  ">
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="w-[300px] ">
        {/* Konten */}
        <div className="fixed top-14  bg-white p-3 rounded-lg shadow-md text-sm text-gray-800 w-[270px] ml-16">
          {/* Panah kecil di atas */}
          <div className="absolute -top-2 right-2 ">
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
            Menu untuk berbagai pengaturan pembelajaran
          </p>
          <div
            onClick={handleClick}
            className="flex justify-end gap-2 items-center pt-2  font-medium"
          >
            <span>5/11</span>
            <button className="hover:underline text-[#0961F5] underline underline-offset-2">
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial5;
