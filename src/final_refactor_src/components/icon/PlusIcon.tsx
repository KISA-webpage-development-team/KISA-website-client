import { FaPlus } from "react-icons/fa";
import "./styles.css";

interface PlusIconProps {
  size?: "small" | "medium";
  className?: string;
}

export default function PlusIcon({
  size = "medium",
  className,
}: PlusIconProps) {
  return (
    <FaPlus
      className={`${size === "small" ? "small_icon" : "icon"} ${className}`}
    />
  );
}
