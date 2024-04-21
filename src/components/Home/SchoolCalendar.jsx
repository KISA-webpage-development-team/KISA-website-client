"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import dayGridPlugin from "@fullcalendar/daygrid";

import CalendarEventCard from "./CalendarEventCard";
import {
  sejongHospitalBold,
  sejongHospitalLight,
} from "../../utils/fonts/textFonts";

// event summary display
function renderEventContent(eventInfo) {
  return (
    <div
      className={`flex gap-2 ${
        sejongHospitalLight.className
      } py-1 px-1 md:px-2 ${
        eventInfo.event.allDay && "bg-michigan-blue text-white "
      } text-[6px] sm:text-xs md:text-sm lg:text-base`}
    >
      {eventInfo.timeText && (
        <span className="hidden md:block">{eventInfo.timeText + "m"}</span>
      )}
      <div
        className={` ${sejongHospitalBold.className} overflow-hidden break-words`}
      >
        {eventInfo.event.title}
      </div>
    </div>
  );
}

export default function SchoolCalendar() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    arg.jsEvent.preventDefault();
    setSelectedEvent(arg.event);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <h2>Calendar</h2>
      <div className="flex flex-col md:flex-row h-full gap-6">
        <div className="w-full text-sm lg:text-base hidden md:block">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={
              process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
            }
            events={{
              googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
            }}
            eventContent={renderEventContent}
            eventDisplay={"block"}
            eventTextColor={"#00274C"}
            eventColor={"#FFCB05"}
            eventClick={handleDateClick}
          />
        </div>
        <div className="w-full text-[8px] sm:text-xs md:text-sm block md:hidden">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridWeek"
            googleCalendarApiKey={
              process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY
            }
            events={{
              googleCalendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
            }}
            eventContent={renderEventContent}
            eventDisplay={"block"}
            eventTextColor={"#00274C"}
            eventColor={"#FFCB05"}
            eventClick={handleDateClick}
          />
        </div>

        {selectedEvent && (
          <div className="basis-1/3 h-full w-full">
            <CalendarEventCard event={selectedEvent} />
          </div>
        )}
      </div>
    </div>
  );
}
