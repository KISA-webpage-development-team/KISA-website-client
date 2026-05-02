import React from "react";
import { PochaInfo } from "@/types/pocha";

interface HomeHeadingProps {
  pochaInfo: PochaInfo;
}

export default function HomeHeading({ pochaInfo }: HomeHeadingProps) {
  return (
    <div
      className="flex flex-col items-center px-4 pt-2 gap-2"
      id="pocha-heading"
    >
      {/* Title - pocha name */}
      <h1 className="type-h2 text-foreground">{pochaInfo?.title}</h1>

      {/* Description - pocha description */}
      <p className="type-body-sm text-center text-muted-foreground">
        {pochaInfo?.description}
      </p>
    </div>
  );
}
