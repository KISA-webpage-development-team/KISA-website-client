/*
  FloatingCTA
  - Layout primitive for the pocha mobile floating action footer.
  - Fixed to the viewport bottom with safe-area padding.
  - Container is pointer-events-none; children opt back in (e.g. a Button
    with `pointer-events-auto`) so taps pass through the empty gutter.
  - Children stack via `flex flex-col gap-2` to support helper rows
    (inline error, terms checkbox) above the primary action.
  - Layout-only — no Button rendered here. Caller controls type/variant.
*/

import React from "react";

const FOOTER_PADDING_STYLE = {
  paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
};

interface FloatingCTAProps {
  children: React.ReactNode;
  className?: string;
}

export default function FloatingCTA({ children, className }: FloatingCTAProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 px-4 pt-3 pointer-events-none flex flex-col gap-2 ${className ?? ""}`}
      style={FOOTER_PADDING_STYLE}
    >
      {children}
    </div>
  );
}
