import React from "react";
import { ButtonType } from "./types";
import "./styles.css";

type CustomButtonProps = {
  type?: ButtonType;
  text: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  forSubmit?: boolean;
};

export default function CustomButton({
  type = "primary",
  text,
  disabled = false,
  onClick,
  forSubmit = false,
}: CustomButtonProps) {
  const className = `${
    disabled ? `${type}_button_disabled` : `${type}_button`
  }`;

  return (
    <button
      type={forSubmit ? "submit" : "button"}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {text}
    </button>
  );
}
