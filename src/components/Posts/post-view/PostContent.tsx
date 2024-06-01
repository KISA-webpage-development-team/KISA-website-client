import React from "react";
import DOMPurify from "isomorphic-dompurify";
import { PostContentProps } from "../../../model/props/posts";
import "react-quill/dist/quill.snow.css";

// DOMPurify sanitizes HTML and prevents XSS attacks

export default function PostContent({ text }: PostContentProps) {
  return (
    <div
      className="!px-0 !py-3 ql-editor text-base min-h-16"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
