import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextEditorProps } from "../../../model/props/posts";

// this React Quill Module will be moved to separate config file later
const testReactQuillModules = {
  toolbar: {
    container: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "underline", "italic"],
      [{ align: [] }],
    ],
  },
};

const testReactQuillModulesAdmin = {
  toolbar: {
    container: [
      ["image"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "underline", "italic"],
      [{ align: [] }],
    ],
  },
};

export default function TextEditor({
  isAdmin,
  text,
  setText,
}: TextEditorProps) {
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
