import React from "react";
import { useTheme } from "../../Context/ThemeContext";
import { RiArrowDropDownLine } from "react-icons/ri";

const PilihanThema = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Daftar tema yang tersedia
  const themes = [
    {
      name: "Default",
      value: "light",
    },
    {
      name: "Dark",
      value: "dark",
    },
    {
      name: "Cupcake",
      value: "cupcake",
    },
    {
      name: "Bumblebee",
      value: "bumblebee",
    },
    {
      name: "Lemonade",
      value: "lemonade",
    },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    onClose();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-5 "
      onClick={handleOverlayClick}
    >
      {/* Modal di tengah layar */}
      <div className="bg-gray-100 rounded-lg shadow-xl w-full p-5 max-w-md mx-auto ">
        <h3 className="text-blue-500 font-medium mb-4">Tampilan</h3>

        <div className="border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚙️</span>
              <span>Tombol tema</span>
            </div>
            <div className="flex items-center">
              <select
                className="bg-transparent text-right pr-6 appearance-none"
                value={theme}
                onChange={(e) => handleThemeChange(e.target.value)}
              >
                {themes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.name}
                  </option>
                ))}
              </select>

              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-7">Lihat pilihan</p>
        </div>

        <div className="border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">💬</span>
              <span>Tombol bantuan</span>
            </div>
            <div className="flex items-center">
              Default
              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 ml-7">Lihat posisi</p>
        </div>

        <div className="border-b pb-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">Aa</span>
              <span>Ukuran font</span>
            </div>
            <div className="flex items-center">
              <span>Default</span>
              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">𝑰</span>
              <span>Pilihan Font</span>
            </div>
            <div className="flex items-center">
              <span>Jakarta Sans</span>
              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-20"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default PilihanThema;
