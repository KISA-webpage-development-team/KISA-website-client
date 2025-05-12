import { FaRegComments } from "react-icons/fa";
import "./styles.css";

export default function CommentIcon({ color = "black", noResize = false }) {
  return (
    <FaRegComments
      className={`${noResize ? "text-base" : "w-3 h-3 md:w-5 md:h-5"} ${
        color === "gray" ? "text-gray-400" : "text-black"
      }`}
    />
  );
}
