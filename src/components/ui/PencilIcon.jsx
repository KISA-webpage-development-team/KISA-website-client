import { BiPencil } from "react-icons/bi";
import React from "react";

export default function PencilIcon({ color = "white" }) {
  return (
    <BiPencil
      className={`w-5 h-5 ${
        color === "gray" ? "text-gray-400" : "text-michigan-maize"
      }`}
    />
  );
}
