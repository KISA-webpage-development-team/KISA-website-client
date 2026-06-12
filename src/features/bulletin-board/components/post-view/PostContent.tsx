import React from "react";
import DOMPurify from "isomorphic-dompurify";
import "react-quill-new/dist/quill.snow.css";

type PostContentProps = {
  text: string;
};

// DOMPurify sanitizes HTML and prevents XSS attacks.
// Rich-text rendering (quill snow CSS) is unchanged from prior implementation.
export default function PostContent({ text }: PostContentProps) {
  return (
    <div
      className="type-body text-foreground min-h-24 py-4"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(String(text)),
      }}
    />
  );
}
