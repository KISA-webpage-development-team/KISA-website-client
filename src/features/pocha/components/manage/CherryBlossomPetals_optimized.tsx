"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  size: number;
  blur: number;
  opacity: number;
  shapeIndex: number;
}

interface CherryBlossomPetalsProps {
  petalCount?: number;
  scrollOpacity?: number;
}

const PETAL_SHAPES = [
  {
    path: "M5 2C3 4 2 8 3 12C4 16 8 18 10 18C12 18 14 16 14 14C14 10 12 6 10 4C8 2 6 1 5 2Z",
    viewBox: "0 0 20 20",
  },
  {
    path: "M10 2C8 3 6 6 6 9C6 11 7 12 9 12C11 12 12 11 12 9C12 6 11 3 10 2Z",
    viewBox: "0 0 18 14",
  },
  {
    path: "M12 2C10 2 8 4 8 6C8 8 10 10 12 12C14 10 16 8 16 6C16 4 14 2 12 2Z M12 2C12 2 10 3 10 6C10 8 11 10 12 12C12 12 13 10 14 6C14 3 12 2 12 2Z",
    viewBox: "0 0 24 14",
  },
  {
    path: "M8 3C6 4 4 7 5 11C6 14 9 15 11 14C13 13 14 11 13 9C12 6 10 4 8 3Z",
    viewBox: "0 0 18 18",
  },
  {
    path: "M7 3C6 4 5 6 6 8C7 10 9 10 10 9C11 8 11 6 10 5C9 4 8 3 7 3Z",
    viewBox: "0 0 16 12",
  },
  {
    path: "M6 2C5 3 4 6 4 9C4 12 5 14 7 14C9 14 10 12 10 9C10 6 9 3 8 2C7 1.5 6.5 1.5 6 2Z",
    viewBox: "0 0 14 16",
  },
];

const SHAPE_COUNT = PETAL_SHAPES.length;

function makePetal(): Petal {
  return {
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    rotation: Math.random() * 360,
    speed: 0.15 + Math.random() * 0.25,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.02,
    size: 30 + Math.random() * 8,
    blur: Math.random() > 0.5 ? 0.5 : 0,
    opacity: 0.6 + Math.random() * 0.3,
    shapeIndex: Math.floor(Math.random() * SHAPE_COUNT),
  };
}

export function CherryBlossomPetals({
  petalCount = 10,
  scrollOpacity = 1,
}: CherryBlossomPetalsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const reducedMotion = useRef(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
      if (e.matches && rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Initialize petal data
  useEffect(() => {
    petalsRef.current = Array.from({ length: petalCount }, () => makePetal());
  }, [petalCount]);

  // Animation loop — direct DOM mutation, zero React re-renders
  useEffect(() => {
    if (reducedMotion.current) return;

    const container = containerRef.current;
    if (!container) return;

    const nodes = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-petal]")
    );

    let lastTime = performance.now();

    const animate = (now: number) => {
      const cw = container.offsetWidth;
      const ch = container.offsetHeight;
      const dt = Math.min(now - lastTime, 32);
      lastTime = now;

      petalsRef.current.forEach((petal, i) => {
        petal.y += petal.speed * (dt / 16);
        petal.wobble += petal.wobbleSpeed;
        petal.x += Math.sin(petal.wobble) * 0.1;
        petal.rotation += 0.5;

        if (petal.y > 120) {
          petal.x = Math.random() * 100;
          petal.y = -10;
          petal.rotation = Math.random() * 360;
          petal.wobble = Math.random() * Math.PI * 2;
          petal.shapeIndex = Math.floor(Math.random() * SHAPE_COUNT);
        }

        const node = nodes[i];
        if (node) {
          node.style.transform = `translate(${(petal.x / 100) * cw}px, ${(petal.y / 100) * ch}px) rotate(${petal.rotation}deg)`;
          node.style.opacity = String(petal.opacity * scrollOpacity);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollOpacity]);

  if (reducedMotion.current) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: petalCount }, (_, i) => {
        const shape = PETAL_SHAPES[i % SHAPE_COUNT]!;
        return (
          <div
            key={i}
            data-petal
            className="absolute top-0 left-0"
            style={{ willChange: "transform, opacity" }}
          >
            <svg
              width={16}
              height={16}
              viewBox={shape.viewBox}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={shape.path} fill="#F6C6D1" opacity="0.95" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
