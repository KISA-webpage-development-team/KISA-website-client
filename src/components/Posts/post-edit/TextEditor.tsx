import React, { useMemo } from "react";
import ReactQuill from "react-quill";
import { TextEditorProps } from "../../../model/props/posts";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({
  isAdmin,
  text,
  setText,
}: TextEditorProps) {
  const testReactQuillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["small", false, "large", "huge"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline", "italic"],
          [{ align: [] }],
        ],
      },
    }),
    []
  );
  const testReactQuillModulesAdmin = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline", "italic"],
          [{ align: [] }],
        ],
      },
    }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      style={{ minHeight: 400 }}
      modules={isAdmin ? testReactQuillModulesAdmin : testReactQuillModules}
      value={text}
      onChange={(e: any) => setText(e)}
    />
  );
}
