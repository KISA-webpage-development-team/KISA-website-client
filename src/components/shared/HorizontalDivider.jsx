import React from "react";

export default function HorizontalDivider({ color = "light" }) {
  return (
    <div
      className={`border w-full ${
        color === "light" ? "border-gray-100" : "border-gray-500"
      } rounded-lg`}
    ></div>
  );
}
