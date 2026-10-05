import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import type { CarouselItem } from "@/types/carousel";

const items: CarouselItem[] = [
  {
    carouselItemID: 1,
    title: "Mass Meeting",
    description: '<p>Come <strong>meet</strong> us<img src=x onerror="alert(1)"></p>',
    link: "https://forms.gle/example",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/carousel/item-1",
  },
  {
    carouselItemID: 2,
    title: "Pocha Night",
    description: "<p>Food</p>",
    link: null,
    imageUrl: "https://res.cloudinary.com/demo/image/upload/v1/carousel/item-2",
  },
];

describe("FeaturedCarousel", () => {
  it("renders the given items with their own image URLs", () => {
    render(<FeaturedCarousel items={items} />);

    const images = screen.getAllByRole("img", { hidden: true });
    expect(images.map((img) => img.getAttribute("src"))).toEqual([
      items[0].imageUrl,
      items[1].imageUrl,
    ]);
    expect(screen.getByRole("heading", { name: "Mass Meeting" })).toBeInTheDocument();
  });

  it("renders the description as sanitized HTML", () => {
    const { container } = render(<FeaturedCarousel items={items} />);

    const strong = container.querySelector("strong");
    expect(strong?.textContent).toBe("meet");
    expect(container.querySelector("[onerror]")).toBeNull();
    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  it("renders nothing without items", () => {
    const { container } = render(<FeaturedCarousel items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

const shownTitle = () =>
  screen
    .getAllByRole("tab", { hidden: true })
    .find((tab) => tab.getAttribute("aria-selected") === "true")
    ?.getAttribute("aria-label");

const advance = (ms: number) =>
  act(() => {
    vi.advanceTimersByTime(ms);
  });

describe("FeaturedCarousel rotation", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"],
    });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("auto-rotates on the public page without admin controls", () => {
    render(<FeaturedCarousel items={items} />);

    advance(10_100);

    expect(shownTitle()).toBe("Pocha Night 보기");
    expect(screen.queryByRole("button", { name: "재생" })).toBeNull();
    expect(screen.queryByRole("button", { name: "다음 배너" })).toBeNull();
  });

  it("starts paused in admin mode", () => {
    render(<FeaturedCarousel items={items} adminMode />);

    advance(20_000);

    expect(shownTitle()).toBe("Mass Meeting 보기");
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("hides the admin controls with a single item", () => {
    render(<FeaturedCarousel items={[items[0]]} adminMode />);

    expect(screen.queryByRole("button", { name: "다음 배너" })).toBeNull();
    expect(screen.queryByRole("button", { name: "재생" })).toBeNull();
    expect(screen.queryByText("1 / 1")).toBeNull();
  });

  it("holds still when playing drops to a single item", () => {
    const { container, rerender } = render(
      <FeaturedCarousel items={items} adminMode />
    );
    fireEvent.click(screen.getByRole("button", { name: "재생" }));

    rerender(<FeaturedCarousel items={[items[0]]} adminMode />);
    advance(5_000);

    const bar = container.querySelector<HTMLElement>(
      '[role="progressbar"] > span'
    );
    expect(bar?.style.width).toBe("0%");
  });

  it("steps with the previous and next buttons, wrapping around", () => {
    render(<FeaturedCarousel items={items} adminMode />);

    fireEvent.click(screen.getByRole("button", { name: "다음 배너" }));
    expect(shownTitle()).toBe("Pocha Night 보기");
    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "다음 배너" }));
    expect(shownTitle()).toBe("Mass Meeting 보기");

    fireEvent.click(screen.getByRole("button", { name: "이전 배너" }));
    expect(shownTitle()).toBe("Pocha Night 보기");
  });

  it("rotates after play and holds after pause", () => {
    render(<FeaturedCarousel items={items} adminMode />);

    fireEvent.click(screen.getByRole("button", { name: "재생" }));
    advance(10_100);
    expect(shownTitle()).toBe("Pocha Night 보기");

    fireEvent.click(screen.getByRole("button", { name: "일시정지" }));
    advance(20_000);
    expect(shownTitle()).toBe("Pocha Night 보기");
  });

  it("keeps showing the same item when the order changes", () => {
    const { rerender } = render(
      <FeaturedCarousel items={items} adminMode />
    );
    fireEvent.click(screen.getByRole("button", { name: "다음 배너" }));

    rerender(<FeaturedCarousel items={[items[1], items[0]]} adminMode />);

    expect(shownTitle()).toBe("Pocha Night 보기");
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("keeps showing the first item when the order changes before any navigation", () => {
    const { rerender } = render(
      <FeaturedCarousel items={items} adminMode />
    );

    rerender(<FeaturedCarousel items={[items[1], items[0]]} adminMode />);

    expect(shownTitle()).toBe("Mass Meeting 보기");
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("keeps showing the fallback item when the order changes afterwards", () => {
    const third: CarouselItem = { ...items[1], carouselItemID: 3, title: "Yearbook" };
    const { rerender } = render(
      <FeaturedCarousel items={[...items, third]} adminMode />
    );
    fireEvent.click(screen.getByRole("button", { name: "다음 배너" }));

    rerender(<FeaturedCarousel items={[items[0], third]} adminMode />);
    rerender(<FeaturedCarousel items={[third, items[0]]} adminMode />);

    expect(shownTitle()).toBe("Mass Meeting 보기");
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("falls back to the first item when the shown item is gone", () => {
    const { rerender } = render(
      <FeaturedCarousel items={items} adminMode />
    );
    fireEvent.click(screen.getByRole("button", { name: "다음 배너" }));

    rerender(<FeaturedCarousel items={[items[0]]} adminMode />);

    expect(shownTitle()).toBe("Mass Meeting 보기");
  });
});
