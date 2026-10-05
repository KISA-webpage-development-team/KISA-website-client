import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import CarouselItemForm from "@/features/carousel-admin/components/CarouselItemForm";
import type { AdminCarouselItem } from "@/types/carousel";

vi.mock("@/apis/carousel/mutations", () => ({
  createCarouselItem: vi.fn(),
  updateCarouselItem: vi.fn(),
}));

vi.mock("@/apis/cloudinary/carouselImage", () => ({
  uploadCarouselImage: vi.fn(),
  deleteCarouselTempImage: vi.fn(),
}));

// Quill needs a real browser; the description field is not under test here.
vi.mock("@/features/carousel-admin/components/CarouselDescriptionEditor", () => ({
  default: () => null,
}));


// The create form's slide preview measures itself; jsdom has no ResizeObserver.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const editedItem: AdminCarouselItem = {
  carouselItemID: 7,
  title: "Mass Meeting",
  description: "<p>Come meet us</p>",
  link: null,
  imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/carousel/item-7",
  endDate: "2026-09-30",
  status: "archive",
  position: null,
  archivedAt: null,
  createdBy: "admin@umich.edu",
  updatedBy: "admin@umich.edu",
  created: "2026-09-01T00:00:00",
  updated: "2026-09-01T00:00:00",
};

describe("CarouselItemForm", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 9, 5));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("marks the title as required", () => {
    render(
      <CarouselItemForm
        mode="create"
        initialItem={undefined}
        token="token"
        onCancel={vi.fn()}
        onSaved={vi.fn()}
        onDirtyChange={vi.fn()}
      />
    );

    // The design system marks required fields with a "*" after the label.
    expect(document.querySelector('label[for="title"]')).toHaveTextContent(
      "제목*"
    );
  });

  it("disables past days in the end date picker", async () => {
    render(
      <CarouselItemForm
        mode="create"
        initialItem={undefined}
        token="token"
        onCancel={vi.fn()}
        onSaved={vi.fn()}
        onDirtyChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "종료일 없음" }));

    expect(
      await screen.findByRole("button", { name: /October 1st, 2026/ })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /October 5th, 2026/ })
    ).toBeEnabled();
  });

  it("keeps past days selectable when editing", async () => {
    render(
      <CarouselItemForm
        mode="edit"
        initialItem={editedItem}
        token="token"
        onCancel={vi.fn()}
        onSaved={vi.fn()}
        onDirtyChange={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "2026.09.30" }));

    expect(
      await screen.findByRole("button", { name: /October 1st, 2026/ })
    ).toBeEnabled();
  });
});
