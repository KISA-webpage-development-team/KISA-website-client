import React from "react";

export default function PostContent({ text }) {
  return (
    <div
      className="py-3 text-base md:text-lg"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
