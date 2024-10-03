import React, { useMemo } from "react";
import { TextEditorProps } from "../../../model/props/posts";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

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
      style={{ minHeight: 400 }}
      modules={ReactQuillModules}
      value={text}
      onChange={(e: any) => setText(e)}
    />
  );
}
