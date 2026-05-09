"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Skeleton } from "@umichkisa-ds/web";
import type { EventApi, EventClickArg } from "@fullcalendar/core";

import CalendarEventCard from "./CalendarEventCard";

const FullCalendarInner = dynamic(() => import("./FullCalendarInner"), {
  ssr: false,
  loading: () => <Skeleton className="aspect-[4/3] w-full" />,
});

const UPCOMING_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
const DESKTOP_BREAKPOINT = "(min-width: 768px)";

type CalendarView = "dayGridMonth" | "dayGridWeek";

/**
 * Calendar peek section — Google Calendar embed paired with a detail card.
 * Auto-selects the next upcoming event within 14 days; shows an explicit
 * empty state otherwise.
 *
 * One FullCalendar instance is mounted (not one per breakpoint); the view
 * (`dayGridMonth` desktop / `dayGridWeek` mobile) is picked from
 * `matchMedia` and re-keyed on viewport crossings. The whole inner component
 * is `next/dynamic`-loaded with `ssr: false` so the heavy library and Google
 * Calendar plugin stay out of the initial home bundle.
 */
export default function CalendarPeek() {
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [didAutoSelect, setDidAutoSelect] = useState(false);
  const [view, setView] = useState<CalendarView>("dayGridMonth");

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_BREAKPOINT);
    const update = () =>
      setView(mql.matches ? "dayGridMonth" : "dayGridWeek");
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const handleEventClick = (arg: EventClickArg) => {
    arg.jsEvent.preventDefault();
    setSelectedEvent(arg.event);
  };

  const handleEventsSet = (events: EventApi[]) => {
    if (didAutoSelect) return;
    if (events.length === 0) return;

    const now = Date.now();
    const upcoming = events
      .filter((e) => e.start && e.start.getTime() > now)
      .sort((a, b) => (a.start?.getTime() ?? 0) - (b.start?.getTime() ?? 0));

    const next = upcoming[0];
    setDidAutoSelect(true);

    if (!next || !next.start) {
      setSelectedEvent(null);
      return;
    }

    const diff = next.start.getTime() - now;
    if (diff > UPCOMING_WINDOW_MS) {
      setSelectedEvent(null);
      return;
    }
    setSelectedEvent(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-1">
        <h2 className="type-h2 text-foreground">다가오는 일정</h2>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full type-body-sm lg:basis-2/3">
          <FullCalendarInner
            // Re-key on view change forces a remount so FullCalendar picks up
            // the new initialView (its imperative API would also work but
            // requires a ref through the dynamic boundary).
            key={view}
            view={view}
            contentHeight={view === "dayGridWeek" ? 120 : undefined}
            onEventClick={handleEventClick}
            onEventsSet={handleEventsSet}
          />
        </div>

        <div className="w-full lg:basis-1/3">
          <CalendarEventCard event={selectedEvent} />
        </div>
      </div>
    </div>
  );
}
