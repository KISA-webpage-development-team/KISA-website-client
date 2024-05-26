import Image from "next/image";
import React from "react";

export default function ComponentA() {
  return (
    <Image
      src="/kisa_all.png"
      alt="KISA All"
      width={500}
      height={500}
      priority
    />
  );
}
