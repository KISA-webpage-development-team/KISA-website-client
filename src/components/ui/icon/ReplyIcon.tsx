import { ImReply } from "react-icons/im";
import "./styles.css";

interface ReplyIconProps {
  type?: "normal" | "flip";
  size?: "extra-small" | "small" | "medium";
  className?: string;
}

export default function ReplyIcon({
  type = "normal",
  size = "medium",
  className,
}: ReplyIconProps) {
  return (
    <ImReply
      className={`${
        size === "extra-small"
          ? "extra_small_icon"
          : size === "small"
          ? "small_icon"
          : "icon"
      } ${className} ${type === "flip" ? "scale-x-[-1]" : ""}`}
    />
  );
}
