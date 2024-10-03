import React from "react";

type CustomImageButtonProps = {
  background?: "none" | "gray";
  icon: React.ReactNode;
  text?: string;
  onClick?: () => void;
};

export default function CustomImageButton({
  background = "gray",
  icon,
  text = "",
  onClick,
}: CustomImageButtonProps) {
  return (
    <button
      className={`${
        background === "none"
          ? ""
          : "bg-slate-100 hover:bg-slate-200text-black  py-[6px] px-2 rounded "
      } flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {icon}
      {text !== "" && (
        <p
          className={`
          ${background === "none" ? "hidden sm:block" : "block"}
        text-xs md:text-sm 
        hover:underline`}
        >
          {text}
        </p>
      )}
    </button>
  );
}
