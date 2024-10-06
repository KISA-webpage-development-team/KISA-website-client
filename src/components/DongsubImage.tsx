import Image from "next/image";
import React from "react";

export default function DongsubImage() {
  return (
    <div>
      <Image src="/kisa_all.png" width={200} height={200} alt="all" />
      {/* <span></span> */}
      <p>너희에게 벡엔드를 알려주마</p>
    </div>
  );
}
