// Home page featured carousel items (backend: /api/v2/carousel)

type CarouselStatus = "live" | "archive";

interface CarouselItem {
  carouselItemID: number;
  title: string;
  description: string; // HTML from the restricted editor; render sanitized
  link: string | null;
  imageUrl: string;
}

interface AdminCarouselItem extends CarouselItem {
  endDate: string | null; // YYYY-MM-DD
  status: CarouselStatus; // effective status
  position: number | null;
  archivedAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  created: string;
  updated: string;
}

interface AdminCarouselList {
  live: AdminCarouselItem[];
  archive: AdminCarouselItem[];
}

interface CarouselItemFields {
  title: string;
  description: string;
  link: string | null;
  endDate: string | null;
}

// Create takes exactly one image source; update takes an optional new upload.
type CreateCarouselItemBody = CarouselItemFields &
  ({ imageTempPublicID: string } | { copyImageFrom: number });

type UpdateCarouselItemBody = CarouselItemFields & {
  imageTempPublicID?: string;
};

export type {
  CarouselStatus,
  CarouselItem,
  AdminCarouselItem,
  AdminCarouselList,
  CarouselItemFields,
  CreateCarouselItemBody,
  UpdateCarouselItemBody,
};
