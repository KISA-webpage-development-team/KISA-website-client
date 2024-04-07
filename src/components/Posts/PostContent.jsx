import React from "react";

export default function PostContent({ text }) {
  return (
    <div
      className="py-3 text-sm md:text-base"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
