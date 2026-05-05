"use client";

/**
 * BackToHubFAB — KISA admin "back to hub" floating action button.
 *
 * The single navigation affordance back to `/admin` from any admin sub-page.
 * The hub-and-spoke admin shell rejects sidebars and top-bars (Phase 5 audit
 * Q3, Q6); this FAB is the only way to close the navigation loop.
 *
 * Visibility contract:
 *   The FAB only renders when the `kisa.admin.fromHub` sessionStorage flag
 *   is "1". The flag is owned by `lib/admin/fromHubFlag.ts` and written by
 *   two callers: `/admin/layout.tsx` on hub mount, and `AdminHubCards`
 *   preemptively on tool-card click. FAB-click is pure navigation — it does
 *   NOT clear the flag. The flag clears only on tab close (sessionStorage
 *   default behavior).
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
 * SessionStorage keys:
 *   - `kisa.admin.fromHub`   — owned by `lib/admin/fromHubFlag.ts`; read here
 *                              via `readFromHubFlag()` to gate visibility.
 *   - `kisa.admin.fab.shrunk` — owned by this component; set/cleared when
 *                              the user shrinks the FAB to an edge-tab (or
 *                              restores it). Persists the shrunk state for
 *                              the rest of the session.
 *
 * SSR / hydration:
 *   sessionStorage is read inside useEffect; first render returns null to
 *   avoid hydration mismatch.
 */

import { Ref, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@umichkisa-ds/web";
import { readFromHubFlag } from "@/lib/admin/fromHubFlag";

const SHRUNK_KEY = "kisa.admin.fab.shrunk";

const EDGE_TAB_CLASS = [
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
].join(" ");

const PILL_SHELL_CLASS = [
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
].join(" ");

const LINK_BASE_CLASS = [
  "flex items-center gap-2",
  // Touch target ≥ 44px and pill shape.
  "h-11 rounded-full",
  "type-label",
  "transition-[padding,background-color,color] duration-200 ease-out",
  "motion-reduce:transition-none",
  "hover:bg-brand-accent hover:text-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
].join(" ");

// Padding shifts when collapsed so the icon centers in a circle.
const LINK_COLLAPSED_PADDING_CLASS =
  "px-3 group-hover:pl-4 group-hover:pr-4 group-focus-within:pl-4 group-focus-within:pr-4";
const LINK_EXPANDED_PADDING_CLASS = "pl-4 pr-3";

// Hidden at rest; revealed when group is hovered or any descendant has focus.
const LABEL_COLLAPSED_CLASS =
  "max-w-0 overflow-hidden opacity-0 group-hover:max-w-[12rem] group-hover:opacity-100 group-focus-within:max-w-[12rem] group-focus-within:opacity-100 transition-[max-width,opacity] duration-200 ease-out motion-reduce:transition-none";

const SHRINK_BUTTON_CLASS = [
  "ml-1 mr-2 flex h-7 w-7 items-center justify-center rounded-full",
  "text-brand-foreground/80",
  "transition-colors duration-200 ease-out motion-reduce:transition-none",
  "hover:bg-brand-primary-hover hover:text-brand-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
].join(" ");

function EdgeTab({
  onRestore,
  buttonRef,
}: {
  onRestore: () => void;
  buttonRef: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onRestore}
      aria-label="관리자 홈 바로가기 다시 보이기"
      className={EDGE_TAB_CLASS}
    >
      <Icon name="chevron-right" size="sm" />
    </button>
  );
}

function HubPill({
  defaultCollapsed,
  onShrink,
  linkRef,
}: {
  defaultCollapsed: boolean;
  onShrink: () => void;
  linkRef: Ref<HTMLAnchorElement>;
}) {
  const linkPaddingClass = defaultCollapsed
    ? LINK_COLLAPSED_PADDING_CLASS
    : LINK_EXPANDED_PADDING_CLASS;
  return (
    // Expanded/collapsed pill. The collapsed variant hides the label at rest
    // and reveals it on hover/focus-within via group-hover / group-focus-within.
    // The Link is the nav target; the shrink button is a SIBLING (not nested)
    // so its activation never triggers navigation.
    <div className={PILL_SHELL_CLASS}>
      <Link
        ref={linkRef}
        href="/admin"
        aria-label="관리자 홈으로 돌아가기"
        className={`${LINK_BASE_CLASS} ${linkPaddingClass}`}
      >
        <Icon name="arrow-left" size="sm" className="flex-shrink-0" />
        <span
          className={`whitespace-nowrap ${
            defaultCollapsed ? LABEL_COLLAPSED_CLASS : ""
          }`}
        >
          관리자 홈
        </span>
      </Link>

      {/* Shrink affordance — sibling button, NOT nested in the Link. */}
      <button
        type="button"
        onClick={onShrink}
        aria-label="관리자 홈 바로가기 숨기기"
        className={SHRINK_BUTTON_CLASS}
      >
        <Icon name="x" size="xs" />
      </button>
    </div>
  );
}

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
    const isShrunk = sessionStorage.getItem(SHRUNK_KEY) === "1";
    setFromHub(readFromHubFlag());
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

  return shrunk ? (
    <EdgeTab onRestore={handleRestore} buttonRef={edgeTabRef} />
  ) : (
    <HubPill
      defaultCollapsed={defaultCollapsed}
      onShrink={handleShrink}
      linkRef={linkRef}
    />
  );
}
