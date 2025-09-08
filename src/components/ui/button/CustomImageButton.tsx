import React from "react";
import { ButtonType } from "./types";
import "./styles.css";

type CustomImageButtonProps = {
  type?: ButtonType;
  icon: React.ReactNode;
  text?: string;
  disabled?: boolean;
  background?: "none" | "gray";
  onClick?: () => void;
  className?: string;
  forSubmit?: boolean;
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
  forSubmit = false,
  ...props
}: CustomImageButtonProps) {
  const btnClassName = `${type}_button ${
    disabled ? `${type}_button_disabled` : ""
  } ${className}`.trim();

  return (
    <button
      className={`${btnClassName} gap-1 h-fit`}
      onClick={onClick}
      type={forSubmit ? "submit" : "button"}
      {...props}
    >
      {icon}
      {text !== "" && (
        <p
          className={`
          ${"hidden sm:block"}
        text-sm md:text-base
        hover:underline`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
