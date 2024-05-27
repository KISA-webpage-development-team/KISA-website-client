import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  isAdmin?: boolean;
  content: string;
  setContent: (content: string) => void;
};

// this React Quill Module will be moved to separate config file later
const testReactQuillModules = {
  toolbar: {
    container: [
      ["link"],
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
      ["link"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "underline", "italic"],
      [{ align: [] }],
    ],
  },
};

export default function TextEditor({ isAdmin, content, setContent }: Props) {
  return (
    <ReactQuill
      theme="snow"
      style={{ minHeight: 400 }}
      modules={isAdmin ? testReactQuillModulesAdmin : testReactQuillModules}
      value={content}
      onChange={(e: any) => setContent(e)}
    />
  );
}
