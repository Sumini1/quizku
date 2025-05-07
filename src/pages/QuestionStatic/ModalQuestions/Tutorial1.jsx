import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../Reducer/modalSlice";  
import { useNavigate } from "react-router-dom";

const Tutorial1 = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isOpen);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClick = () => {
    dispatch(openModal()); // Aktifkan modal di Redux state
    navigate("/page-dua"); // Pindah ke halaman 2
  };

  const answer = [
    { id: 1, answer: "Lima" },
    { id: 2, answer: "Empat" },
    { id: 3, answer: "Enam" },
    { id: 4, answer: "Tiga" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-5">
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Konten modal */}
      <div className="relative z-10 bg-white h-auto max-h-[25vh] -mt-20 rounded-lg shadow-lg p-4 w-full flex flex-col">
        {/* Bagian Atas: Judul & Pertanyaan */}
        <div className="mb-3 flex flex-col items-center">
          <h1 className="text-md font-semibold whitespace-nowrap">
            Apa itu Islam? Ada berapa <span className="underline">rukun</span>
            <span className="underline ml-1">Islam</span>?
          </h1>
        </div>

        {/* Bagian Tengah: Pilihan Jawaban */}
        <div className="flex flex-wrap gap-3">
          {answer.map((item) => (
            <button
              key={item.id}
              className="w-auto p-4 py-2 border border-gray-400 rounded-lg hover:border-blue-500 text-center"
            >
              {item.answer}
            </button>
          ))}
        </div>

        {/* Bagian Informasi Tambahan */}
        <div className="relative bg-white p-3 mt-16 w-[250px] rounded-lg shadow-md text-sm text-gray-800">
          {/* Panah kecil di atas */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
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
          <p className="border-b border-gray-400 pb-2">
            Soal dan jawaban yang terkait materi pembahasan
          </p>
          <div
            onClick={handleClick}
            className="flex justify-end gap-2 items-center pt-2 font-medium"
          >
            <span>1/11</span>
            <button className="hover:underline text-[#0961F5] underline underline-offset-2">
              Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial1;
