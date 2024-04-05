import React from "react";

export default function ImageButton({ icon, text, onClick }) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200
      flex items-center justify-center text-black 
    py-2 px-2 md:px-4 rounded"
      onClick={onClick}
    >
      {icon}
      <p className="hidden md:block ml-1">{text}</p>
    </button>
  );
}
