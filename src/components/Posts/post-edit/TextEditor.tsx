import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

type TextEditorProps = {
  isAdmin: boolean;
  text: string;
  setText: (e: string) => void;
};

export default function TextEditor({
  isAdmin,
  text,
  setText,
}: TextEditorProps) {
  const ReactQuillModules = useMemo(
    () => ({
      toolbar: [
        ["image", "link"],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "underline", "italic"],
        [{ align: [] }],
      ],
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      style={{ minHeight: 400, fontSize: 24 }}
      modules={ReactQuillModules}
      value={text}
      onChange={(e: any) => setText(e)}
    />
  );
}
