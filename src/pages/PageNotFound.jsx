import React from "react";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Oops!</h1>
      <p className="my-5 text-xl">Maaf, halaman yang kamu cari tidak ditemukan</p>
      <p className="text-lg text-red-500">Page Not Found</p>
    </div>
  );
};

export default PageNotFound;
