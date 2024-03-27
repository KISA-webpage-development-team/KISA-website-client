import React from "react";
import { IoListOutline } from "react-icons/io5";

export default function ListIcon({ size = "small" }) {
  return (
    <IoListOutline
      className={`${size === "medium" ? "w-6 h-6" : "w-4 h-4"} text-black`}
    />
  );
}
