import React from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.snow.css";

// DOMPurify sanitizes HTML and prevents XSS attacks

export default function PostContent({ text }) {
  console.log("text: ", text);
  return (
    <div
      className="my-2 ql-editor text-sm md:text-base"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
