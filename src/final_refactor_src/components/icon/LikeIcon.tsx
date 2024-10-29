import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import "./styles.css";

// This LikeIcon is kind of special one for 개추 버튼
export default function LikeIcon({ size, fill = false }) {
  // this is used on like

  if (fill) {
    return (
      <AiFillLike
        className={`${size === "small" ? "small_icon" : "icon"} 
      text-michigan-light-blue`}
      />
    );
  }

  return (
    <AiOutlineLike
      className={`${size === "small" ? "small_icon" : "icon"} 
      text-michigan-light-blue`}
    />
  );
}
