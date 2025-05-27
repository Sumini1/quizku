import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({
  defaultValue = "<p>Tulis sesuatu di sini...</p>",
  onChange = () => {},
  height = 400,
  disabled = false,
}) => {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="ld5w10gpn3iks0jpj5orstemq8tj0s6shlrkqf8682mkyd3t"
      value={defaultValue}
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height,
        menubar: false,
        readonly: disabled,
        directionality: "ltr",
        content_style: `
      body {
        direction: ltr !important;
        text-align: left;
        font-family: Arial, sans-serif;
        line-height: 1.5;
      }
      h2 {
        font-weight: bold;
        color: #333;
        font-size: 32px;
      }
      p {
        color: #666;
      }
    `,
        plugins: [
          "advlist autolink lists link image charmap preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect fontsizeselect | bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help",
        fontsize_formats: "12px 14px 16px 18px 24px 32px 48px", // ✅ aktifkan pilihan ukuran
      }}
      onEditorChange={onChange}
    />
  );
};

export default RichTextEditor;
