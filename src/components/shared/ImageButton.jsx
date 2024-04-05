import React from "react";

export default function ImageButton({ icon, text = "", onClick }) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200
      flex items-center justify-center text-black 
    py-[6px] md:py-2 px-2 md:px-4 rounded gap-1"
      onClick={onClick}
    >
      {icon}
      <p className="text-xs sm:text-sm md:text-base">{text}</p>
    </button>
  );
}
