"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

const CHERRY_BLOSSOM_COLORS = {
  petalPink: "#F6C6D1",
  branchBrown: "#8B6F47",
  blossomCenter: "#FFB347",
} as const;

interface CherryBlossomBranchProps {
  triggerSway: number;
}

const branches = [
  {
    id: 1,
    left: "-70px",
    top: "-50px",
    rotation: 20,
    animationName: "windSway",
    duration: "4s",
    delay: "0s",
    flip: false,
  },
  {
    id: 2,
    left: "-30px",
    top: "-45px",
    rotation: 270,
    animationName: "windSway",
    duration: "4s",
    delay: "0s",
    flip: false,
  },
  {
    id: 3,
    left: "calc(100% - 135px)",
    top: "-55px",
    rotation: 50,
    animationName: "windSway",
    duration: "4s",
    delay: "0s",
    flip: true,
  },
];

export function CherryBlossomBranch({ triggerSway }: CherryBlossomBranchProps) {
  const [isSwaying, setIsSwaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const playSway = useCallback(() => {
    setIsSwaying(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsSwaying(false), 1000);
  }, []);

  useEffect(() => {
    if (triggerSway > 0) playSway();
  }, [triggerSway, playSway]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <>
      {branches.map((branch) => (
        // Outer div: continuous idle wind sway
        <div
          key={branch.id}
          style={{
            position: 'absolute',
            top: branch.top,
            left: branch.left,
            zIndex: 20,
            transformOrigin: '75px 180px',
            animation: `${branch.animationName} ${branch.duration} ease-in-out ${branch.delay} infinite`,
          }}
        >
          {/* Inner div: one-shot sway on cart click, composes on top of windSway */}
          <div
            style={{
              transformOrigin: '75px 180px',
              animation: isSwaying ? 'sway 1s ease-in-out' : 'none',
            }}
          >
            <svg
              width="150"
              height="180"
              viewBox="0 0 150 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={playSway}
              style={{
                cursor: 'pointer',
                transform: `scaleY(-1) rotate(${branch.rotation}deg)${branch.flip ? ' scaleX(-1)' : ''}`,
              }}
            >
              {/* Main branch */}
              <path
                d="M 30 30 Q 35 55, 42 80 Q 48 105, 54 130 Q 58 155, 62 175"
                stroke={CHERRY_BLOSSOM_COLORS.branchBrown}
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Side branches */}
              <path
                d="M 42 80 Q 55 87, 68 92"
                stroke={CHERRY_BLOSSOM_COLORS.branchBrown}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 48 105 Q 60 110, 72 113"
                stroke={CHERRY_BLOSSOM_COLORS.branchBrown}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 54 130 Q 65 135, 78 140"
                stroke={CHERRY_BLOSSOM_COLORS.branchBrown}
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Blossom 1 */}
              <g transform="translate(66, 90)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-7"
                    rx="5"
                    ry="7"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>

              {/* Blossom 2 */}
              <g transform="translate(70, 111)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-6"
                    rx="4.5"
                    ry="6.5"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>

              {/* Blossom 3 */}
              <g transform="translate(76, 138)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-7"
                    rx="5"
                    ry="7"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="2.5" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>

              {/* Blossom 4 - smaller bud */}
              <g transform="translate(36, 60)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-5"
                    rx="3.5"
                    ry="5"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    opacity="0.8"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="1.8" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>

              {/* Blossom 5 - smaller bud */}
              <g transform="translate(50, 118)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-5"
                    rx="3.5"
                    ry="5"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    opacity="0.8"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="1.8" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>

              {/* Blossom 6 - small bud at top */}
              <g transform="translate(32, 42)">
                {[0, 72, 144, 216, 288].map((angle, i) => (
                  <ellipse
                    key={i}
                    cx="0"
                    cy="-4"
                    rx="3"
                    ry="4"
                    fill={CHERRY_BLOSSOM_COLORS.petalPink}
                    opacity="0.7"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="1.5" fill={CHERRY_BLOSSOM_COLORS.blossomCenter} />
              </g>
            </svg>
          </div>
        </div>
      ))}

    </>
  );
}
