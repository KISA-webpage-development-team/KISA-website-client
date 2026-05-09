import Image from "next/image";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@umichkisa-ds/web";

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
    <section className="flex flex-col gap-6">
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
          {pageTitle && <h1 className="type-display">{pageTitle}</h1>}
        </header>
      )}

      {/* Stacked compact records */}
      <ul className="flex flex-col gap-4 list-none p-0 m-0">
        {records.map((record) => {
          const src = record.thumbnailSrc ?? `/images/${record.id}.png`;
          return (
            <li key={record.id} id={record.id} className="scroll-mt-24">
              <Card>
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-64 lg:w-80 shrink-0 aspect-[4/3] md:aspect-square">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <CardHeader>
                      <CardTitle as="h2" className="type-h3">
                        {record.title.split("\n").map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="type-body text-foreground">
                        {record.desc}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
