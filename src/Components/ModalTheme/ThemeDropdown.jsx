import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../Context/ThemeContext";
import { HiDotsVertical } from "react-icons/hi";
import { BiSolidColor } from "react-icons/bi";
import HumbergerMenu from "./HumbergerMenu";

const ThemeDropdown = () => {
  const { theme, setTheme, getTextTitle, getIconTheme } = useTheme();
  const DEFAULT_THEMES = ["light", "dark", "cupcake", "bumblebee", "lemonade"];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const dropdownRef = useRef(null); // Ref untuk elemen dropdown

  const onCloseModal = () => {
    setActiveModal(false);
  };

  const handleThemeChange = (t) => {
    document.documentElement.setAttribute("data-theme", t);
    window.localStorage.setItem("sb-react-daisyui-preview-theme", t);
    setTheme(t);
    setIsDropdownVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  const themeButtonClass = (currentTheme) => {
    const baseClass = "block w-full text-left px-4 py-2 text-sm rounded-md";
    const isSelected = currentTheme === theme;
    const themeStyles = {
      light: "bg-blue-700 text-white",
      dark: "bg-gray-800 text-white",
      cupcake: "bg-pink-500 text-white",
      bumblebee: "bg-yellow-500 text-white",
      lemonade: "bg-[#E1F396] text-gray-500",
    };
    return isSelected
      ? `${baseClass} ${themeStyles[currentTheme]} font-semibold`
      : `${baseClass} hover:bg-gray-500 ${themeStyles[currentTheme]}`;
  };

  return (
    <div className="relative -mt-1" ref={dropdownRef}>
      <button
        className={`px-1 py-2 rounded-md ${
          theme === "dark"
            ? "text-white"
            : theme === "cupcake"
            ? "text-pink-500"
            : theme === "bumblebee"
            ? "text-yellow-500"
            : theme === "lemonade"
            ? "text-[#8ba723]"
            : "text-blue-700"
        }`}
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        <BiSolidColor className={`${getIconTheme(theme)} text-2xl`} />
      </button>
      <button
        className={` ${getTextTitle()} ${theme === "dark" && "text-white"}`}
      >
        <HiDotsVertical
          onClick={() => setActiveModal(true)}
          className={`${getTextTitle()} text-2xl`}
        />
      </button>

      {isDropdownVisible && (
        <div className="absolute right-0 mt-2 w-40 shadow-lg rounded-md z-10">
          {DEFAULT_THEMES.map((t) => (
            <button
              key={t}
              className={themeButtonClass(t)}
              onClick={() => handleThemeChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      )}
      {activeModal && (
        <HumbergerMenu onClose={onCloseModal} isOpen={activeModal} />
      )}
    </div>
  );
};

export default ThemeDropdown;
