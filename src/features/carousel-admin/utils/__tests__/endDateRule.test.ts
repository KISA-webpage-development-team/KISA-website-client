import { describe, expect, it } from "vitest";
import { sortByEndDateRule } from "@/features/carousel-admin/utils/endDateRule";

const item = (id: number, endDate: string | null, created: string) => ({
  carouselItemID: id,
  endDate,
  created,
});

describe("sortByEndDateRule", () => {
  it("puts the soonest end date first and undated items last, newest first", () => {
    const items = [
      item(1, null, "2026-01-01T00:00:00"),
      item(2, "2026-10-20", "2026-01-01T00:00:00"),
      item(3, null, "2026-09-01T00:00:00"),
      item(4, "2026-10-08", "2026-01-01T00:00:00"),
    ];

    expect(sortByEndDateRule(items).map((i) => i.carouselItemID)).toEqual([4, 2, 3, 1]);
  });

  it("breaks end date ties by newest first", () => {
    const items = [
      item(1, "2026-10-08", "2026-01-01T00:00:00"),
      item(2, "2026-10-08", "2026-05-01T00:00:00"),
    ];

    expect(sortByEndDateRule(items).map((i) => i.carouselItemID)).toEqual([2, 1]);
  });

  it("does not mutate its input", () => {
    const items = [item(1, null, "2026-01-01T00:00:00"), item(2, "2026-10-08", "2026-01-01T00:00:00")];
    sortByEndDateRule(items);
    expect(items.map((i) => i.carouselItemID)).toEqual([1, 2]);
  });
});
