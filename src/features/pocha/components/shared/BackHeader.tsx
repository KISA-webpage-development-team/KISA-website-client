"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconButton } from "@umichkisa-ds/web";

interface BackHeaderProps {
  title: string;
}

export default function BackHeader({ title }: BackHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative flex items-center justify-center py-3">
      <IconButton
        icon="chevron-left"
        aria-label="Back"
        size="md"
        variant="tertiary"
        onClick={() => router.back()}
        className="absolute left-2"
      />
      <h1 className="type-h3 text-foreground">{title}</h1>
    </header>
  );
}
