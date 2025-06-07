import React, { useEffect, useState, useMemo } from "react";
import { FaHome } from "react-icons/fa";
import { FaGraduationCap, FaCirclePlay } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
import { BsFillAwardFill } from "react-icons/bs";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategory } from "../../Features/Subcategory/Reducer/subcategory";

const ButtonNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, getIconTheme } = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState(null);
  const { data = [], status } = useSelector((state) => state.subcategory);

  // Fetch subcategory with difficultyId from localStorage
  useEffect(() => {
    if (status === "idle" && data.length === 0) {
      const difficultyId = localStorage.getItem("selectedDifficultyId") || 1;
      dispatch(fetchSubcategory(difficultyId));
    }
  }, [dispatch, status, data.length]);

  // Load selectedThemeId on mount
  useEffect(() => {
    const storedThemeId = localStorage.getItem("selectedThemeId");
    if (storedThemeId) {
      setSelectedThemeId(parseInt(storedThemeId, 10));
    }
  }, []);

  // Scroll visibility toggle
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsVisible(currentY <= lastScrollY || currentY < 10);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Sync theme ID from URL
  useEffect(() => {
    const match = location.pathname.match(/^\/tema-belajar\/(\d+)/);
    if (match) {
      const id = parseInt(match[1], 10);
      setSelectedThemeId(id);
      localStorage.setItem("selectedThemeId", id.toString());

      if (data.length > 0) {
        const allThemes = data.flatMap(
          (cat) =>
            cat.subcategories?.flatMap((sub) => sub.themes_or_levels || []) ||
            []
        );
        const foundTheme = allThemes.find((t) => t.id === id);
        if (foundTheme) {
          localStorage.setItem(
            "selectedThemeDetail",
            JSON.stringify(foundTheme)
          );
        }
      }
    }
  }, [location.pathname, data]);

  // Get first theme
  const firstTheme = useMemo(() => {
    if (!data.length) return null;
    return (
      data.flatMap(
        (cat) =>
          cat.subcategories?.flatMap((sub) => sub.themes_or_levels || []) || []
      )[0] || null
    );
  }, [data]);

  // Get current theme
  const currentTheme = useMemo(() => {
    if (!data.length) return firstTheme;
    if (!selectedThemeId) return firstTheme;
    const allThemes = data.flatMap(
      (cat) =>
        cat.subcategories?.flatMap((sub) => sub.themes_or_levels || []) || []
    );
    return allThemes.find((t) => t.id === selectedThemeId) || firstTheme;
  }, [data, selectedThemeId, firstTheme]);

  const playLink = selectedThemeId
    ? `/tema-belajar/${selectedThemeId}`
    : firstTheme
    ? `/tema-belajar/${firstTheme.id}`
    : "/beranda";

  const handlePlayClick = () => {
    if (!selectedThemeId && currentTheme) {
      setSelectedThemeId(currentTheme.id);
      localStorage.setItem("selectedThemeId", currentTheme.id.toString());
    }
    if (currentTheme) {
      localStorage.setItem("selectedThemeDetail", JSON.stringify(currentTheme));
    }
  };

  const handleNavClick = (item) => {
    if (item.title === "Play") {
      handlePlayClick();
    }
    if (location.pathname === item.link) {
      navigate(0); // safer than full reload
    }
  };

  const navigationItems = [
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
      state: { themeDetail: currentTheme },
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

  const isNavigationItemActive = (item) =>
    location.pathname === item.link ||
    (location.pathname.startsWith("/progress") && item.link === "/progress") ||
    (location.pathname === "/jelajahi-aplikasi" && item.link === "/beranda") ||
    (location.pathname.includes("/tema-belajar/") &&
      item.link.includes("/tema-belajar"));

  return (
    <div
      className={`p-4 rounded-lg flex justify-center items-center mx-auto sticky bottom-0 w-full max-w-lg transition-transform duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-[#EEE]"
      } ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex justify-between h-[20px] gap-2 items-center w-full relative">
        {navigationItems.map((item) => {
          const isActive = isNavigationItemActive(item);
          const icon = isActive
            ? React.cloneElement(item.icon, { className: getIconTheme() })
            : item.icon;

          return (
            <Link
              to={item.link}
              key={item.id}
              state={item.state}
              className="flex flex-col justify-center items-center text-center"
              style={{ flex: "1 1 20%" }}
              onClick={() => handleNavClick(item)}
            >
              <p className="text-2xl font-extrabold">{icon}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ButtonNavbar;
