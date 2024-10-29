import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import "./styles.css";

type LikeIconProps = {
  size: "small" | "medium";
  fill?: boolean;
  isGray?: boolean;
};

// This LikeIcon is kind of special one for 개추 버튼
export default function LikeIcon({
  size,
  fill = false,
  isGray = false,
}: LikeIconProps) {
  // this is used on like

  if (fill) {
    return (
      <AiFillLike
        className={`${size === "small" ? "small_icon" : "icon"} 
      ${!isGray && "text-michigan-light-blue"}`}
      />
    );
  }

  return (
    <AiOutlineLike
      className={`${size === "small" ? "small_icon" : "icon"} 
      ${!isGray && "text-michigan-light-blue"}`}
    />
  );
}
