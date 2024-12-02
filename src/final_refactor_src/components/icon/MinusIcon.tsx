import { FaMinus } from "react-icons/fa";
import "./styles.css";

interface MinusIconProps {
  size?: "small" | "medium";
  className?: string;
}

export default function MinusIcon({
  size = "medium",
  className,
}: MinusIconProps) {
  return (
    <FaMinus
      className={`${size === "small" ? "small_icon" : "icon"} ${className}`}
    />
  );
}
