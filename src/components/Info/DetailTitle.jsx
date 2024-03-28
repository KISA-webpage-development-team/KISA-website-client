import React from "react";
import { arial } from "../../utils/fonts/textFonts";
import styles from "./detailTitle.module.css";

export default function DetailTitle({ title }) {
  return (
    <h className={`${arial.className} ${styles.arialCaption} text-center`}>
      {title}
    </h>
  );
}
