# Pocha manage page: cherry blossom header

This document records the implementation that adds a falling cherry-blossom petal animation behind the **포차 관리** title on the admin manage-pocha route.

## Summary

The production app (`KISA-website-client`) owns its own copy of the animation component (not an import from `Mobileorderinginterfacedesign`). The manage page header was extracted into a dedicated client component so layout, session UI, and the decorative layer stay in one place.

## Source

The visual and behavior are based on `Mobileorderinginterfacedesign/src/app/components/CherryBlossomPetals.tsx` and its usage in `Mobileorderinginterfacedesign/src/app/App.tsx` (header: relative container, petals first, title/actions with higher z-index). The website implementation intentionally does **not** wire `scrollOpacity` to scroll on this page; `scrollOpacity` is fixed at `1`.

## Files added

| File | Purpose |
|------|---------|
| `src/features/pocha/components/manage/CherryBlossomPetals.tsx` | Client-only component: `requestAnimationFrame` loop, SVG petals, `prefers-reduced-motion: reduce` support, `pointer-events-none` overlay. |
| `src/features/pocha/components/manage/PochaManagePageHeader.tsx` | Client header: `relative` + `overflow-hidden` wrapper, `CherryBlossomPetals`, **포차 관리** `h1`, `UserInfo`, `LoginButton` (same props as before refactor). |

## Files modified

| File | Change |
|------|--------|
| `src/app/pocha/manage/page.tsx` | Replaced inline header markup with `<PochaManagePageHeader />`. Removed direct imports of `useSession`, `UserSession`, `LoginButton`, `UserInfo`, and `sejongHospitalBold` from this file (they are used inside the header component). |

## Runtime behavior

- **Petal count:** `petalCount={4}` (lighter than the prototype’s default of 6).
- **Opacity:** `scrollOpacity={1}` (no scroll-driven fade on manage).
- **Stacking:** Title and auth controls use `relative z-10` so they sit above the petal layer; petals use `absolute inset-0` inside the header wrapper.
- **Reduced motion:** If the user prefers reduced motion, `CherryBlossomPetals` renders nothing after its initial checks (same idea as the prototype).
- **Clicks:** The petal layer is `pointer-events-none`; buttons and links behave as before.

## TypeScript / API notes

- `CherryBlossomPetals` uses `useRef<number | undefined>(undefined)` for the animation frame id to satisfy strict typing in the Next app.

## Design repo relationship

`Mobileorderinginterfacedesign` was **not** changed as part of this work. If both copies should stay in sync long term, update either the design prototype or this file when petal shapes or animation logic changes, or later extract a shared package if the monorepo gains one.

## Optional follow-ups (not implemented)

- Environment kill switch (for example `NEXT_PUBLIC_POCHA_MANAGE_PETALS=0`) to disable petals without a code change.
- `next/dynamic` with `ssr: false` for `CherryBlossomPetals` if you want the shell to paint before the animation hydrates.
- Sync first paint with `prefers-reduced-motion` (e.g. `useSyncExternalStore`) to avoid any brief mismatch before `useEffect` runs.

## Verification

Manually verify on `/pocha/manage` (or your manage route): petals visible behind the title, login/user controls work, and with “reduce motion” enabled in the OS the animation is suppressed.
