import React, { useState, useEffect } from "react";
import { useTheme } from "../../../Context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserUnits } from "../Reducer/userUnitsSlice";

const ModalOverView = ({ onClose, unitId }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.userUnits);
  const { theme, getButtonClass, getThemeModalCategory } = useTheme();

  // Fetch data if not already fetched
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchUserUnits());
    }
  }, [dispatch, data]);

  // Handle overlay click to close modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Find the specific unit to display
  const displayUnit =
    unitId && data?.length
      ? data.find((item) => item.id === unitId || item.unit_id === parseInt(unitId))
      : null;

  // Show loading spinner if data is still being fetched
  if (loading) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-5"
        onClick={handleOverlayClick}
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center p-5"
      onClick={handleOverlayClick}
    >
      {/* Overlay redup */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div
        className={`p-6 rounded-lg shadow-lg w-full relative max-w-md ${getThemeModalCategory()}`}
      >
        {displayUnit ? (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">
                {displayUnit.name}
              </h2>
              <p className="text-gray-600">
                {displayUnit.unit_description_overview}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`mt-20 w-full text-[15px] font-medium py-2 px-4 border-none rounded-xl focus:outline-none focus:shadow-outline ${getButtonClass()}`}
            >
              Selesai Membaca
            </button>
          </>
        ) : (
          <div className="text-gray-600">Unit not found</div>
        )}
      </div>
    </div>
  );
};

export default ModalOverView;