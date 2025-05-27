import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { useLocation, useNavigate } from "react-router-dom";

const PageEditor = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log("Konten sebelum disubmit:", content);
    // Navigate to article page with content in state
    navigate("/artikel", { state: { content } });
  };
  return (
    <div className="flex flex-col justify-center items-center mx-auto">
      {/* Konten scrollable */}
      <div className=" max-w-md w-full h-full min-h-screen bg-white">
        <div className="flex-1 overflow-auto p-6 pb-48">
          <h1 className="text-xl font-bold mb-4">Tulis Artikel</h1>
          <RichTextEditor
            defaultValue={content || "<h2>Judul</h2><p>deskripsi</p>"}
            onChange={setContent}
          />
        </div>
        {/* Tombol tetap di bawah layar */}
        <div className="fixed bottom-4 left-4 right-4 z-50 justify-center items-center mx-auto max-w-md p-5">
          <button
            onClick={handleSubmit}
            disabled={!content}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageEditor;
