import React from "react";

export default function PostContent({ text }) {
  return (
    <div
      className="py-3 text-xs md:text-base"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
