import React from "react";
import { FaFacebook } from "react-icons/fa";

export default function FacebookIcon({ color = "none" }) {
  if (color === "black") {
    return <FaFacebook className={`w-6 h-6 text-black`} />;
  }

  return <FaFacebook className="w-10 h-10 text-blue-500" />;
}
