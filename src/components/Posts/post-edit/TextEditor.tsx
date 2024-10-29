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
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ],
    }),
    []
  );

  return (
    <div className="quill-wrapper">
      <style jsx global>{`
        /* Increase default font size in the editor */
        .quill-wrapper .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        /* Match the toolbar font size */
        .quill-wrapper .ql-toolbar {
          font-size: 16px;
        }

        /* Custom size classes */
        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="small"]::before {
          font-size: 14px;
          content: "Small";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item:not([data-value])::before {
          font-size: 16px;
          content: "Normal";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="large"]::before {
          font-size: 20px;
          content: "Large";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="huge"]::before {
          font-size: 24px;
          content: "Huge";
        }

        /* Size classes for the editor and rendered content */
        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote {
          margin-bottom: 1em;
        }

        .ql-size-small {
          font-size: 14px;
        }

        .ql-size-normal {
          font-size: 16px;
        }

        .ql-size-large {
          font-size: 20px;
        }

        .ql-size-huge {
          font-size: 24px;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        style={{ minHeight: 400, maxHeight: 800, height: "100%" }}
        modules={ReactQuillModules}
        value={text}
        onChange={(e: any) => setText(e)}
      />
    </div>
  );
}
