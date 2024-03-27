import React from "react";

export default function ImageButton({ icon, text, onClick }) {
  return (
    <button className="simple_button" onClick={onClick}>
      {icon}
      <p className="ml-1">{text}</p>
    </button>
  );
}
