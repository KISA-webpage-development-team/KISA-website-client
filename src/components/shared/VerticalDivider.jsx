import React from "react";

export default function VerticalDivider({ size = "medium" }) {
  return (
    <div
      className={`${size === "small" ? "h-4" : "h-8"}
  border border-gray-400
   rounded-lg my-4`}
    ></div>
  );
}
