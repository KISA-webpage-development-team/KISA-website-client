import React from "react";
import { ButtonType } from "./types";
import "./styles.css";

type CustomButtonProps = {
  type?: ButtonType;
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

export default function CustomButton({
  type = "primary",
  text,
  disabled = false,
  onClick,
}: CustomButtonProps) {
  const className = `${
    disabled ? `${type}_button_disabled` : `${type}_button`
  }`;

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {text}
    </button>
  );
}
