"use client";

import {
  type FocusEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { sanitizeCarouselHtml } from "@/lib/dompurify/sanitizeCarouselHtml";
import type { CarouselItem } from "@/types/carousel";

const ROTATION_MS = 10_000;

type FeaturedCarouselAdminMode<T extends CarouselItem> = {
  /** Actions shown under the description of the slide on screen. */
  renderSlideActions: (item: T) => ReactNode;
};

type FeaturedCarouselProps<T extends CarouselItem> = {
  items: T[];
  /**
   * Admin preview mode. Rotation pauses while the pointer or focus is inside,
   * and clicking the image selects the slide instead of opening its link.
   */
  adminMode?: FeaturedCarouselAdminMode<T>;
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
 * `adminMode` turns it into the admin preview: per-slide actions, rotation
 * paused while the pointer or focus is inside, and no link opening.
 */
export default function FeaturedCarousel<T extends CarouselItem>({
  items,
  adminMode,
}: FeaturedCarouselProps<T>) {
  const [active, setActive] = useState(0);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isFocusInside, setIsFocusInside] = useState(false);
  const activeRef = useRef(0);
  const startRef = useRef(0);
  const pausedRef = useRef(false);
  const progressRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // The admin preview can lose items (archive, remove) while showing the last
  // slide; fall back to the first one.
  if (active >= items.length && active !== 0) {
    setActive(0);
  }

  const isAdminMode = adminMode !== undefined;
  const isPaused = isAdminMode && (isPointerInside || isFocusInside);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (items.length === 0) return undefined;
    let frame = 0;
    let lastFrame = performance.now();
    startRef.current = lastFrame;

    const tick = (now: number) => {
      // While paused, shift the cycle start forward so the bar holds still.
      if (pausedRef.current) startRef.current += now - lastFrame;
      lastFrame = now;
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

  const activeItem = items[active] ?? items[0];
  const opensLink = !isAdminMode && activeItem.link !== null;

  const handleImageClick = () => {
    // In admin mode a click only selects the slide (focus pauses rotation).
    if (opensLink && activeItem.link) {
      window.open(activeItem.link, "_blank", "noopener,noreferrer");
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

  const adminHandlers = isAdminMode
    ? {
        onMouseEnter: () => setIsPointerInside(true),
        onMouseLeave: () => setIsPointerInside(false),
        onFocus: () => setIsFocusInside(true),
        onBlur: (event: FocusEvent<HTMLDivElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFocusInside(false);
          }
        },
      }
    : {};

  return (
    <div
      className="flex w-full flex-col gap-6 lg:flex-row lg:items-center lg:gap-10"
      {...adminHandlers}
    >
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
        <div className="relative min-h-[10rem] overflow-hidden md:min-h-[12rem]">
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

        {adminMode ? (
          <div className="flex flex-wrap items-center gap-2">
            {adminMode.renderSlideActions(activeItem)}
          </div>
        ) : null}

        {/* Progress / pagination */}
        <div
          className="flex flex-row gap-2"
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
