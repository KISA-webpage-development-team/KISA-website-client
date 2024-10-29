import React from "react";
import { FiEye } from "react-icons/fi";
import "./styles.css";

type ViewIconProps = {
  size: "small" | "medium";
};

export default function ViewIcon({ size }: ViewIconProps) {
  return (
    <FiEye
      className={`${size === "small" ? "small_icon !text-xs" : "icon"} `}
    />
  );
}
