import { BiPencil } from "react-icons/bi";
import React from "react";

export default function PencilIcon({ color = "white" }) {
  return (
    <BiPencil
      className={`w-3 h-3 md:w-5 md:h-5 ${
        color === "gray" ? "text-gray-400" : "text-michigan-maize"
      }`}
    />
  );
}
