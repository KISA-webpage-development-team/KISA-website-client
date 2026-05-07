import Image from "next/image";
import { Badge } from "@umichkisa-ds/web";
import { eventsPageData } from "@/features/about-page/data/eventsPageData";

export const metadata = {
  title: "활동 소개",
  description:
    "KISA가 진행하는 리크루팅, 네트워킹, 포차, 펀드레이징 등 주요 활동을 소개합니다.",
};

type EventRecord = {
  id: string;
  imageTitle: string;
  title: string;
  desc: string;
};

export default function EventsPage() {
  const records = eventsPageData as EventRecord[];

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Header — mirrors /about/kisa editorial language */}
      <header className="flex flex-col items-center text-center gap-6 pt-4">
        <p className="type-label tracking-[0.2em] text-brand-primary">
          <Badge variant="brand">ACTIVITIES</Badge>
          <span className="mx-3 text-muted-foreground">·</span>
          <span className="text-brand-primary">활동</span>
        </p>
        <h1 className="type-display text-brand-primary text-balance max-w-3xl">
          활동 소개
        </h1>
      </header>

      {/* 8 records — alternating image side, numbered 01-08 */}
      <div className="flex flex-col gap-6">
        {records.map((event, index) => {
          const number = String(index + 1).padStart(2, "0");
          const isReversed = index % 2 === 1;
          return (
            <article
              key={event.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div
                className={`md:col-span-6 ${
                  isReversed ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md bg-surface-subtle">
                  <Image
                    src={`/events/${event.id}.png`}
                    alt={event.imageTitle}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className={`md:col-span-6 flex flex-col gap-4 ${
                  isReversed ? "md:order-1" : "md:order-2"
                }`}
              >
                <span
                  aria-hidden
                  className="type-h3 text-brand-accent"
                >
                  {number}
                </span>
                <h2 className="type-h1 text-brand-primary text-balance">
                  {event.title}
                </h2>
                <p className="type-body text-foreground">{event.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
