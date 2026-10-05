import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CarouselEditDialog from "@/features/carousel-admin/components/CarouselEditDialog";
import type { AdminCarouselItem } from "@/types/carousel";

const { updateCarouselItem } = vi.hoisted(() => ({
  updateCarouselItem: vi.fn(),
}));

vi.mock("@/apis/carousel/mutations", () => ({
  createCarouselItem: vi.fn(),
  updateCarouselItem,
}));

vi.mock("@/apis/cloudinary/carouselImage", () => ({
  uploadCarouselImage: vi.fn(),
  deleteCarouselTempImage: vi.fn(),
}));

// Quill needs a real browser; the description field is not under test here.
vi.mock("@/features/carousel-admin/components/CarouselDescriptionEditor", () => ({
  default: () => null,
}));

const carouselItem: AdminCarouselItem = {
  carouselItemID: 7,
  title: "Mass Meeting",
  description: "<p>Come meet us</p>",
  link: "https://forms.gle/example",
  imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/carousel/item-7",
  endDate: "2026-10-20",
  status: "live",
  position: 0,
  archivedAt: null,
  createdBy: "admin@umich.edu",
  updatedBy: "admin@umich.edu",
  created: "2026-09-01T00:00:00",
  updated: "2026-09-01T00:00:00",
};

const renderDialog = (onClose = vi.fn()) => {
  render(
    <CarouselEditDialog
      carouselItem={carouselItem}
      token="token"
      onClose={onClose}
    />
  );
  return onClose;
};

const pressEscape = () =>
  fireEvent.keyDown(document.activeElement ?? document.body, {
    key: "Escape",
  });

describe("CarouselEditDialog", () => {
  beforeEach(() => {
    updateCarouselItem.mockReset();
  });

  it("opens with the banner's fields filled in", () => {
    renderDialog();

    expect(screen.getByRole("dialog", { name: "배너 수정" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^제목/)).toHaveValue("Mass Meeting");
    expect(screen.getByLabelText("링크 (선택)")).toHaveValue(
      "https://forms.gle/example"
    );
  });

  it("closes right away when nothing changed", () => {
    const onClose = renderDialog();

    pressEscape();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("asks before closing with unsaved changes", async () => {
    const onClose = renderDialog();
    fireEvent.change(screen.getByLabelText(/^제목/), {
      target: { value: "Mass Meeting 2" },
    });

    pressEscape();

    expect(
      await screen.findByText("저장하지 않은 변경 사항이 있습니다.")
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "나가기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("saves the edit and closes", async () => {
    updateCarouselItem.mockResolvedValue({ ...carouselItem });
    const onClose = renderDialog();
    fireEvent.change(screen.getByLabelText(/^제목/), {
      target: { value: "Mass Meeting 2" },
    });

    const save = screen.getByRole("button", { name: "저장" });
    await waitFor(() => expect(save).toBeEnabled());
    fireEvent.click(save);

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(updateCarouselItem).toHaveBeenCalledWith(
      7,
      {
        title: "Mass Meeting 2",
        description: "<p>Come meet us</p>",
        link: "https://forms.gle/example",
        endDate: "2026-10-20",
      },
      "token"
    );
  });
});
