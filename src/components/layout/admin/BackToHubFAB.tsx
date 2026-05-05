"use client";

/**
 * BackToHubFAB — KISA admin "back to hub" floating action button.
 *
 * The single navigation affordance back to `/admin` from any admin sub-page.
 * The hub-and-spoke admin shell rejects sidebars and top-bars (Phase 5 audit
 * Q3, Q6); this FAB is the only way to close the navigation loop.
 *
 * Visibility contract:
 *   The FAB only renders when sessionStorage["kisa.admin.fromHub"] === "1".
 *   That flag is set by `/admin/layout.tsx` on hub mount and persists for the
 *   session. FAB-click is pure navigation — it does NOT clear the flag. The
 *   flag clears only on tab close (sessionStorage default behavior).
 *
 * Dashboard-bulk-promote-collision contract:
 *   The dashboard route at `/admin/pocha/dashboard` ships a
 *   `sticky bottom-4` bulk-promote action bar. To avoid colliding with that
 *   bar AND honor the "no chrome during live ops" principle, the layout
 *   passes `defaultCollapsed={true}` for that route. Collapsed = icon-only
 *   resting state, expands on hover/focus. The FAB stays a dumb visual
 *   primitive — route-name conditionals live in the layout, never here.
 *
 * Tab-duplication corner case:
 *   sessionStorage is inherited when a tab is duplicated, so the FAB will
 *   render in a duplicated admin sub-page tab even though the user did not
 *   navigate from the hub *in that tab*. Accepted; do not over-engineer.
 *
 * SessionStorage keys owned by this component:
 *   - `kisa.admin.fromHub`   — set by /admin/layout.tsx on hub mount; read
 *                              here to gate visibility. Never written here.
 *   - `kisa.admin.fab.shrunk` — set/cleared here when the user shrinks the
 *                              FAB to an edge-tab (or restores it). Persists
 *                              the shrunk state for the rest of the session.
 *
 * SSR / hydration:
 *   sessionStorage is read inside useEffect; first render returns null to
 *   avoid hydration mismatch.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@umichkisa-ds/web";

const FROM_HUB_KEY = "kisa.admin.fromHub";
const SHRUNK_KEY = "kisa.admin.fab.shrunk";

export interface BackToHubFABProps {
  /**
   * Resting state for the pill on this route.
   * - `false` (default for most routes): pill renders expanded (icon + label).
   * - `true` (dashboard): pill renders icon-only at rest, expands on
   *   hover/focus. See dashboard-collision contract above.
   *
   * Ignored when the user has shrunk the FAB to an edge-tab — shrunk state
   * always wins until the user restores it.
   */
  defaultCollapsed: boolean;
}

export default function BackToHubFAB({ defaultCollapsed }: BackToHubFABProps) {
  // Pattern A SSR: hydrated=false on first render so we return null and avoid
  // hydration mismatch from sessionStorage reads.
  const [hydrated, setHydrated] = useState(false);
  const [fromHub, setFromHub] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const edgeTabRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const hub = sessionStorage.getItem(FROM_HUB_KEY) === "1";
    const isShrunk = sessionStorage.getItem(SHRUNK_KEY) === "1";
    setFromHub(hub);
    setShrunk(isShrunk);
    setHydrated(true);
  }, []);

  if (!hydrated || !fromHub) return null;

  const handleShrink = () => {
    sessionStorage.setItem(SHRUNK_KEY, "1");
    setShrunk(true);
    // Move focus to the edge-tab so keyboard users don't lose their place.
    requestAnimationFrame(() => edgeTabRef.current?.focus());
  };

  const handleRestore = () => {
    sessionStorage.removeItem(SHRUNK_KEY);
    setShrunk(false);
    // Move focus to the primary link inside the restored pill.
    requestAnimationFrame(() => linkRef.current?.focus());
  };

  if (shrunk) {
    return (
      <button
        ref={edgeTabRef}
        type="button"
        onClick={handleRestore}
        aria-label="관리자 홈 바로가기 다시 보이기"
        className={[
          // Position: stuck to the left edge, vertically centered-ish low.
          "fixed bottom-8 left-0 z-40",
          // Visual: thin sliver protruding from the edge.
          "flex h-10 w-5 items-center justify-center",
          "rounded-r-md bg-brand-primary text-brand-foreground",
          "border border-l-0 border-border-strong",
          // Motion: respect reduced-motion (instant under reduce).
          "transition-[transform,background-color] duration-200 ease-out",
          "motion-reduce:transition-none",
          "hover:translate-x-0.5 hover:bg-brand-accent hover:text-foreground",
          // Focus indicator (mandatory per WISDOM).
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2",
        ].join(" ")}
      >
        <Icon name="chevron-right" size="sm" />
      </button>
    );
  }

  // Expanded/collapsed pill. The collapsed variant hides the label at rest
  // and reveals it on hover/focus-within via group-hover / group-focus-within.
  // The Link is the nav target; the shrink button is a SIBLING (not nested)
  // so its activation never triggers navigation.
  return (
    <div
      className={[
        "group fixed bottom-4 left-4 z-40",
        "flex items-center",
        // Pill shell: navy background, maize-on-hover via children styles.
        "rounded-full bg-brand-primary text-brand-foreground",
        "shadow-md",
        // Smooth shape transitions when label collapses/expands.
        "transition-[padding,gap] duration-200 ease-out",
        "motion-reduce:transition-none",
        // Bottom offset respects future safe-area-inset wrappers.
        "[padding-bottom:env(safe-area-inset-bottom,0px)]",
      ].join(" ")}
    >
      <Link
        ref={linkRef}
        href="/admin"
        aria-label="관리자 홈으로 돌아가기"
        className={[
          "flex items-center gap-2",
          // Touch target ≥ 44px and pill shape.
          "h-11 rounded-full",
          // Padding shifts when collapsed so the icon centers in a circle.
          defaultCollapsed
            ? "px-3 group-hover:pl-4 group-hover:pr-4 group-focus-within:pl-4 group-focus-within:pr-4"
            : "pl-4 pr-3",
          "type-label",
          "transition-[padding,background-color,color] duration-200 ease-out",
          "motion-reduce:transition-none",
          "hover:bg-brand-accent hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        ].join(" ")}
      >
        <Icon name="arrow-left" size="sm" className="flex-shrink-0" />
        <span
          className={[
            "whitespace-nowrap",
            defaultCollapsed
              ? // Hidden at rest; revealed when group is hovered or any
                // descendant has focus.
                "max-w-0 overflow-hidden opacity-0 group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-within:max-w-[12rem] group-focus-within:opacity-100 transition-[max-width,opacity] duration-200 ease-out motion-reduce:transition-none"
              : "",
          ].join(" ")}
        >
          관리자 홈
        </span>
      </Link>

      {/* Shrink affordance — sibling button, NOT nested in the Link. */}
      <button
        type="button"
        onClick={handleShrink}
        aria-label="관리자 홈 바로가기 숨기기"
        className={[
          "ml-1 mr-2 flex h-7 w-7 items-center justify-center rounded-full",
          "text-brand-foreground/80",
          "transition-colors duration-200 ease-out motion-reduce:transition-none",
          "hover:bg-brand-primary-hover hover:text-brand-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        ].join(" ")}
      >
        <Icon name="x" size="xs" />
      </button>
    </div>
  );
}
