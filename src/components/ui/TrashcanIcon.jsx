import { MdDelete } from "react-icons/md";
import React from "react";

export default function TrashcanIcon({ color = "white" }) {
  return (
    <MdDelete
      className={`w-3 h-3 md:w-4 md:h-4 ${
        color === "gray" ? "text-gray-400" : "text-white"
      }`}
    />
  );
}
