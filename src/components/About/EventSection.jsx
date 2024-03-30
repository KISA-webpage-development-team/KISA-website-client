import React from "react";
import EventSectionTitle from "./EventSectionTitle";
import EventSectionDesc from "./EventSectionDesc";
import EventSectionImage from "./EventSectionImage";

export default function EventSection({ event }) {
  const { id, imageTitle, title, desc } = event;
  return (
    <div className="flex flex-col sm:flex-row w-full gap-12 sm:gap-24 md:gap-28 lg:gap-32">
      <div
        className="flex flex-col 
      gap-6 md:gap-8 lg:gap-10 text-left"
      >
        <EventSectionTitle title={title} />
        <EventSectionDesc desc={desc} />
      </div>

      <div className="flex sm:block w-full justify-center">
        <EventSectionImage id={id} imageTitle={imageTitle} />
      </div>
    </div>
  );
}
