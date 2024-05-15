import React from "react";
import * as DOMPurify from "dompurify";

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
