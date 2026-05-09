import { Fragment } from "react";

import Image from "next/image";
import { Divider } from "@umichkisa-ds/web";

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

function EventRow({ event, index }: { event: EventRecord; index: number }) {
  const hasImage = EVENT_IMAGE_IDS.has(event.id);
  const imageSide =
    index % 2 === 0 ? "md:order-last" : "md:order-first";

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
      {/* Image / placeholder */}
      <div className={`md:col-span-6 ${imageSide}`}>
        <figure className="relative w-full aspect-[4/3] overflow-hidden rounded-md border border-border bg-surface-subtle">
          {hasImage ? (
            <Image
              src={`/events/${event.id}.png`}
              alt={event.imageTitle}
              fill
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
              className="object-contain"
              priority={index === 0}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="type-h3 text-muted-foreground">
                {event.imageTitle}
              </span>
            </div>
          )}
        </figure>
      </div>

      {/* Copy */}
      <div className="md:col-span-6 flex flex-col gap-4">
        <span className="type-caption text-muted-foreground tracking-widest uppercase">
          {String(index + 1).padStart(2, "0")} / {event.imageTitle}
        </span>
        <h2 className="type-h2 text-foreground">{event.title}</h2>
        <p className="type-body text-foreground">{event.desc}</p>
      </div>
    </article>
  );
}

export default function EventsPage() {
  return (
    <section className="flex flex-col gap-20">
      {/* Page header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <p className="type-caption text-muted-foreground tracking-widest uppercase">
            WHAT WE DO · 활동 소개
          </p>
          <h1 className="type-display text-foreground">활동 소개</h1>
        </div>
        <p className="type-body text-muted-foreground max-w-md">
          매 학기 주최하는 정기 이벤트부터 한 해 단위 프로젝트까지, KISA가
          이어가는 활동들을 한곳에 모았습니다.
        </p>
      </header>

      {/* Event list */}
      <div className="flex flex-col gap-16">
        {eventsPageData.map((event, i) => (
          <Fragment key={event.id}>
            <EventRow event={event} index={i} />
            {i < eventsPageData.length - 1 && <Divider />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
