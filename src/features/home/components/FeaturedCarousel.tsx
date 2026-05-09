"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { defaultImageURL } from "@/features/pocha/utils/getImagePath";
import {
  getInstagramItems,
  mergeCarouselData,
  staticHomeCarousel,
  type CarouselItem,
} from "@/features/home/data/homePageData";

const ROTATION_MS = 10_000;

function buildCarouselImageUrl(item: CarouselItem): string {
  if (item.id.startsWith("llm-collected")) {
    return item.imageUrl ?? defaultImageURL;
  }
  return `/carousel/${item.id}.png`;
}

/**
 * Hero featured carousel — one item visible at a time, image + Korean
 * title/description side-by-side on desktop, stacked on mobile. Auto-rotates
 * every 10s; pagination dots are clickable. Click on an item with a `url`
 * opens it in a new tab.
 *
 * No heading by design — this is the page's hero and visual anchor.
 *
 * The progress bar fills smoothly via a ref + style mutation (no per-frame
 * React render) and the active-index update is a single setState per cycle.
 * Crossfades use Tailwind opacity transitions, no animation library.
 */
export default function FeaturedCarousel() {
  const items = useMemo<CarouselItem[]>(
    () => mergeCarouselData(getInstagramItems(), staticHomeCarousel),
    [],
  );
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const startRef = useRef(0);
  const progressRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    if (items.length === 0) return undefined;
    let frame = 0;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const fraction = Math.min((now - startRef.current) / ROTATION_MS, 1);
      const fillPct = fraction * 100;
      const i = activeRef.current;
      const bar = progressRefs.current[i];
      if (bar) bar.style.width = `${fillPct}%`;

      if (fraction >= 1) {
        startRef.current = now;
        if (bar) bar.style.width = "0%";
        setActive((prev) => (prev + 1) % items.length);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [items.length]);

  if (items.length === 0) return null;

  const activeItem = items[active];

  const handleImageClick = () => {
    if (activeItem.url) {
      window.open(activeItem.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDotClick = (index: number) => {
    // Reset all bar widths and the cycle clock so the new active bar starts
    // from zero immediately.
    progressRefs.current.forEach((bar) => {
      if (bar) bar.style.width = "0%";
    });
    startRef.current = performance.now();
    setActive(index);
  };

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-surface-subtle lg:basis-[40%]">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={`carousel-image-${item.id}`}
              type="button"
              onClick={handleImageClick}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={
                activeItem.url ? `${item.title} (새 창에서 열기)` : item.title
              }
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-out ${
                isActive
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              } ${activeItem.url ? "cursor-pointer" : "cursor-default"}`}
            >
              {/* External LLM-generated images are dynamic; use plain <img>. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={buildCarouselImageUrl(item)}
                alt={item.title}
                loading={isActive ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Title + description + progress dots */}
      <div className="flex flex-1 flex-col gap-6">
        <div className="relative min-h-[10rem] md:min-h-[12rem]">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={`carousel-text-${item.id}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex flex-col gap-3 transition-opacity duration-500 ease-out ${
                  isActive
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <h2 className="type-h2 text-foreground">{item.title}</h2>
                <div className="type-body text-muted-foreground line-clamp-5">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress / pagination */}
        <div
          className="flex flex-row gap-2"
          role="tablist"
          aria-label="추천 게시물 선택"
        >
          {items.map((item, index) => (
            <button
              key={`carousel-progress-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`${item.title} 보기`}
              className="flex-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              onClick={() => handleDotClick(index)}
            >
              <span
                className="relative block h-1 w-full overflow-hidden rounded-full bg-surface-subtle"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  ref={(el) => {
                    progressRefs.current[index] = el;
                  }}
                  className="absolute inset-y-0 left-0 bg-brand-primary"
                  style={{
                    width: index < active ? "100%" : "0%",
                  }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
