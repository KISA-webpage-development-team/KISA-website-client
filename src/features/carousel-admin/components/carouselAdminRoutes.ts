export const CAROUSEL_ADMIN_HREF = "/admin/website/carousel";

export const NEW_CAROUSEL_ITEM_HREF = "/admin/website/carousel/new";

export const templateCarouselItemHref = (carouselItemID: number) =>
  `${NEW_CAROUSEL_ITEM_HREF}?from=${carouselItemID}`;

/** A carousel item ID from a query string, or null. */
export const parseCarouselItemID = (raw: string | undefined) => {
  const carouselItemID = Number(raw);
  return raw && Number.isInteger(carouselItemID) && carouselItemID > 0
    ? carouselItemID
    : null;
};
