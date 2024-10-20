import React from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill/dist/quill.snow.css";

// DOMPurify sanitizes HTML and prevents XSS attacks

type PostContentProps = {
  text: string;
};

export default function PostContent({ text }: PostContentProps) {
  return (
    <div
      className="!px-0 !py-3 
       text-sm md:text-base
       min-h-16"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
