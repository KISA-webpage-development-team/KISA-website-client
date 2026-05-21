import Image from "next/image";
import { ReactNode } from "react";

export type InfoDetailRecord = {
  id: string;
  title: string;
  desc: ReactNode;
  thumbnailSrc?: string;
};

export type InfoDetailData = {
  pageTitle?: string;
  pageHeroSrc?: string;
  records: InfoDetailRecord[];
};

type Props = {
  data: InfoDetailData;
};

export default function InfoDetailTemplate({ data }: Props) {
  const { pageTitle, pageHeroSrc, records } = data;

  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      {/* Page hero — stays inside Container (no full-bleed) */}
      {(pageTitle || pageHeroSrc) && (
        <header className="flex flex-col gap-4">
          {pageHeroSrc && (
            <div className="relative w-full aspect-[16/6] overflow-hidden rounded-lg bg-brand-primary">
              <Image
                src={pageHeroSrc}
                alt={pageTitle ?? ""}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            </div>
          )}
          {pageTitle && <h1 className="type-h1">{pageTitle}</h1>}
        </header>
      )}

      {/* Stacked records — image left, content right */}
      <ul className="flex flex-col gap-16 md:gap-20 lg:gap-24 list-none p-0 m-0">
        {records.map((record) => {
          const src = record.thumbnailSrc ?? `/images/${record.id}.png`;
          return (
            <li
              key={record.id}
              id={record.id}
              className="scroll-mt-24 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10"
            >
              <div className="relative w-full md:w-80 lg:w-96 shrink-0 aspect-[4/3] md:aspect-square overflow-hidden rounded-md">
                <Image
                  src={src}
                  alt={record.title.replace(/\n/g, " ")}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
                <h2 className="type-h2 text-foreground">
                  {record.title.split("\n").map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <div className="type-body text-foreground">{record.desc}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
