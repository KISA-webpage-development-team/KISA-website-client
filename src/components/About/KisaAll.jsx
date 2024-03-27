import Image from "next/image";
import React from "react";
import styles from "./kisaAll.module.css";

export default function KisaAll() {
  return (
    <div className="relative flex justify-center h-[450px]">
      <Image
        className={`${styles.testImg} object-cover`}
        src="/images/kisa_all.png"
        alt="23-24 KISA 단체사진"
        width={1252}
        height={560}
        priority
      />
      <div className="absolute bg-[#00000040] opacity-[81%] w-[1252px] h-full" />
    </div>
  );
}
