import { IoTicketSharp } from "react-icons/io5";
import "./styles.css";

interface TicketIconProps {
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function TicketIcon({
  size = "medium",
  className,
}: TicketIconProps) {
  return (
    <IoTicketSharp
      className={`${
        size === "extra-small"
          ? "extra_small_icon"
          : size === "small"
          ? "small_icon"
          : "icon"
      } ${className}`}
    />
  );
}
