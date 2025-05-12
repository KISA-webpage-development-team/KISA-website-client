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
  props?: React.HTMLAttributes<HTMLButtonElement>;
};

export default function CustomImageButton({
  type = "primary",
  icon,
  text = "",
  disabled = false,
  background = "gray",
  onClick,
  className = "",
  ...props
}: CustomImageButtonProps) {
  const btnClassName = `${type}_button ${
    disabled ? `${type}_button_disabled` : ""
  } ${className}`.trim();

  return (
    <button
      className={`${btnClassName} gap-1 h-fit`}
      onClick={onClick}
      {...props}
    >
      {icon}
      {text !== "" && (
        <p
          className={`
          ${"hidden sm:block"}
        text-sm md:text-base text-gray-600
        hover:underline`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
