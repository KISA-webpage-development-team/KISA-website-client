import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, Grid } from "@umichkisa-ds/web";

export type InfoSectionItem = {
  id: string;
  title: string;
  subtitle?: string;
  thumbnailSrc?: string;
  detailHref?: string;
};

export type InfoSection = {
  sectionName: string;
  sectionText: string;
  sectionIntro?: string;
  contentList: InfoSectionItem[];
};

export type InfoOverviewData = {
  infoType: "campus" | "housing" | "restaurants" | "sports" | "travel";
  infoTitle: string;
  pageIntro?: string[];
  sections: InfoSection[];
};

type Props = {
  data: InfoOverviewData;
  /**
   * Optional override for resolving an item's anchor target.
   * Defaults to `/info/{infoType}/detail/{sectionName}#{id}`.
   */
  resolveItemHref?: (section: InfoSection, item: InfoSectionItem) => string;
};

function defaultResolveItemHref(
  infoType: string,
  section: InfoSection,
  item: InfoSectionItem,
) {
  if (item.detailHref) return item.detailHref;
  return `/info/${infoType}/detail/${section.sectionName}#${item.id}`;
}

export default function InfoOverviewTemplate({ data, resolveItemHref }: Props) {
  const { infoType, infoTitle, pageIntro, sections } = data;

  return (
    <section className="flex flex-col gap-6 md:gap-10 lg:gap-14">
      {/* Page hero */}
      <header className="flex flex-col gap-2">
        <h1 className="type-h1">{infoTitle}</h1>
        {pageIntro?.length ? (
          <div className="flex flex-col gap-2">
            {pageIntro.map((paragraph, idx) => (
              <p key={idx} className="type-body text-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </header>

      {/* Sections */}
      <div className="flex flex-col gap-20 w-full">
        {sections.map((section, sectionIdx) => (
          <section
            key={section.sectionName}
            aria-labelledby={`section-${section.sectionName}`}
            className="flex flex-col gap-4 w-full"
          >
            <header className="flex flex-col gap-2">
              <h2 id={`section-${section.sectionName}`} className="type-h2">
                {section.sectionText}
              </h2>
              {section.sectionIntro && (
                <p className="type-body text-muted-foreground">
                  {section.sectionIntro}
                </p>
              )}
            </header>

            <Grid
              columns={{ base: 2, md: 2, lg: 3 }}
              gap="section"
              className="w-full"
            >
              {section.contentList.map((item, itemIdx) => {
                const href = resolveItemHref
                  ? resolveItemHref(section, item)
                  : defaultResolveItemHref(infoType, section, item);
                const src = item.thumbnailSrc ?? `/images/${item.id}.png`;
                const isAboveFold = sectionIdx === 0 && itemIdx < 3;
                return (
                  <Link
                    key={item.id}
                    href={href}
                    className="block focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] rounded-md"
                  >
                    <Card
                      hoverable
                      className="relative aspect-square w-full overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={item.title.replace(/\n/g, " ")}
                        fill
                        priority={isAboveFold}
                        className="absolute inset-0 object-cover"
                      />
                      {/* Legibility scrim */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                      <CardContent className="relative z-10 flex flex-col items-center justify-center gap-1 text-center text-white">
                        {item.title.split("\n").map((line, idx) => (
                          <span key={idx} className="type-h3">
                            {line}
                          </span>
                        ))}
                        {item.subtitle && (
                          <span className="type-body opacity-90">
                            {item.subtitle}
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </Grid>
          </section>
        ))}
      </div>
    </section>
  );
}
