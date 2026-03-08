# KISA Design System — Architecture Design

**Date:** 2026-03-08
**Author:** Jioh In
**Status:** Draft

---

## 1. Motivation

- **Primary:** Unify the two competing component systems (`CustomButton` vs shadcn) and clean up deprecated component dependencies
- **Secondary:** Build a reusable, well-structured design system as a learning exercise and future reference
- **Near-term:** Enable new team members (next semester) to build features with consistent UI without guessing

---

## 2. Package Architecture

The design system lives in a **separate repository** from the client.

```
KISA-webpage-development-team/
├── KISA-website/          # existing client repo
└── umichkisa-ds/          # new design system repo
```

The client references the DS package via a GitHub tag pin — no npm publish required:

```json
"@umichkisa-ds/web": "github:KISA-webpage-development-team/umichkisa-ds#v1.0.0"
```

New members only clone `KISA-website`. They never interact with the DS repo directly.

---

## 3. Design Token Architecture

Tokens follow a three-tier model:

- **Tier 1 — Primitives:** Raw values (brand colors, gray scale). Never used directly in components.
- **Tier 2 — Semantic tokens:** Named by role (`--color-brand-primary`, `--color-text-muted`). These are what components reference.
- **Tier 3 — Component tokens:** Optional per-component overrides (`--button-primary-bg`).

Tokens are defined as **CSS custom properties**, bundled into the package's compiled CSS output. The client imports one CSS file in the root layout — no token configuration required on the consumer side.

Tailwind config in the DS package maps semantic token variables to Tailwind utility classes.

---

## 4. Component Inventory (v1)

Only components that are genuinely shared across features belong in the DS. Feature-specific components (e.g. Pocha icons) stay in the client.

| Category | Components |
|---|---|
| Primitives | `Button`, `LinkButton`, `IconButton` |
| Form | `Input`, `Label`, `FormItem` |
| Feedback | `LoadingSpinner`, `NotFound`, `NotLogin`, `NotAuthorized`, `UnexpectedError` |
| Layout | `HorizontalDivider`, `VerticalDivider` |
| Display | `ToggleBar` |
| Icons | All currently shared icons (non-feature-specific) |
| Overlays | `Dialog`, `Dropdown`, `Popover` — thin wrappers around shadcn primitives |

shadcn is used **only** for complex interactive primitives where accessibility is hard to implement correctly from scratch. Simple components are built on top of KISA tokens directly.

---

## 5. DS Package Structure

```
umichkisa-ds/
├── src/
│   ├── tokens/          # CSS variable definitions
│   ├── components/      # all components
│   └── index.ts         # single export entry point
├── dist/                # compiled output (committed to git for tag-based install)
├── package.json
└── tsconfig.json
```

Build toolchain: **tsup** — outputs ESM + CJS + type declarations + bundled CSS.

---

## 6. Client Consumption

```ts
// root layout — once
import "@umichkisa-ds/web/dist/styles.css"

// anywhere in the app
import { Button, Input, HorizontalDivider } from "@umichkisa-ds/web"
```

---

## 7. Release Workflow

```bash
# in umichkisa-ds
npm run build
git add dist/
git tag v1.x.x
git push && git push --tags

# in client — bump the tag
"@umichkisa-ds/web": "github:KISA-webpage-development-team/umichkisa-ds#v1.x.x"
npm install
```

---

## 8. Migration Plan (client-side)

Once the DS package is stable:

1. Remove `src/components/ui/button/`, `form/`, `divider/`, `icon/`, `toggle/`, `feedback/` — replaced by DS imports
2. Remove `src/components/ui/shadcn/` — overlays moved into DS
3. Delete `src/deprecated-components/` — resolve all remaining usages first
4. Keep `src/components/layout/` (Header, Footer) in the client — these are app-specific, not design system concerns

---

## 9. What Is Not in Scope (v1)

- Dark mode / theming
- npm registry publish
- Storybook / component documentation site (planned for v2)
- Animation tokens
