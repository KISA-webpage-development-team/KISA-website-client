"use client";

import { useEffect, useRef, useState } from "react";

interface Petal {
  id: number;
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

const PetalShapes = [
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

export function CherryBlossomPetals({
  petalCount = 6,
  scrollOpacity = 1,
}: CherryBlossomPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
      if (e.matches && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const initialPetals: Petal[] = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      speed: 0.25 + Math.random() * 0.35,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
      size: 14 + Math.random() * 10,
      blur: Math.random() > 0.5 ? 0.5 : 0,
      opacity: 0.6 + Math.random() * 0.3,
      shapeIndex: Math.floor(Math.random() * PetalShapes.length),
    }));

    setPetals(initialPetals);
  }, [petalCount]);

  useEffect(() => {
    if (prefersReducedMotion.current || petals.length === 0) return;

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      setPetals((prevPetals) =>
        prevPetals.map((petal) => {
          const newY = petal.y + petal.speed * (deltaTime / 16);
          const newWobble = petal.wobble + petal.wobbleSpeed;
          const wobbleOffset = Math.sin(newWobble) * 2;
          const newRotation = petal.rotation + 0.5;

          if (newY > 120) {
            return {
              ...petal,
              x: Math.random() * 100,
              y: -10,
              rotation: Math.random() * 360,
              wobble: Math.random() * Math.PI * 2,
              shapeIndex: Math.floor(Math.random() * PetalShapes.length),
            };
          }

          return {
            ...petal,
            y: newY,
            wobble: newWobble,
            rotation: newRotation,
            x: petal.x + wobbleOffset * 0.05,
          };
        })
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [petals.length]);

  if (prefersReducedMotion.current) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: scrollOpacity }}
      aria-hidden="true"
    >
      {petals.map((petal) => {
        const shape = PetalShapes[petal.shapeIndex];

        if (!shape) return null;

        return (
          <div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              transform: `rotate(${petal.rotation}deg)`,
              opacity: petal.opacity * scrollOpacity,
              filter: petal.blur > 0 ? `blur(${petal.blur}px)` : "none",
              willChange: "transform, top, left",
            }}
          >
            <svg
              width={petal.size}
              height={petal.size}
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
