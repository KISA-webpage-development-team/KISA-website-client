import Image from "next/image";
import React from "react";
import styles from "./homeBackground.module.css";

export default function HomeBackground() {
  return (
    <div className={styles.background}>
      <Image className="object-cover -z-20" src="/images/umich.png" alt="Umich" fill />

      <div className="bg-[#707070] w-full h-full -z-10 opacity-70" />
    </div>
  );
}
