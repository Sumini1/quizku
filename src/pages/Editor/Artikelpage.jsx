import React from "react";
import { useLocation } from "react-router-dom";

const ArtikelPage = () => {
  const location = useLocation();
  const content =
    location.state?.content || "<p>Tidak ada konten untuk ditampilkan.</p>";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Artikel Anda</h1>
      <article className="bg-white p-6 rounded shadow max-w-none space-y-4 leading-relaxed">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};

export default ArtikelPage;
