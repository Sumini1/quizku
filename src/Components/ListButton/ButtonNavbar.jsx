import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaGraduationCap, FaCirclePlay } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { FiUser } from "react-icons/fi";
import { BsFillAwardFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../Features/Subcategory/Reducer/subcategory";

const ButtonNavbar
 = () => {
  const location = useLocation();
  const { theme, getIconTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.subcategory);

  useEffect(() => {
    if (status === "idle" && data.length === 0) {
      dispatch(fetchSubcategory());
    }
  }, [dispatch, status, data]);

  

  // Ambil selectedThemeId dari localStorage saat pertama load
  useEffect(() => {
    const storedThemeId = localStorage.getItem("selectedThemeId");
    if (storedThemeId) {
      setSelectedThemeId(parseInt(storedThemeId, 10));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Cek location, kalau lagi di /tema-belajar/:id, update selectedThemeId
  useEffect(() => {
    const match = location.pathname.match(/^\/tema-belajar\/(\d+)/);
    if (match) {
      const idFromUrl = parseInt(match[1], 10);
      setSelectedThemeId(idFromUrl);
      localStorage.setItem("selectedThemeId", idFromUrl);

      // Update juga themeDetail di localStorage jika ada di data
      if (data.length > 0) {
        const allThemes = data.flatMap(
          (category) =>
            category.subcategories?.flatMap(
              (sub) => sub.themes_or_levels || []
            ) || []
        );

        const matchingTheme = allThemes.find((theme) => theme.id === idFromUrl);
        if (matchingTheme) {
          localStorage.setItem(
            "selectedThemeDetail",
            JSON.stringify(matchingTheme)
          );
        }
      }
    }
  }, [location.pathname, data]);

  const firstTheme =
    data.length > 0
      ? data.flatMap(
          (category) =>
            category.subcategories?.flatMap(
              (sub) => sub.themes_or_levels || []
            ) || []
        )[0]
      : null;

  const playLink = selectedThemeId
    ? `/tema-belajar/${selectedThemeId}`
    : firstTheme
    ? `/tema-belajar/${firstTheme.id}`
    : "/beranda"; // fallback kalau gak ada data

  const playState = firstTheme ? { themeDetail: firstTheme } : {};

  const kotak = [
    { id: 1, icon: <FaHome />, link: "/beranda", title: "Beranda" },
    {
      id: 2,
      icon: <FaGraduationCap />,
      link: "/pembelajaran",
      title: "Pembelajaran",
    },
    {
      id: 3,
      icon: <FaCirclePlay />,
      link: playLink,
      title: "Play",
      state: {
        themeDetail:
          selectedThemeId && data.length > 0
            ? data
                .flatMap(
                  (category) =>
                    category.subcategories?.flatMap(
                      (sub) => sub.themes_or_levels || []
                    ) || []
                )
                .find((theme) => theme.id === selectedThemeId) || firstTheme
            : firstTheme,
      },
    },
    {
      id: 4,
      icon: <BsFillAwardFill />,
      link: "/papan-peringkat",
      title: "Peringkat",
    },
    { id: 5, icon: <GiProgression />, link: "/progress", title: "Progress" },
    { id: 6, icon: <FiUser />, link: "/settings", title: "Profil" },
  ];

  return (
    <div
      className={`p-4  rounded-lg flex justify-center items-center mx-auto sticky bottom-0 w-full max-w-lg transition-transform duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-[#EEE]"
      } ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex justify-between h-[20px] gap-2 items-center w-full relative">
        {kotak.map((item) => {
          const isItemActive =
            location.pathname === item.link ||
            (location.pathname.startsWith("/progress") &&
              item.link === "/progress") ||
            (location.pathname === "/jelajahi-aplikasi" &&
              item.link === "/beranda") ||
            (location.pathname.includes("/tema-belajar/") &&
              item.link.includes("/tema-belajar"));

          const activeIcon = isItemActive
            ? React.cloneElement(item.icon, { className: getIconTheme() })
            : item.icon;

          return (
            <Link
              to={item.link}
              key={item.id}
              state={item.state}
              className="flex flex-col justify-center items-center text-center"
              style={{ flex: "1 1 20%" }}
              onClick={() => {
                if (item.title === "Play" && firstTheme) {
                  // Jika tidak ada selectedThemeId, set ke firstTheme.id
                  if (!selectedThemeId) {
                    setSelectedThemeId(firstTheme.id);
                    localStorage.setItem("selectedThemeId", firstTheme.id);
                  }

                  // Simpan detail theme lengkap ke localStorage untuk penggunaan saat refresh
                  const themeToStore =
                    selectedThemeId && data.length > 0
                      ? data
                          .flatMap(
                            (category) =>
                              category.subcategories?.flatMap(
                                (sub) => sub.themes_or_levels || []
                              ) || []
                          )
                          .find((theme) => theme.id === selectedThemeId) ||
                        firstTheme
                      : firstTheme;

                  if (themeToStore) {
                    localStorage.setItem(
                      "selectedThemeDetail",
                      JSON.stringify(themeToStore)
                    );
                  }
                }
                if (location.pathname === item.link) {
                  window.location.reload();
                }
              }}
            >
              <p className="text-2xl font-extrabold">{activeIcon}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonNavbar
;
