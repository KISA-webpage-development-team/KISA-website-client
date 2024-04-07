import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";

export default function InstagramIcon({ color = "none" }) {
  if (color === "black") {
    return (
      <AiOutlineInstagram className={`w-6 h-6 md:w-8 md:h-8 text-black`} />
    );
  }

  return (
    <AiOutlineInstagram
      className="w-9 h-9 rounded-lg
text-white bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
    p-[0.15rem]"
    />
  );
}
