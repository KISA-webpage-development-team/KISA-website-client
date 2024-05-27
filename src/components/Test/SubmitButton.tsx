// [NOTE] Later, SubmitButton will be changed to Abstract CustomButton component

import React from "react";
import { EditorMode } from "./model/props/posts";

type Props = {
  onClick: () => void;
  mode: EditorMode;
};

export default function SubmitButton({ onClick, mode }: Props) {
  return (
    <button className="w-1/4 h-10 blue_button" onClick={onClick}>
      {mode === "create" ? "등록" : "수정"}
    </button>
  );
}
