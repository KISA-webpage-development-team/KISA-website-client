import { MdDelete } from "react-icons/md";
import React from "react";

type TrashcanIconProps = {
  color?: "white" | "gray";
  noResize?: boolean;
};

export default function TrashcanIcon({
  color = "white",
  noResize = false,
}: TrashcanIconProps) {
  return (
    <MdDelete
      className={`${noResize ? "text-base" : "w-3 h-3 md:w-5 md:h-5"}
    ${color === "gray" ? "text-gray-400" : "text-michigan-maize"}`}
    />
  );
}
