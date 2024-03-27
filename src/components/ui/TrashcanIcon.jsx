import { MdDelete } from "react-icons/md";
import React from "react";

export default function TrashcanIcon({ color = "white" }) {
  return (
    <MdDelete
      className={`w-5 h-5 ${color === "gray" ? "text-gray-400" : "text-white"}`}
    />
  );
}
