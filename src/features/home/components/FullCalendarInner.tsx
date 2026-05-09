"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import FullCalendar from "@fullcalendar/react";
import type {
  EventApi,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";

import { GOOGLE_CALENDAR_API_KEY, GOOGLE_CALENDAR_ID } from "@/constants/env";

interface FullCalendarInnerProps {
  view: "dayGridMonth" | "dayGridWeek";
  contentHeight?: number;
  onEventClick: (arg: EventClickArg) => void;
  onEventsSet: (events: EventApi[]) => void;
}

function renderEventContent(eventInfo: EventContentArg) {
  const isAllDay = eventInfo.event.allDay;
  return (
    <div
      className={`type-caption flex gap-1 overflow-hidden break-words px-1 py-0.5 md:px-2 ${
        isAllDay ? "bg-brand-primary text-brand-foreground" : "text-foreground"
      }`}
    >
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {eventInfo.event.title}
      </span>
    </div>
  );
}

/**
 * Thin wrapper around FullCalendar so the heavy library + Google Calendar
 * plugin can be code-split out of the home-page initial bundle via
 * `next/dynamic({ ssr: false })`.
 *
 * `eventTextColor` / `eventColor` are FullCalendar API props that don't
 * resolve CSS variables — raw hex required to drive event styling.
 */
export default function FullCalendarInner({
  view,
  contentHeight,
  onEventClick,
  onEventsSet,
}: FullCalendarInnerProps) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, googleCalendarPlugin]}
      initialView={view}
      googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
      events={{ googleCalendarId: GOOGLE_CALENDAR_ID }}
      eventContent={renderEventContent}
      eventDisplay="block"
      eventTextColor="#00274C"
      eventColor="#FFCB05"
      eventClick={onEventClick}
      eventsSet={onEventsSet}
      contentHeight={contentHeight}
    />
  );
}
