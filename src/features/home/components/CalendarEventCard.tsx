import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Icon,
} from "@umichkisa-ds/web";

import type { EventApi } from "@fullcalendar/core";

interface CalendarEventCardProps {
  event: EventApi | null;
}

function formatRange(start: Date | null, end: Date | null, allDay: boolean): string {
  if (!start) return "";
  const dateOpts: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (allDay) {
    return start.toLocaleDateString("ko-KR", dateOpts);
  }

  const startStr = `${start.toLocaleDateString("ko-KR", dateOpts)} ${start.toLocaleTimeString(
    "ko-KR",
    timeOpts
  )}`;
  if (!end) return startStr;
  const sameDay =
    start.toDateString() === end.toDateString();
  const endStr = sameDay
    ? end.toLocaleTimeString("ko-KR", timeOpts)
    : `${end.toLocaleDateString("ko-KR", dateOpts)} ${end.toLocaleTimeString("ko-KR", timeOpts)}`;
  return `${startStr} – ${endStr}`;
}

/**
 * Detail card paired with the calendar grid; renders the currently selected
 * event, or an empty-state when no upcoming event is within range.
 */
export default function CalendarEventCard({ event }: CalendarEventCardProps) {
  if (!event) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle as="h3">다가오는 일정이 없습니다</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="type-body text-muted-foreground">
            14일 이내 예정된 일정이 없습니다. 캘린더에서 다른 날짜를 선택해
            보세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  const location = (event.extendedProps?.location as string | undefined) ?? "";
  const description =
    (event.extendedProps?.description as string | undefined) ?? "";

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle as="h3">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="type-body text-foreground">
          {formatRange(event.start, event.end, event.allDay)}
        </p>
        {location ? (
          <p className="type-body inline-flex items-center gap-2 text-muted-foreground">
            <Icon name="info" size="sm" />
            {location}
          </p>
        ) : null}
        {description ? (
          <p className="type-body whitespace-pre-line text-muted-foreground">
            {description}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
