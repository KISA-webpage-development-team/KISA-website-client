import React from "react";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

export default function CalendarEventCard({ event }) {
  const startTime = new Date(event.start).toLocaleTimeString([], {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = new Date(event.end).toLocaleTimeString([], {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  // .

  return (
    <div
      className="w-full flex gap-10 border border-michigan-blue rounded-lg 
    p-4 md:p-5"
    >
      {/* Left: [optional] photo */}

      {/* Right: title + date + description */}
      <div
        className={`flex flex-col ${sejongHospitalLight.className} gap-1 md:gap-2
      text-sm md:text-base lg:text-lg`}
      >
        <span
          className={`${sejongHospitalBold.className} text-sm md:text-xl lg:text-2xl`}
        >
          {event.title}
        </span>
        <>
          <span className="text-xs md:text-sm lg:text-base">
            {startTime} - {endTime}
          </span>
        </>

        <p className="">{event.extendedProps?.location}</p>
        {event?.extendedProps?.description && (
          <p className="">{event.extendedProps?.description}</p>
        )}
      </div>
    </div>
  );
}
