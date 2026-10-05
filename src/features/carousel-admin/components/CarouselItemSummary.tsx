import Image from "next/image";
import { format, parseISO } from "date-fns";

import type { AdminCarouselItem } from "@/types/carousel";

type CarouselItemSummaryProps = {
  carouselItem: AdminCarouselItem;
};

const formatDate = (isoDate: string) => format(parseISO(isoDate), "yyyy.MM.dd");

// The backend sends timestamps in UTC without an offset.
const formatTimestamp = (isoTimestamp: string) =>
  formatDate(/(Z|[+-]\d{2}:\d{2})$/.test(isoTimestamp) ? isoTimestamp : `${isoTimestamp}Z`);

/**
 * Thumbnail, title, end date and last editor of a carousel item — the shared
 * left side of the Live and Archive rows.
 */
export default function CarouselItemSummary({
  carouselItem,
}: CarouselItemSummaryProps) {
  const endDateLabel = carouselItem.endDate
    ? `종료일 ${formatDate(carouselItem.endDate)}`
    : "종료일 없음";
  const editorLabel = carouselItem.updatedBy ?? "알 수 없음";
  const editedLabel = `${editorLabel} 수정 · ${formatTimestamp(carouselItem.updated)}`;

  return (
    <div className="flex min-w-0 flex-1 items-center gap-4">
      <Image
        src={carouselItem.imageUrl}
        alt=""
        width={96}
        height={64}
        // Mock-mode uploads are blob: URLs, which the optimizer can't fetch.
        unoptimized={carouselItem.imageUrl.startsWith("blob:")}
        className="aspect-[3/2] w-24 shrink-0 rounded-md bg-surface-subtle object-cover"
      />
      <div className="flex min-w-0 flex-col">
        <p className="type-label truncate text-foreground">
          {carouselItem.title}
        </p>
        <p className="type-caption text-muted-foreground">{endDateLabel}</p>
        <p className="type-caption truncate text-muted-foreground">
          {editedLabel}
        </p>
      </div>
    </div>
  );
}
