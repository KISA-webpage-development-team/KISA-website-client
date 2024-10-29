import React from "react";
import { ButtonType } from "./types";

type CustomImageButtonProps = {
  type?: ButtonType;
  icon: React.ReactNode;
  text?: string;
  disabled?: boolean;
  background?: "none" | "gray";
  onClick?: () => void;
  className?: string;
};

export default function CustomImageButton({
  type = "primary",
  icon,
  text = "",
  disabled = false,
  background = "gray",
  onClick,
  className = "",
}: CustomImageButtonProps) {
  const btnClassName = `${type}_button ${
    disabled ? `${type}_button_disabled` : ""
  } ${className}`.trim();

  return (
    <button className={`${btnClassName} gap-1 h-fit`} onClick={onClick}>
      {icon}
      {text !== "" && (
        <p
          className={`
          ${background === "none" ? "hidden sm:block" : "block"}
        text-xs md:text-sm 
        hover:underline`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
