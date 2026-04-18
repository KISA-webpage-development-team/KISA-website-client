import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderTitle() {
  return (
    <div className="flex items-center gap-5">
      <Link href="/" className="flex flex-col items-start gap-0">
        <Image
          src="/kisa_logo.png"
          alt="KISA Logo"
          width={48}
          height={48}
          className="object-contain"
        />
      </Link>
    </div>
  );
}
