import { MdDelete } from "react-icons/md";
import React from "react";

export default function TrashcanIcon({ color = "white" }) {
  return (
    <MdDelete
      className={`w-3 h-3 md:w-5 md:h-5 ${
        color === "gray" ? "text-gray-400" : "text-white"
      }`}
    />
  );
}
