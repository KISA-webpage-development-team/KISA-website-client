import React from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.snow.css";

// DOMPurify sanitizes HTML and prevents XSS attacks

export default function PostContent({ text }) {
  console.log("text: ", text);
  return (
    <div
      className="!px-0 ql-editor my-2 text-sm md:text-base"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
