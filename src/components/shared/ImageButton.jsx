import React from "react";

export default function ImageButton({ icon, text = "", onClick }) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200
      flex items-center justify-center text-black 
    py-[6px] px-2 rounded gap-1"
      onClick={onClick}
    >
      {icon}
      {text !== "" && <p className="text-xs md:text-sm">{text}</p>}
    </button>
  );
}
