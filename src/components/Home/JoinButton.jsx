"use client";

import React from "react";
import styles from "./joinButton.module.css";
import { arial } from "../../utils/fonts/textFonts";

export default function JoinButton() {
  const handleJoinKisa = () => {
    console.log("Join KISA");
  };

  return (
    <button
      className={`${styles.joinButton} ${arial.className} text-white text-xl
      flex justify-center items-center hover:opacity-70`}
      onClick={handleJoinKisa}
    >
      JOIN
    </button>
  );
}
