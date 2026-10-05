import { useEffect, useRef, useState } from "react";
import { Container } from "@umichkisa-ds/web";

import FeaturedCarousel from "@/features/home/components/FeaturedCarousel";
import type { CarouselItem } from "@/types/carousel";

type StageLayout = { width: number; scale: number; height: number };

/**
 * The home carousel rendering one draft item. The slide is laid out at the
 * home page's content width (measured from a hidden `Container size="xl"`,
 * the home page shell) and scaled down to fit, so the title and description
 * wrap and clip exactly as visitors see them at this viewport.
 */
export default function CarouselSlidePreview({ item }: { item: CarouselItem }) {
  const probeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<StageLayout | null>(null);

  useEffect(() => {
    const probe = probeRef.current;
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!probe || !frame || !stage) return undefined;

    const measure = () => {
      const width = probe.clientWidth;
      if (width === 0) return;
      const scale = Math.min(frame.clientWidth / width, 1);
      setLayout({ width, scale, height: stage.offsetHeight * scale });
    };

    const observer = new ResizeObserver(measure);
    [probe, frame, stage].forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={frameRef}
        className="w-full overflow-hidden"
        style={layout ? { height: layout.height } : undefined}
      >
        <div
          ref={stageRef}
          className="origin-top-left"
          style={
            layout
              ? { width: layout.width, transform: `scale(${layout.scale})` }
              : undefined
          }
        >
          <FeaturedCarousel items={[item]} />
        </div>
      </div>

      {/* Home page content width at this viewport. */}
      <div
        aria-hidden
        className="pointer-events-none invisible fixed inset-x-0 top-0 h-0 overflow-hidden"
      >
        <Container size="xl">
          <div ref={probeRef} />
        </Container>
      </div>
    </>
  );
}
