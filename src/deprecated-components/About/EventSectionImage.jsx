import Image from "next/image";
import React from "react";

export default function EventSectionImage({ id, imageTitle }) {
  return (
    <div className="relative aspect-square h-full">
      <Image
        className="object-cover"
        src={`/events/${id}.png`}
        alt={imageTitle}
        fill
      />
    </div>
  );
}
