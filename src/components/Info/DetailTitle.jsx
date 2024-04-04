import React from "react";
import { arial } from "../../utils/fonts/textFonts";
import styles from "./detailTitle.module.css";

export default function DetailTitle({ title }) {
  return (
    <div
      className={`${arial.className} ${styles.arialCaption} text-center
       text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
    >
      {title}
    </div>
  );
}
