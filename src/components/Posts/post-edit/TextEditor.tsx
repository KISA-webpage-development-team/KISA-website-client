import React, { useEffect, useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

type TextEditorProps = {
  text: string;
  setText: (content: string) => void;
};

export default function TextEditor({ text, setText }: TextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<string>(text);
  const setTextRef = useRef(setText);

  const QuillModules = useMemo(
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

  useEffect(() => {
    setTextRef.current = setText;
  }, [setText]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const editorContainer = container.ownerDocument.createElement("div");
    container.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      theme: "snow",
      modules: QuillModules,
    });

    quill.root.innerHTML = textRef.current;

    quill.on("text-change", () => {
      // const content = quill.root.innerHTML;
      setTextRef.current(content);
    });

    return () => {
      container.innerHTML = "";
    };
  }, [QuillModules]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  return (
    <div className="quill-wrapper" ref={containerRef}>
      <style jsx global>{`
        .quill-wrapper .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }
        .quill-wrapper .ql-toolbar {
          font-size: 16px;
        }
        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote {
          margin-bottom: 1em;
        }
      `}</style>
    </div>
  );
}
