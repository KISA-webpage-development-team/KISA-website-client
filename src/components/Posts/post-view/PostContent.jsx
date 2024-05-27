import React from "react";
import DOMPurify from "isomorphic-dompurify";
// DOMPurify sanitizes HTML and prevents XSS attacks

export default function PostContent({ text }) {
  // console.log("text: ", text);
  return (
    <div
      className="py-3 text-sm md:text-base"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
