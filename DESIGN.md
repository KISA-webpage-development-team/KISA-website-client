---
# @generated — produced by packages/web/scripts/compile-design.ts.
# Do NOT edit by hand. Edits are overwritten on the next prebuild.
# Source CSS: packages/web/src/{styles,tokens}/.
# Prose templates: packages/web/scripts/templates/.
# Spec: docs/refactor/A4-design-compile.md.
version: alpha
name: KISA Design System
description: University of Michigan KISA — navy + maize Michigan brand, Korean-first typography.
colors:
  brand-primary: "#00152c"
  brand-primary-mid: "#00365c"
  brand-primary-hover: "#003152"
  brand-primary-pressed: "#000c1e"
  brand-accent: "#f4c000"
  brand-accent-subtle: "#fff1c4"
  brand-accent-hover: "#ddaa00"
  brand-accent-pressed: "#c99600"
  brand-foreground: "#f4c000"
  focus-ring: "#f4c000"
  surface: "#ffffff"
  surface-muted: "#f8f8fa"
  surface-subtle: "#f1f2f4"
  border: "#e3e4e7"
  border-strong: "#d2d4d8"
  foreground: "#0c0f17"
  muted-foreground: "#7d8088"
  disabled-foreground: "#a4a8ae"
  link: "#00365c"
  error: "#df2225"
  error-hover: "#a90000"
  error-pressed: "#970000"
  error-subtle: "#fff0ee"
  error-foreground: "#ffffff"
  success: "#37a643"
  success-subtle: "#edf9ed"
  warning: "#e78b30"
  warning-subtle: "#fff2e8"
  info: "#00365c"
  info-subtle: "#e1edf7"
  overlay: "#000000"
typography:
  display: { fontFamily: "SejongHospital Bold", fontSize: 48px, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.025em }
  h1: { fontFamily: "SejongHospital Bold", fontSize: 36px, fontWeight: 400, lineHeight: 1.25, letterSpacing: -0.025em }
  h2: { fontFamily: "Pretendard Variable", fontSize: 24px, fontWeight: 600, lineHeight: 1.375 }
  h3: { fontFamily: "Pretendard Variable", fontSize: 20px, fontWeight: 600, lineHeight: 1.375 }
  h4: { fontFamily: "Pretendard Variable", fontSize: 16px, fontWeight: 600, lineHeight: 1.375 }
  body: { fontFamily: "Pretendard Variable", fontSize: 16px, fontWeight: 400, lineHeight: 1.625 }
  body-sm: { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
  label: { fontFamily: "Pretendard Variable", fontSize: 14px, fontWeight: 500, lineHeight: 1.5 }
  caption: { fontFamily: "Pretendard Variable", fontSize: 12px, fontWeight: 400, lineHeight: 1.5 }
  code: { fontFamily: "Geist Mono", fontSize: 14px, fontWeight: 400, lineHeight: 1.5 }
spacing:
  element: 8px
  component: 16px
  section: 24px
  icon-xs: 12px
  icon-sm: 16px
  icon-md: 20px
  icon-lg: 24px
  icon-xl: 32px
rounded:
  md: 8px
  lg: 12px
  full: 9999px
---

## Overview

KISA is the University of Michigan Korean International Student
Association. The audience is a Korean-speaking student community
plus the broader UMich population, and the design system carries
two non-negotiable identity anchors:

- **Michigan brand colors** — navy `brand-primary` and maize
  `brand-accent`, used sparingly to mark hierarchy and primary action.
- **Korean-first typography** — `SejongHospital Bold` for hero and
  page-title copy, `Pretendard Variable` for everything below.

The visual feel is institutional, calm, and high-contrast. The
language is flat, not skeuomorphic — borders and tonal layers carry
depth, never shadows. Spacing is generous on the section axis and
tight on the element axis, so groups read as groups without
scrolling. Brand color is reserved for sparse placement (navbars,
hero, primary CTAs); the body of the page is dominated by neutrals
and the Korean-first type ramp.

This file is the Layer 1 visual contract. Component composition
rules live in `COMPONENT.md` (Layer 2); consumer write-time rules
live in `USAGE.md` (Layer 3).

Generated from `@umichkisa-ds/web@1.0.28`.

## Colors

The palette is anchored by the two Michigan brand colors and supported
by a high-contrast neutral scale plus a small set of semantic feedback
states. Accent placement is sparse — brand colors mark navbars, hero
sections, and primary CTAs, never mid-page card or content
backgrounds.

- **Brand Primary (#00274c):** Michigan navy. The dominant interactive
  and surface accent — primary buttons, top-of-page chrome, focus
  borders on form controls.
- **Brand Accent (#ffcb05):** Michigan maize. Reserved for sparse
  accent placement: focus rings, selected-item indicators, the maize
  text on navy backgrounds via `brand-foreground`. Never used as a
  link color (low contrast on white).
- **Brand Accent Subtle:** A lighter maize wash for hover and focus
  backgrounds on interactive list items.
- **Surface / Surface Muted / Surface Subtle:** Page and card
  backgrounds. Two-level depth: page + cards on `surface`, elevated
  inner regions on `surface-subtle`, deprioritized regions on
  `surface-muted`. Cards distinguish via `border`, not shadows.
- **Border / Border Strong:** The depth-carrying lines.
  `border-strong` reserved for hover/focus emphasis on neutral
  interactives.
- **Foreground / Muted Foreground / Disabled Foreground:** Text
  hierarchy. `foreground` is the default body color;
  `muted-foreground` is for genuinely secondary content (not the
  default — if it went to 40% opacity, the screen would still be
  usable); `disabled-foreground` is never used for content that needs
  to be read.
- **Link:** Mid-tone Michigan blue. The only correct color for
  hyperlink text. Underline on hover; no visited style.
- **Error / Success / Warning / Info:** Each ships with a paired
  `-subtle` background. `info` and `link` resolve to the same blue
  but are not interchangeable — `info` is for state indicators and
  alert borders, `link` is for clickable text only.
- **Overlay (#000000 at 40% opacity):** Scrim for Dialog and Drawer.
  The alpha channel is dropped from the YAML token (the spec accepts
  6-digit hex only); 40% opacity is applied at render time.

Reference semantic tokens (`brand-primary`, `surface`, `foreground`)
in component code — never primitive values or raw hex. The full
consumer rulebook lives in `USAGE.md`.

## Typography

A two-font strategy pairs **SejongHospital Bold** (Korean display
face) for hero/title hierarchy with **Pretendard Variable** for
everything below H1. A third family, **Geist Mono**, is reserved
strictly for code-display contexts.

- **Display (`type-display`):** SejongHospital Bold at the largest
  scale. Hero copy only — one per page maximum.
- **Headline 1 (`type-h1`):** SejongHospital Bold. App page titles.
  SejongHospital does not appear below H1; if `type-display` is
  already in use, prefer `type-h2` styling on a semantic `<h1>`.
- **Headline 2 / 3 / 4 (`type-h2` / `type-h3` / `type-h4`):**
  Pretendard at semibold (600). Section, subsection, and inline
  heading hierarchy.
- **Body / Body Small (`type-body` / `type-body-sm`):** Pretendard
  at regular (400). `type-body` for primary content;
  `type-body-sm` for dense or supporting content.
- **Label (`type-label`):** Pretendard at medium (500). Form labels
  and call-out captions where slightly heavier weight is appropriate.
- **Caption (`type-caption`):** Pretendard at regular (400), 12px
  floor. Helper text, error messages, image captions, and similar
  metadata.
- **Code (`typography.code`):** Geist Mono at body-small size.
  Inline code and code blocks only — never body or UI text.

The `fontSize` value listed in each `typography.*` entry is the
**`lg:` breakpoint** (largest variant). `type-display`, `type-h1`,
`type-h2`, `type-h3` scale down responsively at `default` and `md:`
breakpoints; `type-h4`, `type-body`, `type-body-sm`, `type-label`,
`type-caption`, and `typography.code` are single-value.

Always pair a `type-*` class with an explicit color token.
SejongHospital ships as a single-weight font face — its visual
boldness is baked into the file, so `fontWeight` on `type-display`
and `type-h1` is normalized to the CSS default (400). Never use
`!font-*` to override the weight of a `type-*` class.

## Layout

Three-breakpoint, three-tier system.

**Breakpoints.** `default` (mobile), `md:` (≥768px), `lg:` (≥1024px).
No `sm:`, `xl:`, or `2xl:`.

**Spacing tiers** (`spacing.element` / `spacing.component` /
`spacing.section`):

- `element` (`8px`) — label↔input, icon↔text, caption-below,
  heading↔subtitle.
- `component` (`16px`) — stacked fields, list items, stacked cards,
  nav items.
- `section` (`24px`) — gaps between major page sections (1.5×
  component).

Vertical spacing does not scale across breakpoints — responsiveness
is column reflow, not vertical breathing.

**Icon sizes** (`spacing.icon-{xs,sm,md,lg,xl}`) map to text context:
`xs`/caption, `sm`/caption, `md`/body (default), `md`–`lg`/subhead,
`lg`/heading, `xl`/hero. Pick via the `size` prop on `<Icon>`; never
override with `font-size` or arbitrary CSS.

The page shell (`Container`) combines max-width, all-sides responsive
padding, and centering: `mx-auto w-full max-w-screen-2xl p-4 md:p-6 lg:p-8`.
Never compose this manually.

## Elevation & Depth

Flat by default. The system has no shadow tokens.

Depth is carried by **borders** (`border` / `border-strong`) and
**tonal layering** (`surface` / `surface-muted` / `surface-subtle`).
Cards sit on `surface` with a `border` ring; elevated regions shift to
`surface-subtle`; deprioritized regions shift to `surface-muted`.
Two-level depth is the maximum.

Overlays (Dialog scrim, Drawer scrim) use `overlay` at 40% opacity —
the only place a transparent value appears in the system.

## Shapes

Three rounded radii, picked by surface size and shape:

- `rounded.md` (`8px`) — default. Buttons, inputs, cards, most
  interactive surfaces.
- `rounded.lg` (`12px`) — modals, drawers, larger surfaces where
  `md` looks pinched.
- `rounded.full` (`9999px`) — pills, avatars, circular badges.

Off-tier radii (`rounded-xl`, `rounded-2xl`) require explicit
DS-surface justification. Geometry stays minimal — no decorative
clipping, no asymmetric corners.

## Components

The Google Labs DESIGN.md `components:` block is intentionally
omitted — component composition belongs to Layer 2, not the visual
contract.

For per-component identity, sibling discrimination
(`pick_when` / `reject_when`), variants, notable props, intrinsic
behavior, compound parts, and component-scoped anti-patterns, see
`COMPONENT.md` at the repo root.

For cross-component invariants (e.g. icon-only button + tooltip
aria-label match), see the `cross_component_invariants` block in the
same file.

## Do's and Don'ts

A short surfacing list. The comprehensive consumer rulebook is
`USAGE.md` (Layer 3).

- Do reference semantic color tokens (`brand-primary`, `surface`,
  `foreground`) for every color decision; never use primitive values
  or raw hex.
- Do use `type-*` classes for every typographic decision and pair
  them with an explicit color token.
- Do pick spacing from the three named tiers (`element` / `component`
  / `section`) and radius from the three named tiers (`md` / `lg` /
  `full`).
- Do go through `<Icon name="...">` for every icon and pick `size`
  from the 5-step scale (`xs` / `sm` / `md` / `lg` / `xl`).
- Do use `<Container>` for page shells; never compose
  `mx-auto max-w-screen-2xl p-4 md:p-6 lg:p-8` manually.
- Don't reference `--primitive-*` tokens directly in component code.
- Don't override `type-*` weight with `!font-*`.
- Don't use Geist Mono for body or UI text — it is reserved for
  code-display contexts (inline code, code blocks).
- Don't implement dark mode (no `.dark`, no media queries, no dark
  layer).
- Don't use `--color-info` and `--color-link` interchangeably; they
  resolve to the same blue but mark distinct roles.
