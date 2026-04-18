import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeaderTitle() {
  return (
    <Link
      href="/"
      aria-label="KISA home"
      className="flex items-center gap-5"
    >
      <Image
        src="/kisa_logo.png"
        alt="KISA Logo"
        width={48}
        height={48}
        className="object-contain"
      />
      <span className="flex flex-col items-start gap-0">
        <span className="text-white type-label">University of Michigan</span>
        <span className="text-white type-h2">한인 학생회</span>
      </span>
    </Link>
  );
}
