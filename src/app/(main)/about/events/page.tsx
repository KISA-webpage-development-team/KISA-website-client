import Image from "next/image";

import { Grid } from "@umichkisa-ds/web";

import {
  eventsPageData,
  type EventRecord,
} from "@/features/about-page/data/eventsPageData";

export const metadata = {
  title: "활동 소개",
  description:
    "KISA가 매 학기 주최하는 이벤트와 정기 프로젝트들을 한곳에 정리한 활동 소개 페이지입니다.",
};

// ids for which a /public/events/<id>.png exists; others render a typographic
// placeholder card instead of a broken image.
const EVENT_IMAGE_IDS = new Set([
  "course_evaluation_booklet",
  "fundraising",
  "monthly_newsletter",
  "networking_session",
  "pocha",
  "recruiting",
  "small_group",
  "yearbook",
]);

function EventCard({ event, index }: { event: EventRecord; index: number }) {
  const hasImage = EVENT_IMAGE_IDS.has(event.id);

  return (
    <article className="flex flex-col sm:flex-row gap-6 sm:items-start">
      {/* Copy — left */}
      <div className="flex flex-col gap-3 sm:flex-1 sm:min-w-0">
        <h2 className="type-h2 text-foreground">{event.title}</h2>
        <p className="type-body text-foreground">{event.desc}</p>
      </div>

      {/* Image — right */}
      <figure className="relative w-32 sm:w-40 aspect-square overflow-hidden rounded-md border border-border bg-surface-subtle sm:shrink-0">
        {hasImage ? (
          <Image
            src={`/events/${event.id}.png`}
            alt={event.imageTitle}
            fill
            sizes="160px"
            className="object-cover"
            priority={index === 0}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="type-body-sm text-muted-foreground text-center px-2">
              {event.imageTitle}
            </span>
          </div>
        )}
      </figure>
    </article>
  );
}

export default function EventsPage() {
  return (
    <section className="flex flex-col gap-6">
      {/* Page header */}
      <header>
        <h1 className="type-h1 text-foreground">활동 소개</h1>
      </header>

      {/* Event grid */}
      <Grid columns={{ base: 1, md: 2 }} gap="section">
        {eventsPageData.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </Grid>
    </section>
  );
}
