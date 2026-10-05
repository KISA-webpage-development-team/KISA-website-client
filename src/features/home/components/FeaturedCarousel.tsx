"use client";

import { useEffect, useRef, useState } from "react";
import { Button, IconButton } from "@umichkisa-ds/web";

import { sanitizeCarouselHtml } from "@/lib/dompurify/sanitizeCarouselHtml";
import type { CarouselItem } from "@/types/carousel";

const ROTATION_MS = 10_000;

type FeaturedCarouselProps = {
  items: CarouselItem[];
  /**
   * Admin preview mode. Starts paused with previous / next / play controls,
   * and clicking the image does not open its link.
   */
  adminMode?: boolean;
};

/**
 * Hero featured carousel — one item visible at a time, image + Korean
 * title/description side-by-side on desktop, stacked on mobile. Auto-rotates
 * every 10s; pagination dots are clickable. Click on an item with a `link`
 * opens it in a new tab. Items come from the backend via the home page.
 *
 * No heading by design — this is the page's hero and visual anchor.
 *
 * The progress bar fills smoothly via a ref + style mutation (no per-frame
 * React render) and the active-index update is a single setState per cycle.
 * Crossfades use Tailwind opacity transitions, no animation library.
 *
 * The shown slide is tracked by item ID, so a reorder keeps the same item on
 * screen and restarts its cycle.
 *
 * `adminMode` turns it into the admin preview: starts paused, adds previous /
 * next / play-pause controls and a position counter, and no link opening.
 */
export default function FeaturedCarousel({
  items,
  adminMode = false,
}: FeaturedCarouselProps) {
  const [activeID, setActiveID] = useState<number | null>(
    items[0]?.carouselItemID ?? null,
  );
  const [isPlaying, setIsPlaying] = useState(!adminMode);
  const itemsRef = useRef(items);
  const activeRef = useRef(0);
  const startRef = useRef(0);
  const playingRef = useRef(isPlaying);
  const progressRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // The admin preview can lose the shown item (archive, remove); fall back to
  // the first one and follow it from then on.
  const activeIndex = items.findIndex(
    (item) => item.carouselItemID === activeID,
  );
  if (activeIndex === -1 && items.length > 0) {
    setActiveID(items[0].carouselItemID);
  }
  const active = activeIndex === -1 ? 0 : activeIndex;
  const orderKey = items.map((item) => item.carouselItemID).join(",");

  useEffect(() => {
    itemsRef.current = items;
    activeRef.current = active;
  }, [items, active]);

  // The admin preview hides its controls with a single item, so it holds still.
  const isRotating = isPlaying && (!adminMode || items.length > 1);

  useEffect(() => {
    playingRef.current = isRotating;
  }, [isRotating]);

  // A reorder restarts the shown item's cycle.
  useEffect(() => {
    startRef.current = performance.now();
  }, [orderKey]);

  useEffect(() => {
    if (items.length === 0) return undefined;
    let frame = 0;
    let lastFrame = performance.now();
    startRef.current = lastFrame;

    const tick = (now: number) => {
      // While paused, shift the cycle start forward so the bar holds still.
      if (!playingRef.current) startRef.current += now - lastFrame;
      lastFrame = now;
      const fraction = Math.min((now - startRef.current) / ROTATION_MS, 1);
      const fillPct = fraction * 100;
      const i = activeRef.current;
      const bar = progressRefs.current[i];
      if (bar) bar.style.width = `${fillPct}%`;

      if (fraction >= 1) {
        startRef.current = now;
        if (bar) bar.style.width = "0%";
        const next = itemsRef.current[(i + 1) % itemsRef.current.length];
        setActiveID(next.carouselItemID);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [items.length]);

  if (items.length === 0) return null;

  const activeItem = items[active] ?? items[0];
  const opensLink = !adminMode && activeItem.link !== null;

  const handleImageClick = () => {
    if (opensLink && activeItem.link) {
      window.open(activeItem.link, "_blank", "noopener,noreferrer");
    }
  };

  const select = (index: number) => {
    // Restart the cycle clock so the new active bar starts from zero.
    const wrapped = (index + items.length) % items.length;
    startRef.current = performance.now();
    setActiveID(items[wrapped].carouselItemID);
  };

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-surface-subtle lg:basis-[40%]">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={`carousel-image-${item.carouselItemID}`}
              type="button"
              onClick={handleImageClick}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={
                opensLink ? `${item.title} (새 창에서 열기)` : item.title
              }
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-out ${
                isActive
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              } ${opensLink ? "cursor-pointer" : "cursor-default"}`}
            >
              {/* Cloudinary already serves a sized, versioned image; use plain <img>. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
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
        <div className="relative min-h-[10rem] overflow-hidden md:min-h-[13rem]">
          {items.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={`carousel-text-${item.carouselItemID}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 flex flex-col gap-3 transition-opacity duration-500 ease-out ${
                  isActive
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <h2 className="type-h2 text-foreground line-clamp-2">
                  {item.title}
                </h2>
                <div
                  className="type-body text-muted-foreground line-clamp-3 md:line-clamp-5"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeCarouselHtml(item.description),
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Progress / pagination, plus admin controls */}
        <div className="flex items-center gap-3">
          <div
            className="flex flex-1 flex-row gap-2"
            role="tablist"
            aria-label="추천 게시물 선택"
          >
            {items.map((item, index) => (
              <button
                key={`carousel-progress-${item.carouselItemID}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-label={`${item.title} 보기`}
                className="flex-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                onClick={() => select(index)}
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
                    // The active bar's width is driven by the animation frame.
                    style={
                      index === active
                        ? undefined
                        : { width: index < active ? "100%" : "0%" }
                    }
                  />
                </span>
              </button>
            ))}
          </div>
          {adminMode && items.length > 1 ? (
            <div className="flex shrink-0 items-center gap-1">
              <IconButton
                icon="chevron-left"
                size="sm"
                variant="tertiary"
                aria-label="이전 배너"
                onClick={() => select(active - 1)}
              />
              <span className="type-body-sm tabular-nums text-muted-foreground">
                {`${active + 1} / ${items.length}`}
              </span>
              <IconButton
                icon="chevron-right"
                size="sm"
                variant="tertiary"
                aria-label="다음 배너"
                onClick={() => select(active + 1)}
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsPlaying((playing) => !playing)}
              >
                {isPlaying ? "일시정지" : "재생"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
