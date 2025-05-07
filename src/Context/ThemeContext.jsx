import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Ambil tema dari localStorage, default ke "light" jika tidak ada
    return localStorage.getItem("sb-react-daisyui-preview-theme") || "light";
  });

  const location = useLocation();

  useEffect(() => {
    // Terapkan tema ke elemen <html> setiap kali tema berubah
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sb-react-daisyui-preview-theme", theme);
  }, [theme]);

  // Fungsi untuk menentukan border berdasarkan tema
  const getBorder = () => {
    switch (theme) {
      case "dark":
        return "border-gray-700  bg-[#FFF] text-[#999] border-[1px] rounded-xl";
      case "cupcake":
        return "border-[#4B4B4B] bg-[#FFF] text-[#999] border-[1px] rounded-xl";
      case "bumblebee":
        return "border-yellow-500 bg-[#FFF] text-[#999] border-[1px] rounded-xl";
      case "lemonade":
        return "border-[#027A7D] bg-[#FFF] text-[#999] border-[1px] rounded-xl";
      default:
        return "border-[#333] bg-[#FFF] text-[#333] border-[1px] rounded-xl ";
    }
  };

  // button class
  const getButtonClass = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white border-4 border-gray-900 rounded-xl"
      : theme === "cupcake"
      ? "bg-[#F509AA] text-white  rounded-xl"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white rounded-xl border-4 border-yellow-600"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white rounded-xl border-4 border-[#A7C050]"
      : "bg-[#0961F5] text-white rounded-xl border-4 border-[#DCE6F8]";
  };

  // Fungsi untuk menentukan dot class berdasarkan tema dan lokasi
  const getDotClass = (index) => {
    const currentScreen = ["/", "/screen-dua", "/screen-tiga"];
    return currentScreen[index] === location.pathname
      ? theme === "dark"
        ? "text-blue-700"
        : theme === "cupcake"
        ? "text-[#F509AA]"
        : theme === "bumblebee"
        ? "text-yellow-600"
        : theme === "lemonade"
        ? "text-[#015055]"
        : "text-[#0961F5]"
      : theme === "dark"
      ? "text-gray-200"
      : theme === "cupcake"
      ? "text-[#EEE]"
      : theme === "bumblebee"
      ? "text-yellow-300"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#DCE6F8]";
  };
  const getButton = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-green-500 text-white"
      : "bg-[#D2E2FF] text-[#0961F5]  ";
  };

  const getDotClassSurvey = (index) => {
    const currentScreen = ["/survey-satu", "/survey-dua", "/survey-tiga"];
    return currentScreen[index] === location.pathname
      ? theme === "dark"
        ? "text-blue-700"
        : theme === "cupcake"
        ? "text-[#F509AA]"
        : theme === "bumblebee"
        ? "text-yellow-600"
        : theme === "lemonade"
        ? "text-[#015055]"
        : "text-[#0961F5]"
      : theme === "dark"
      ? "text-gray-200"
      : theme === "cupcake"
      ? "text-[#EEE]"
      : theme === "bumblebee"
      ? "text-yellow-300"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#DCE6F8]";
  };
  // button class
  const getButtonClassSelected = (isSelected) => {
    if (isSelected) return "bg-gray-200 text-gray-200"; // Ketika dipilih
    return theme === "dark"
      ? "bg-gray-700 text-white border border-x-4 border-y-2 border-gray-900 rounded-xl"
      : theme === "cupcake"
      ? "bg-pink-500 text-white border border-x-4 border-y-2 border-pink-600"
      : theme === "bumblebee"
      ? "bg-[#F5DEB3] text-[#3E4C59] border border-x-4 border-y-2 border-yellow-500"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white "
      : "bg-[#0961F5] text-white  ";
  };

  const getLanjutkanClass = (isDisabled) => {
    return isDisabled
      ? "bg-gray-500 text-white "
      : theme === "dark"
      ? "bg-gray-700 text-white "
      : theme === "cupcake"
      ? "bg-pink-500 text-white "
      : theme === "bumblebee"
      ? "bg-[#F5DEB3] text-[#3E4C59] "
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white "
      : "bg-[#0961F5] text-white ";
  };

  const getThemeShadow = (isSelected) => {
    if (isSelected) {
      return theme === "dark"
        ? "shadow-xl shadow-gray-700/50"
        : theme === "cupcake"
        ? "shadow-xl shadow-pink-500/50"
        : theme === "bumblebee"
        ? "shadow-xl shadow-yellow-500/50"
        : "shadow-xl shadow-blue-500";
    }
    return "shadow-lg shadow-gray-200/50";
  };

  const getButtonClassListCategory = (isSelected) => {
    if (isSelected) {
      switch (theme) {
        case "dark":
          return "border-gray-700 border-[1px] rounded-xl";
        case "cupcake":
          return "bg-[#F509AA] text-white ";
        case "bumblebee":
          return "border-yellow-500 border-[1px] rounded-xl";
        case "lemonade":
          return "border-[#027A7D]  border-[1px] rounded-xl";
        default:
          return "border-[#0961F5] bg-[#0961F5] text-white border-[2px] rounded-xl ";
      }
    } else {
      return theme === "dark"
        ? "border-gray-700 border-[1px] rounded-xl"
        : theme === "cupcake"
        ? "border-[#F509AA] border-[1px] rounded-xl"
        : theme === "bumblebee"
        ? "border-yellow-500 border-[1px] rounded-xl"
        : "border-[#DDD]   border-[1px] rounded-xl ";
    }
  };

  const getKotakStyle = (clicked) => {
    if (!clicked) {
      return "bg-gray-300 border text-[#333] ";
    }

    // Style untuk kotak yang sudah diklik
    switch (theme) {
      case "dark":
        return "bg-gray-800 border-gray-700 border border-x-4 border-y-2 text-white";
      case "cupcake":
        return "bg-pink-300 border-pink-400 border ";
      case "bumblebee":
        return "bg-yellow-400 border-yellow-500 border ";
      case "lemonade":
        return "bg-[#027A7D] border-[#A7C050] border ";
      default:
        return "bg-[#28A745] text-[#333] ";
    }
  };

  const getIconColor = (clicked) => {
    if (!clicked) {
      return theme === "dark"
        ? "text-gray-400"
        : theme === "cupcake"
        ? "text-pink-400"
        : theme === "bumblebee"
        ? "text-yellow-400"
        : theme === "lemonade"
        ? "text-[#A7C050]"
        : "text-[#333]";
    }

    // Warna icon untuk kotak yang sudah diklik
    switch (theme) {
      case "dark":
        return "text-white";
      case "cupcake":
        return "text-white";
      case "bumblebee":
        return "text-black";
      default:
        return "text-white";
    }
  };

  const getThemeLoveClass = () => {
    return theme === "dark"
      ? "text-gray-800 "
      : theme === "cupcake"
      ? "text-pink-500  "
      : theme === "bumblebee"
      ? "text-yellow-500  "
      : theme === "lemonade"
      ? "text-[#027A7D] "
      : "text-[#0961F5]";
  };

  const getThemeClass = () => {
    return theme === "dark"
      ? "bg-gray-600 text-white border border-x-4 border-y-2 border-gray-700"
      : theme === "cupcake"
      ? "bg-pink-500 text-white border border-x-4 border-y-2 border-pink-600"
      : theme === "bumblebee"
      ? "bg-yellow-500   border border-x-4 border-y-2 border-yellow-500"
      : theme === "lemonade"
      ? "bg-[#027A7D] text-white border border-x-4 border-y-2 border-[#A7C050]"
      : "bg-[#0961F5] text-white border border-x-4 border-y-2 border-blue-800";
  };

  const getThemeBeranda = () => {
    return theme === "dark"
      ? "bg-gray-500 text-white border border-x-4 border-y-2 border-gray-600"
      : theme === "cupcake"
      ? "bg-[#F8DCF1] text-[#3A2E6E] border border-x-4 border-y-2 border-purple-600"
      : theme === "bumblebee"
      ? "bg-yellow-300 border border-x-4 border-y-2 border-yellow-500"
      : theme === "lemonade"
      ? "bg-[#A7B968] text-white  border border-x-4 border-y-2 border-[#A7C050]"
      : "bg-[#DCE6F8] text-[#4B4B4B] border border-x-4 border-y-2 border-blue-600";
  };

  const getBorderClass = () => {
    return theme === "dark"
      ? "border-white border-4 rounded-full"
      : theme === "cupcake"
      ? " bg-[#FFE6FA] text-[#D9005C] border-4 border-[#FFE6FA]  rounded-full"
      : theme === "bumblebee"
      ? "border-yellow-500 border-4 rounded-full"
      : theme === "lemonade"
      ? "border-[#A7C050] border-4 rounded-full"
      : "border-[#DCE6F8] text-[#0961F5] bg-[#D2E2FF]  border-4 rounded-full";
  };
  const getLatarBeranda = () => {
    return theme === "dark"
      ? "bg-gray-900 text-black"
      : theme === "cupcake"
      ? "bg-[#FFCEFC] "
      : theme === "bumblebee"
      ? "bg-yellow-300 text-black"
      : theme === "lemonade"
      ? "bg-[#A7B968] text-white"
      : "bg-[#EEE] text-[#4B4B4B]";
  };
  const getTextTitle = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-[#3A2E6E]"
      : theme === "bumblebee"
      ? "text-yellow-500"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#4B4B4B]";
  };
  const getIconTheme = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-[#F509AA]"
      : theme === "bumblebee"
      ? "text-yellow-500"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#0961F5]";
  };
  const getIconBookSoal = () => {
    return theme === "dark"
      ? "text-gray-500"
      : theme === "cupcake"
      ? "text-[#D9005C]"
      : theme === "bumblebee"
      ? "text-yellow-300"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#F59D09]";
  };

  const getBorderColor = () => {
    switch (theme) {
      case "dark":
        return "border-gray-700";
      case "cupcake":
        return "border-pink-500";
      case "bumblebee":
        return "border-yellow-500";
      default:
        return "border-[#BCBCBC] border-2";
    }
  };

  const borderColor = () => {
    switch (theme) {
      case "dark":
        return "border-gray-700";
      case "cupcake":
        return "border-pink-500";
      case "bumblebee":
        return "border-yellow-500";
      default:
        return "border-[#DCE6F8] ";
    }
  };

  const getThemeModalCategory = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : "bg-[#EEE] text-[#333]";
  };
  const getIconColorAlert = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-[#D9005C]"
      : theme === "bumblebee"
      ? "text-yellow-300"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-blue-400 ";
  };

  const getTextTitle1 = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-[#3A2E6E]"
      : theme === "bumblebee"
      ? "text-yellow-500"
      : theme === "lemonade"
      ? "text-[#A7C050]"
      : "text-[#28A745]";
  };
  const getTextSoal = () => {
    return theme === "dark"
      ? "text-white"
      : theme === "cupcake"
      ? "text-gray-900"
      : theme === "bumblebee"
      ? "text-white"
      : "text-[#F59D09] ";
  };

  const getThemeLatar = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-[#FFF1DA] text-[#333]"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-green-500 text-white"
      : "bg-[#FFF1DA] text-[#333]";
  };

  const getThemeTooltif = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-[#FFF1DA] text-[#333]"
      : theme === "bumblebee"
      ? "bg-[#333] text-[#FFF1DA]"
      : theme === "lemonade"
      ? "bg-[#333] text-[#FFF1DA]"
      : "bg-[#EEE] text-[#333]";
  };
  const getThemeClassPage = () => {
    return theme === "dark"
      ? "bg-gray-800 text-white"
      : theme === "cupcake"
      ? "bg-pink-500 text-white"
      : theme === "bumblebee"
      ? "bg-yellow-500 text-white"
      : theme === "lemonade"
      ? "bg-green-500 text-white"
      : "bg-blue-600 text-[#FFF]  ";
  };

  const middleTheme = () => {
    return theme === "dark"
      ? "bg-white"
      : theme === "cupcake"
      ? "bg-[#FFCEFC] "
      : theme === "bumblebee"
      ? "bg-yellow-300 text-black"
      : theme === "lemonade"
      ? "bg-[#A7B968] text-white"
      : "bg-white";
  };
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        getBorder,
        getDotClass,
        getButtonClass,
        getButtonClassSelected,
        getLanjutkanClass,
        getThemeShadow,
        getButtonClassListCategory,
        getKotakStyle,
        getIconColor,
        getThemeLoveClass,
        getThemeClass,
        getThemeBeranda,
        getBorderClass,
        getLatarBeranda,
        getTextTitle,
        getDotClassSurvey,
        getIconTheme,
        getIconBookSoal,
        getBorderColor,
        getThemeModalCategory,
        getIconColorAlert,
        getTextTitle1,
        borderColor,
        getButton,
        getThemeLatar,
        getTextSoal,
        getThemeTooltif,
        getThemeClassPage,
        middleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
