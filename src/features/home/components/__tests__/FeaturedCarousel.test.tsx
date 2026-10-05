import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
