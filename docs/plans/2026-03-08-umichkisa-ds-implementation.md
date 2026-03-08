# KISA Design System (`umichkisa-ds`) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build `@umichkisa-ds/web` — a standalone npm package containing KISA's design tokens and component library, consumed by the `KISA-website/client` repo via GitHub tag reference.

**Architecture:** Separate git repo (`umichkisa-ds/`) built with Tailwind v4 CSS-first tokens, CVA-based component variants, and tsup for bundling. Ships pre-compiled JS + CSS so the client imports zero build tooling from the DS. Overlay primitives (Dialog, Dropdown, Popover) are thin wrappers around Radix UI for accessibility correctness.

**Tech Stack:** TypeScript, React 18, Tailwind CSS v4, CVA (`class-variance-authority`), tsup, Vitest + @testing-library/react, Radix UI (overlays only), react-icons

---

## Before You Start

This plan creates a **brand new repository** called `umichkisa-ds/` that lives **alongside** (not inside) the client repo:

```
KISA-webpage-development-team/
├── KISA-website/          ← existing client repo
└── umichkisa-ds/          ← you are creating this
```

Reference the client's existing components at `../KISA-website/client/src/components/ui/` when you need to understand current props, styles, or behavior before migrating them.

The plan below assumes your working directory is `umichkisa-ds/` unless stated otherwise.

---

## Phase 1: Repo & Tooling Setup

### Task 1: Initialize the repo and package

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `CLAUDE.md`

**Step 1: Create the directory and init git**

```bash
mkdir umichkisa-ds && cd umichkisa-ds
git init
```

**Step 2: Create `package.json`**

```json
{
  "name": "@umichkisa-ds/web",
  "version": "0.1.0",
  "description": "KISA Design System — tokens and components for umichkisa.com",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./dist/styles.css": "./dist/styles.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-popover": "^1.1.4",
    "react-icons": "^5.4.0"
  },
  "devDependencies": {
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4.0.0",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

**Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Step 4: Create `.gitignore`**

```
node_modules/
*.log
.DS_Store
```

Note: `dist/` is intentionally NOT gitignored — we commit it for GitHub tag-based installs.

**Step 5: Create `CLAUDE.md`**

```markdown
# umichkisa-ds — KISA Design System

Standalone component and token library for `umichkisa.com`.

## Reference

The consuming client repo is at `../KISA-website/client/`.
When building or migrating components, read existing implementations at:
`../KISA-website/client/src/components/ui/`

This is the authoritative source of current props, styles, and usage patterns.

## Build

- `npm run build` — compile to dist/
- `npm run dev` — watch mode
- `npm run test` — run tests
- `npm run typecheck` — TypeScript check

## Release

1. `npm run build`
2. `git add dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in package.json, run `npm install`

## Architecture

Tokens: Tailwind v4 CSS-first `@theme {}` with OKLCH colors, three-tier model (primitives → semantic → component).
Components: CVA variants, Radix UI for overlays only.
Build: tsup outputs ESM + CJS + types + CSS bundle.
```

**Step 6: Install dependencies**

```bash
npm install
```

**Step 7: Commit**

```bash
git add .
git commit -m "chore: initialize umichkisa-ds package"
```

---

### Task 2: Set up tsup build config

**Files:**
- Create: `tsup.config.ts`

**Step 1: Create `tsup.config.ts`**

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  injectStyle: false,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
```

Note: CSS is compiled separately by Tailwind v4, not by tsup. tsup handles JS/TS only.

**Step 2: Commit**

```bash
git add tsup.config.ts
git commit -m "chore: add tsup build config"
```

---

### Task 3: Set up Vitest

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`

**Step 1: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 2: Create `tests/setup.ts`**

```typescript
import "@testing-library/jest-dom";
```

**Step 3: Install jest-dom types**

```bash
npm install --save-dev @testing-library/jest-dom
```

**Step 4: Verify vitest runs (empty)**

```bash
npm test
```

Expected: "No test files found"

**Step 5: Commit**

```bash
git add vitest.config.ts tests/setup.ts
git commit -m "chore: add vitest config"
```

---

### Task 4: Set up Tailwind v4 CSS pipeline

**Files:**
- Create: `src/styles/index.css`
- Create: `build-css.sh`
- Update: `package.json` (scripts)

**Step 1: Install Tailwind v4 CLI**

```bash
npm install --save-dev @tailwindcss/cli
```

**Step 2: Create `src/styles/index.css`**

This is the entry point for the CSS bundle. Token definitions go here (in later tasks). For now, just verify Tailwind v4 works.

```css
@import "tailwindcss";

/* Token layers imported here in Task 5-6 */

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
}
```

**Step 3: Update `package.json` scripts**

```json
"scripts": {
  "build": "npm run build:js && npm run build:css",
  "build:js": "tsup",
  "build:css": "npx @tailwindcss/cli -i src/styles/index.css -o dist/styles.css --minify",
  "dev": "concurrently \"tsup --watch\" \"npx @tailwindcss/cli -i src/styles/index.css -o dist/styles.css --watch\"",
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc --noEmit"
}
```

**Step 4: Install concurrently**

```bash
npm install --save-dev concurrently
```

**Step 5: Create minimal `src/index.ts`** (needed for tsup to work)

```typescript
// Entry point — exports added as components are built
export const DS_VERSION = "0.1.0";
```

**Step 6: Run build to verify pipeline**

```bash
npm run build
```

Expected: `dist/index.js`, `dist/index.cjs`, `dist/index.d.ts`, `dist/styles.css` all created with no errors.

**Step 7: Commit**

```bash
git add .
git commit -m "chore: add Tailwind v4 CSS build pipeline"
```

---

## Phase 2: Design Token Layer

### Task 5: Define primitive tokens

**Files:**
- Create: `src/tokens/primitives.css`

**Step 1: Read existing color usage in client**

Open `../KISA-website/client/src/components/ui/button/styles.css` and `../KISA-website/client/tailwind.config.js` to confirm current hex values before converting to OKLCH.

**Step 2: Create `src/tokens/primitives.css`**

```css
/*
 * Tier 1 — Primitive tokens
 * Raw values only. Never reference these directly in components.
 * Always go through semantic tokens (semantic.css).
 */

@theme {
  /* Michigan Brand */
  --primitive-michigan-blue:      oklch(19% 0.061 243);   /* #00274c */
  --primitive-michigan-blue-mid:  oklch(32% 0.09 243);    /* #00568a */
  --primitive-michigan-blue-light:oklch(94% 0.018 243);   /* #e8f0f7 */
  --primitive-michigan-maize:     oklch(83% 0.185 91);    /* #ffcb05 */
  --primitive-michigan-maize-light:oklch(93% 0.1 91);     /* #ffe98a */

  /* Gray scale */
  --primitive-gray-50:  oklch(98% 0.002 264);
  --primitive-gray-100: oklch(96% 0.003 264);
  --primitive-gray-200: oklch(92% 0.004 264);
  --primitive-gray-300: oklch(87% 0.006 264);
  --primitive-gray-400: oklch(73% 0.01 264);
  --primitive-gray-500: oklch(60% 0.012 264);
  --primitive-gray-700: oklch(40% 0.014 264);
  --primitive-gray-900: oklch(17% 0.016 264);

  /* Semantic base */
  --primitive-white: oklch(100% 0 0);
  --primitive-red-500: oklch(58% 0.22 27);
  --primitive-green-500: oklch(64% 0.17 145);
}
```

**Step 3: Import into `src/styles/index.css`**

```css
@import "tailwindcss";
@import "../tokens/primitives.css";

/* ... rest of file */
```

**Step 4: Rebuild CSS**

```bash
npm run build:css
```

Expected: No errors.

**Step 5: Commit**

```bash
git add src/tokens/primitives.css src/styles/index.css
git commit -m "feat(tokens): add primitive token layer with OKLCH brand colors"
```

---

### Task 6: Define semantic tokens

**Files:**
- Create: `src/tokens/semantic.css`
- Update: `src/styles/index.css`

**Step 1: Create `src/tokens/semantic.css`**

```css
/*
 * Tier 2 — Semantic tokens
 * Named by purpose, not value. Components reference ONLY these.
 */

@theme {
  /* Color — Brand */
  --color-brand-primary:    var(--primitive-michigan-blue);
  --color-brand-accent:     var(--primitive-michigan-maize);
  --color-brand-primary-mid:var(--primitive-michigan-blue-mid);

  /* Color — Surface */
  --color-surface:          var(--primitive-white);
  --color-surface-muted:    var(--primitive-gray-50);
  --color-surface-subtle:   var(--primitive-gray-100);

  /* Color — Border */
  --color-border:           var(--primitive-gray-200);
  --color-border-strong:    var(--primitive-gray-300);

  /* Color — Text */
  --color-text-primary:     var(--primitive-gray-900);
  --color-text-muted:       var(--primitive-gray-500);
  --color-text-disabled:    var(--primitive-gray-400);

  /* Color — Feedback */
  --color-error:            var(--primitive-red-500);
  --color-success:          var(--primitive-green-500);

  /* Typography */
  --font-size-xs:   0.75rem;
  --font-size-sm:   0.875rem;
  --font-size-base: 1rem;
  --font-size-lg:   1.125rem;
  --font-size-xl:   1.25rem;
  --font-size-2xl:  1.5rem;
  --font-size-4xl:  2.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;

  /* Icon sizes */
  --icon-xs:  0.875rem;
  --icon-sm:  1rem;
  --icon-md:  1.25rem;
  --icon-lg:  1.5rem;
  --icon-xl:  1.875rem;

  /* Spacing — extends Tailwind's default scale with semantic names */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

**Step 2: Update `src/styles/index.css`**

```css
@import "tailwindcss";
@import "../tokens/primitives.css";
@import "../tokens/semantic.css";

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
}
```

**Step 3: Rebuild and verify**

```bash
npm run build:css
```

**Step 4: Commit**

```bash
git add src/tokens/semantic.css src/styles/index.css
git commit -m "feat(tokens): add semantic token layer"
```

---

## Phase 3: Utility & Shared Internals

### Task 7: Add `cn()` utility

**Files:**
- Create: `src/utils/cn.ts`
- Update: `src/index.ts`

**Step 1: Create `src/utils/cn.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

**Step 2: Write test**

Create `tests/utils/cn.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { cn } from "@/utils/cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts — last wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", false, undefined, null, "bar")).toBe("foo bar");
  });
});
```

**Step 3: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — "Cannot find module '@/utils/cn'"

**Step 4: Export from `src/index.ts`**

```typescript
export const DS_VERSION = "0.1.0";
export { cn } from "./utils/cn";
```

**Step 5: Run test to verify it passes**

```bash
npm test
```

Expected: PASS (3 tests)

**Step 6: Commit**

```bash
git add src/utils/cn.ts tests/utils/cn.test.ts src/index.ts
git commit -m "feat(utils): add cn() merge utility"
```

---

## Phase 4: Button Components

Reference before starting: `../KISA-website/client/src/components/ui/button/`

Current props:
- `CustomButton`: `type` (primary|secondary|tertiary), `text`, `disabled`, `onClick`, `forSubmit`, `className`
- `CustomImageButton`: same + `icon`, `background`
- `CustomLinkButton`: `type`, `href`, `text`, `disabled`

### Task 8: Button component

**Files:**
- Create: `src/components/button/Button.tsx`
- Create: `src/components/button/button.css`
- Create: `tests/components/button/Button.test.tsx`

**Step 1: Write failing test**

Create `tests/components/button/Button.test.tsx`:

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/button/Button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as submit button when forSubmit is true", () => {
    render(<Button forSubmit>Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies secondary variant classes", () => {
    render(<Button variant="secondary">Sec</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-slate");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/button/Button.test.tsx
```

Expected: FAIL — "Cannot find module"

**Step 3: Create `src/components/button/button.css`**

```css
@layer components {
  .btn-base {
    @apply inline-flex items-center justify-center self-center gap-1
      cursor-pointer rounded-[var(--radius-md)]
      text-sm md:text-base
      px-4 py-2
      transition-colors
      disabled:cursor-not-allowed disabled:opacity-60;
  }

  .btn-primary {
    @apply btn-base
      bg-[var(--color-brand-primary)]
      border border-[var(--color-brand-primary)]
      text-[var(--color-brand-accent)]
      hover:border-[var(--color-brand-accent)];
  }

  .btn-secondary {
    @apply btn-base
      bg-slate-100 border border-slate-100
      text-[var(--color-text-primary)]
      hover:bg-slate-200;
  }

  .btn-tertiary {
    @apply btn-base
      border-none
      text-[var(--color-text-primary)]
      hover:underline;
  }
}
```

**Step 4: Import button CSS in `src/styles/index.css`**

```css
@import "tailwindcss";
@import "../tokens/primitives.css";
@import "../tokens/semantic.css";
@import "../components/button/button.css";

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }
}
```

**Step 5: Create `src/components/button/Button.tsx`**

```typescript
import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

export type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
  forSubmit?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={forSubmit ? "submit" : "button"}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={cn(variantClass[variant], className)}
    >
      {children}
    </button>
  );
}
```

**Step 6: Run test to verify it passes**

```bash
npm test tests/components/button/Button.test.tsx
```

Expected: PASS (5 tests)

**Step 7: Commit**

```bash
git add src/components/button/Button.tsx src/components/button/button.css \
  src/styles/index.css tests/components/button/Button.test.tsx
git commit -m "feat(button): add Button component with primary/secondary/tertiary variants"
```

---

### Task 9: LinkButton component

**Files:**
- Create: `src/components/button/LinkButton.tsx`
- Create: `tests/components/button/LinkButton.test.tsx`

**Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkButton } from "@/components/button/LinkButton";

describe("LinkButton", () => {
  it("renders an anchor with correct href", () => {
    render(<LinkButton href="/home">Home</LinkButton>);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
  });

  it("renders as a disabled span when disabled", () => {
    render(<LinkButton href="/home" disabled>Home</LinkButton>);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Home").tagName).toBe("SPAN");
  });

  it("applies variant class", () => {
    render(<LinkButton href="/" variant="secondary">Sec</LinkButton>);
    expect(screen.getByRole("link").className).toContain("btn-secondary");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/button/LinkButton.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/button/LinkButton.tsx`**

```typescript
import { cn } from "@/utils/cn";
import { ButtonVariant } from "./Button";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

export type LinkButtonProps = {
  href: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "primary",
  disabled = false,
  className,
  children,
}: LinkButtonProps) {
  const cls = cn(variantClass[variant], className);

  if (disabled) {
    return (
      <span className={cls} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
```

Note: Using `<a>` not Next.js `<Link>` — this is a framework-agnostic package. The client wraps with Next.js `<Link>` if needed, or passes `asChild` pattern.

**Step 4: Run test to verify it passes**

```bash
npm test tests/components/button/LinkButton.test.tsx
```

Expected: PASS (3 tests)

**Step 5: Commit**

```bash
git add src/components/button/LinkButton.tsx tests/components/button/LinkButton.test.tsx
git commit -m "feat(button): add LinkButton component"
```

---

### Task 10: IconButton component + button barrel export

**Files:**
- Create: `src/components/button/IconButton.tsx`
- Create: `src/components/button/index.ts`
- Create: `tests/components/button/IconButton.test.tsx`
- Update: `src/index.ts`

**Step 1: Write failing test**

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "@/components/button/IconButton";

describe("IconButton", () => {
  it("renders icon and optional text", () => {
    render(<IconButton icon={<span data-testid="icon" />} text="Write" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Write")).toBeInTheDocument();
  });

  it("renders icon without text", () => {
    render(<IconButton icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span />} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<IconButton icon={<span />} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/button/IconButton.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/button/IconButton.tsx`**

```typescript
import { cn } from "@/utils/cn";
import { ButtonVariant } from "./Button";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

export type IconButtonProps = {
  icon: React.ReactNode;
  text?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  forSubmit?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export function IconButton({
  icon,
  text,
  variant = "secondary",
  disabled = false,
  forSubmit = false,
  className,
  onClick,
  "aria-label": ariaLabel,
}: IconButtonProps) {
  return (
    <button
      type={forSubmit ? "submit" : "button"}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(variantClass[variant], "gap-1 h-fit", className)}
    >
      {icon}
      {text && (
        <span className="hidden sm:inline text-sm md:text-base">{text}</span>
      )}
    </button>
  );
}
```

**Step 4: Create `src/components/button/index.ts`**

```typescript
export { Button } from "./Button";
export type { ButtonProps, ButtonVariant } from "./Button";
export { LinkButton } from "./LinkButton";
export type { LinkButtonProps } from "./LinkButton";
export { IconButton } from "./IconButton";
export type { IconButtonProps } from "./IconButton";
```

**Step 5: Update `src/index.ts`**

```typescript
export const DS_VERSION = "0.1.0";
export { cn } from "./utils/cn";
export * from "./components/button";
```

**Step 6: Run all tests**

```bash
npm test
```

Expected: All PASS

**Step 7: Commit**

```bash
git add src/components/button/ tests/components/button/IconButton.test.tsx src/index.ts
git commit -m "feat(button): add IconButton, barrel export, update package entry"
```

---

## Phase 5: Form Components

Reference: `../KISA-website/client/src/components/ui/form/`

### Task 11: Input component

**Files:**
- Create: `src/components/form/input.css`
- Create: `src/components/form/Input.tsx`
- Create: `tests/components/form/Input.test.tsx`
- Update: `src/styles/index.css`

**Step 1: Write failing test**

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/form/Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input type="text" value="" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    render(<Input type="text" value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies invalid styling when invalid prop is true", () => {
    render(<Input type="text" value="" onChange={() => {}} invalid />);
    expect(screen.getByRole("textbox").className).toContain("border-[var(--color-error)]");
  });

  it("shows placeholder text", () => {
    render(<Input type="text" value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/form/Input.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/form/input.css`**

```css
@layer components {
  .ds-input {
    @apply w-full
      px-3 py-2
      border border-[var(--color-border-strong)]
      rounded-[var(--radius-md)]
      text-sm md:text-base text-[var(--color-text-primary)]
      bg-[var(--color-surface)]
      placeholder:text-[var(--color-text-muted)]
      focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]
      disabled:opacity-50 disabled:cursor-not-allowed
      transition-colors;
  }

  .ds-input-invalid {
    @apply border-[var(--color-error)] focus:ring-[var(--color-error)];
  }
}
```

**Step 4: Update `src/styles/index.css`** — add import

```css
@import "../components/form/input.css";
```

**Step 5: Create `src/components/form/Input.tsx`**

```typescript
import { memo } from "react";
import { cn } from "@/utils/cn";

export type InputProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
};

export const Input = memo(function Input({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  invalid = false,
  required = false,
  disabled = false,
  id,
  className,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      aria-invalid={invalid}
      className={cn("ds-input", invalid && "ds-input-invalid", className)}
    />
  );
});
```

**Step 6: Run test to verify it passes**

```bash
npm test tests/components/form/Input.test.tsx
```

Expected: PASS

**Step 7: Commit**

```bash
git add src/components/form/Input.tsx src/components/form/input.css \
  src/styles/index.css tests/components/form/Input.test.tsx
git commit -m "feat(form): add Input component"
```

---

### Task 12: Label component

**Files:**
- Create: `src/components/form/Label.tsx`
- Create: `tests/components/form/Label.test.tsx`

**Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "@/components/form/Label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("is associated with input via htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("shows required indicator when required is true", () => {
    render(<Label htmlFor="name" required>Name</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/form/Label.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/form/Label.tsx`**

```typescript
import { cn } from "@/utils/cn";

export type LabelProps = {
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Label({ htmlFor, required = false, className, children }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-[var(--color-text-primary)]",
        className
      )}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-[var(--color-error)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
```

**Step 4: Run test to verify it passes**

```bash
npm test tests/components/form/Label.test.tsx
```

Expected: PASS

**Step 5: Commit**

```bash
git add src/components/form/Label.tsx tests/components/form/Label.test.tsx
git commit -m "feat(form): add Label component"
```

---

### Task 13: FormItem component + form barrel export

**Files:**
- Create: `src/components/form/FormItem.tsx`
- Create: `src/components/form/index.ts`
- Create: `tests/components/form/FormItem.test.tsx`
- Update: `src/index.ts`

**Step 1: Write failing test**

```typescript
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormItem } from "@/components/form/FormItem";

describe("FormItem", () => {
  it("renders label and input", () => {
    render(
      <FormItem
        htmlFor="email"
        labelText="Email"
        type="email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error when required field is empty and blurred", async () => {
    render(
      <FormItem
        htmlFor="name"
        labelText="Name"
        type="text"
        value=""
        onChange={() => {}}
        required
      />
    );
    await userEvent.tab(); // focus
    await userEvent.tab(); // blur
    // Input should be marked invalid
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows validation error from custom rule", async () => {
    const rule = (v: string) => (v.length < 3 ? "Too short" : null);
    render(
      <FormItem
        htmlFor="name"
        labelText="Name"
        type="text"
        value="ab"
        onChange={() => {}}
        validationRules={[rule]}
      />
    );
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/form/FormItem.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/form/FormItem.tsx`**

```typescript
import { memo, useState, useCallback } from "react";
import { Input } from "./Input";
import { Label } from "./Label";

type ValidationRule = (value: string) => string | null;

export type FormItemProps = {
  htmlFor: string;
  labelText: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  validationRules?: ValidationRule[];
  required?: boolean;
};

export const FormItem = memo(function FormItem({
  htmlFor,
  labelText,
  type,
  value,
  onChange,
  placeholder,
  validationRules = [],
  required = false,
}: FormItemProps) {
  const [error, setError] = useState<string | null>(null);
  const [requiredError, setRequiredError] = useState<boolean>(false);

  const validate = useCallback(
    (val: string = value) => {
      if (required && !val.trim()) {
        setRequiredError(true);
        setError(null);
        return false;
      }
      setRequiredError(false);
      for (const rule of validationRules) {
        const result = rule(val);
        if (result) {
          setError(result);
          return false;
        }
      }
      setError(null);
      return true;
    },
    [required, validationRules, value]
  );

  const handleBlur = () => validate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  const isInvalid = requiredError || error !== null;

  return (
    <div className="relative flex flex-col gap-1 items-start">
      <Label htmlFor={htmlFor} required={required}>
        {labelText}
      </Label>
      <Input
        id={htmlFor}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        invalid={isInvalid}
      />
      {isInvalid && (
        <span className="absolute top-full mt-1 text-xs font-bold text-[var(--color-error)]">
          {error ?? ""}
        </span>
      )}
    </div>
  );
});
```

**Step 4: Create `src/components/form/index.ts`**

```typescript
export { Input } from "./Input";
export type { InputProps } from "./Input";
export { Label } from "./Label";
export type { LabelProps } from "./Label";
export { FormItem } from "./FormItem";
export type { FormItemProps } from "./FormItem";
```

**Step 5: Update `src/index.ts`**

```typescript
export const DS_VERSION = "0.1.0";
export { cn } from "./utils/cn";
export * from "./components/button";
export * from "./components/form";
```

**Step 6: Run all tests**

```bash
npm test
```

Expected: All PASS

**Step 7: Commit**

```bash
git add src/components/form/ tests/components/form/ src/index.ts
git commit -m "feat(form): add FormItem component, form barrel export"
```

---

## Phase 6: Layout Components

Reference: `../KISA-website/client/src/components/ui/divider/` and `toggle/`

### Task 14: HorizontalDivider, VerticalDivider, ToggleBar

**Files:**
- Create: `src/components/layout/HorizontalDivider.tsx`
- Create: `src/components/layout/VerticalDivider.tsx`
- Create: `src/components/layout/ToggleBar.tsx`
- Create: `src/components/layout/togglebar.css`
- Create: `src/components/layout/index.ts`
- Create: `tests/components/layout/Divider.test.tsx`
- Update: `src/styles/index.css`
- Update: `src/index.ts`

**Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HorizontalDivider } from "@/components/layout/HorizontalDivider";
import { VerticalDivider } from "@/components/layout/VerticalDivider";

describe("HorizontalDivider", () => {
  it("renders with light color by default", () => {
    const { container } = render(<HorizontalDivider />);
    expect(container.firstChild).toHaveClass("border-gray-200/60");
  });

  it("renders with gray color when specified", () => {
    const { container } = render(<HorizontalDivider color="gray" />);
    expect(container.firstChild).toHaveClass("border-gray-300");
  });
});

describe("VerticalDivider", () => {
  it("renders a vertical line", () => {
    const { container } = render(<VerticalDivider />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/layout/Divider.test.tsx
```

Expected: FAIL

**Step 3: Create the three components**

`src/components/layout/HorizontalDivider.tsx`:

```typescript
import { cn } from "@/utils/cn";

export type HorizontalDividerColor = "light" | "gray";

export type HorizontalDividerProps = {
  color?: HorizontalDividerColor;
  className?: string;
};

export function HorizontalDivider({ color = "light", className }: HorizontalDividerProps) {
  return (
    <div
      className={cn(
        "border w-full rounded-lg",
        color === "light" ? "border-gray-200/60" : "border-gray-300",
        className
      )}
    />
  );
}
```

`src/components/layout/VerticalDivider.tsx`:

```typescript
import { cn } from "@/utils/cn";

export type VerticalDividerProps = {
  className?: string;
};

export function VerticalDivider({ className }: VerticalDividerProps) {
  return (
    <div
      className={cn(
        "border-l border-[var(--color-border)] self-stretch",
        className
      )}
    />
  );
}
```

`src/components/layout/togglebar.css`:

```css
@layer components {
  .ds-toggle-bar-item {
    @apply px-3 py-2
      flex items-center gap-1
      cursor-pointer
      border-b-2 border-transparent
      text-[var(--color-text-muted)]
      hover:text-[var(--color-text-primary)]
      transition-colors;
  }

  .ds-toggle-bar-item-active {
    @apply border-b-2 border-[var(--color-brand-primary)]
      text-[var(--color-text-primary)]
      font-semibold;
  }
}
```

`src/components/layout/ToggleBar.tsx`:

```typescript
import { cn } from "@/utils/cn";

export type ToggleBarItem = {
  view: string;
  text: string;
  icon?: React.ReactNode;
};

export type ToggleBarProps = {
  activeView: string;
  onViewChange: (view: string) => void;
  items: ToggleBarItem[];
  className?: string;
};

export function ToggleBar({ activeView, onViewChange, items, className }: ToggleBarProps) {
  return (
    <div className={cn("flex text-sm md:text-base mt-1", className)}>
      {items.map((item) => (
        <div
          key={item.view}
          role="tab"
          aria-selected={activeView === item.view}
          onClick={() => onViewChange(item.view)}
          className={cn(
            "ds-toggle-bar-item",
            activeView === item.view && "ds-toggle-bar-item-active"
          )}
        >
          {item.icon}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
```

**Step 4: Update `src/styles/index.css`**

```css
@import "../components/layout/togglebar.css";
```

**Step 5: Create `src/components/layout/index.ts`**

```typescript
export { HorizontalDivider } from "./HorizontalDivider";
export type { HorizontalDividerProps, HorizontalDividerColor } from "./HorizontalDivider";
export { VerticalDivider } from "./VerticalDivider";
export type { VerticalDividerProps } from "./VerticalDivider";
export { ToggleBar } from "./ToggleBar";
export type { ToggleBarProps, ToggleBarItem } from "./ToggleBar";
```

**Step 6: Update `src/index.ts`**

```typescript
export * from "./components/layout";
```

**Step 7: Run all tests**

```bash
npm test
```

Expected: All PASS

**Step 8: Commit**

```bash
git add src/components/layout/ tests/components/layout/ src/styles/index.css src/index.ts
git commit -m "feat(layout): add HorizontalDivider, VerticalDivider, ToggleBar"
```

---

## Phase 7: Feedback Components

Reference: `../KISA-website/client/src/components/ui/feedback/`

Note: The existing `LoadingSpinner` depends on `@nextui-org/react`. This task removes that dependency and builds a CSS-only spinner.

### Task 15: LoadingSpinner

**Files:**
- Create: `src/components/feedback/LoadingSpinner.tsx`
- Create: `src/components/feedback/spinner.css`
- Create: `tests/components/feedback/LoadingSpinner.test.tsx`
- Update: `src/styles/index.css`

**Step 1: Write failing test**

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders loading label", () => {
    render(<LoadingSpinner label="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders fullscreen overlay by default", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toHaveClass("fixed");
  });

  it("renders inline when fullScreen is false", () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />);
    expect(container.firstChild).not.toHaveClass("fixed");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test tests/components/feedback/LoadingSpinner.test.tsx
```

Expected: FAIL

**Step 3: Create `src/components/feedback/spinner.css`**

```css
@layer components {
  @keyframes ds-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .ds-spinner {
    @apply w-10 h-10
      rounded-full
      border-4
      border-[var(--color-border)]
      border-t-[var(--color-brand-primary)];
    animation: ds-spin 0.8s linear infinite;
  }
}
```

**Step 4: Create `src/components/feedback/LoadingSpinner.tsx`**

```typescript
import { cn } from "@/utils/cn";

export type LoadingSpinnerProps = {
  fullScreen?: boolean;
  label?: string;
  className?: string;
};

export function LoadingSpinner({
  fullScreen = true,
  label = "로딩중입니다",
  className,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 justify-center items-center bg-[var(--color-surface)]",
        fullScreen ? "fixed top-0 left-0 w-full h-full z-50" : "h-full w-full mt-8",
        className
      )}
    >
      <div className="ds-spinner" role="status" aria-label={label} />
      <p className="text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
```

**Step 5: Update `src/styles/index.css`**

```css
@import "../components/feedback/spinner.css";
```

**Step 6: Run test to verify it passes**

```bash
npm test tests/components/feedback/LoadingSpinner.test.tsx
```

Expected: PASS

**Step 7: Commit**

```bash
git add src/components/feedback/LoadingSpinner.tsx src/components/feedback/spinner.css \
  src/styles/index.css tests/components/feedback/LoadingSpinner.test.tsx
git commit -m "feat(feedback): add LoadingSpinner without NextUI dependency"
```

---

### Task 16: Feedback state components + feedback barrel export

**Files:**
- Create: `src/components/feedback/NotFound.tsx`
- Create: `src/components/feedback/NotLogin.tsx`
- Create: `src/components/feedback/NotAuthorized.tsx`
- Create: `src/components/feedback/UnexpectedError.tsx`
- Create: `src/components/feedback/index.ts`
- Update: `src/index.ts`

Note: These are display-only components. No tests needed beyond smoke renders. Read the existing versions at `../KISA-website/client/src/components/ui/feedback/` for the exact copy and link targets.

**Step 1: Create `src/components/feedback/NotFound.tsx`**

```typescript
import { LinkButton } from "@/components/button/LinkButton";

export function NotFound() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">404</h1>
        <p className="text-lg md:text-2xl font-semibold text-[var(--color-text-muted)] mb-6">
          존재하지 않는 페이지입니다
        </p>
        <div className="flex justify-center w-[60%] mx-auto">
          <LinkButton href="/" variant="primary">
            홈페이지로 돌아가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create `src/components/feedback/NotLogin.tsx`**

```typescript
import { LinkButton } from "@/components/button/LinkButton";

export function NotLogin() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          로그인이 필요합니다
        </h1>
        <div className="flex justify-center">
          <LinkButton href="/signin" variant="primary">
            로그인하기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Create `src/components/feedback/NotAuthorized.tsx`**

```typescript
import { LinkButton } from "@/components/button/LinkButton";

export function NotAuthorized() {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          접근 권한이 없습니다
        </h1>
        <div className="flex justify-center">
          <LinkButton href="/" variant="primary">
            홈페이지로 돌아가기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Create `src/components/feedback/UnexpectedError.tsx`**

```typescript
export type UnexpectedErrorProps = {
  onRetry?: () => void;
};

export function UnexpectedError({ onRetry }: UnexpectedErrorProps) {
  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
          오류가 발생했습니다
        </h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          잠시 후 다시 시도해주세요.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
```

**Step 5: Create `src/components/feedback/index.ts`**

```typescript
export { LoadingSpinner } from "./LoadingSpinner";
export type { LoadingSpinnerProps } from "./LoadingSpinner";
export { NotFound } from "./NotFound";
export { NotLogin } from "./NotLogin";
export { NotAuthorized } from "./NotAuthorized";
export { UnexpectedError } from "./UnexpectedError";
export type { UnexpectedErrorProps } from "./UnexpectedError";
```

**Step 6: Update `src/index.ts`**

```typescript
export * from "./components/feedback";
```

**Step 7: Run typecheck**

```bash
npm run typecheck
```

Expected: No errors.

**Step 8: Commit**

```bash
git add src/components/feedback/ src/index.ts
git commit -m "feat(feedback): add NotFound, NotLogin, NotAuthorized, UnexpectedError"
```

---

## Phase 8: Icon System

Reference: `../KISA-website/client/src/components/ui/icon/`

All current icons use `react-icons`. The Pocha-specific icons (`PochaBackIcon`, `PochaCartIcon`, `PochaCloseIcon`, `PochaMenuMinusIcon`, `PochaMenuPlusIcon`, `PochaMinusIcon`, `PochaPlusIcon`, `PochaTrashIcon`) stay in the client. Do NOT migrate them here.

### Task 17: Icon base + shared icons

**Files:**
- Create: `src/components/icon/Icon.tsx` (base wrapper)
- Create: `src/components/icon/icon.css`
- Create: `src/components/icon/[individual icons].tsx` (one per icon)
- Create: `src/components/icon/index.ts`
- Update: `src/styles/index.css`
- Update: `src/index.ts`

**Step 1: Create `src/components/icon/icon.css`**

```css
@layer components {
  .ds-icon-xs  { font-size: var(--icon-xs); }
  .ds-icon-sm  { font-size: var(--icon-sm); }
  .ds-icon-md  { font-size: var(--icon-md); }
  .ds-icon-lg  { font-size: var(--icon-lg); }
  .ds-icon-xl  { font-size: var(--icon-xl); }
}
```

**Step 2: Update `src/styles/index.css`**

```css
@import "../components/icon/icon.css";
```

**Step 3: Create `src/components/icon/Icon.tsx`** (base utility)

```typescript
import { cn } from "@/utils/cn";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeClass: Record<IconSize, string> = {
  xs: "ds-icon-xs",
  sm: "ds-icon-sm",
  md: "ds-icon-md",
  lg: "ds-icon-lg",
  xl: "ds-icon-xl",
};

export type IconBaseProps = {
  size?: IconSize;
  className?: string;
};

export function iconClass(size: IconSize = "md", className?: string): string {
  return cn(sizeClass[size], className);
}
```

**Step 4: Migrate shared icons**

For each icon below, create the corresponding file. Pattern is identical for all — only the `react-icons` import changes.

Read `../KISA-website/client/src/components/ui/icon/[Name]Icon.tsx` for the exact `react-icons` symbol used for each.

Icons to migrate: `BackIcon`, `ClockIcon`, `CommentIcon`, `CrossIcon`, `EmailIcon`, `GitIcon`, `GradIcon`, `LikeIcon`, `LinkedInIcon`, `ListIcon`, `MinusIcon`, `PencilIcon`, `PlusIcon`, `ReplyIcon`, `RightArrowIcon`, `SecretIcon`, `TicketIcon`, `TrashcanIcon`, `ViewIcon`.

Example pattern (`src/components/icon/PencilIcon.tsx`):

```typescript
import { BiPencil } from "react-icons/bi";
import { iconClass, IconBaseProps } from "./Icon";

export type PencilIconProps = IconBaseProps & {
  color?: "white" | "gray";
};

export function PencilIcon({ size = "md", color = "white", className }: PencilIconProps) {
  return (
    <BiPencil
      className={iconClass(size, cn(
        color === "gray" ? "text-gray-400" : "text-[var(--color-brand-accent)]",
        className
      ))}
    />
  );
}
```

Apply the same pattern for each icon. Import the exact symbol from `react-icons` that the client currently uses.

**Step 5: Create `src/components/icon/index.ts`**

```typescript
export { iconClass } from "./Icon";
export type { IconSize, IconBaseProps } from "./Icon";
export { PencilIcon } from "./PencilIcon";
// ... export each icon
```

**Step 6: Update `src/index.ts`**

```typescript
export * from "./components/icon";
```

**Step 7: Run typecheck**

```bash
npm run typecheck
```

Expected: No errors.

**Step 8: Commit**

```bash
git add src/components/icon/ src/styles/index.css src/index.ts
git commit -m "feat(icon): add shared icon system migrated from client"
```

---

## Phase 9: Overlay Primitives (Radix UI wrappers)

These are thin wrappers around Radix UI primitives. No business logic — just styling applied through tokens.

### Task 18: Dialog

**Files:**
- Create: `src/components/overlay/Dialog.tsx`
- Create: `src/components/overlay/overlay.css`
- Update: `src/styles/index.css`

**Step 1: Create `src/components/overlay/overlay.css`**

```css
@layer components {
  .ds-overlay-backdrop {
    @apply fixed inset-0 z-50 bg-black/50;
  }

  .ds-dialog-content {
    @apply fixed left-1/2 top-1/2 z-50
      -translate-x-1/2 -translate-y-1/2
      w-full max-w-lg
      rounded-[var(--radius-lg)]
      border border-[var(--color-border)]
      bg-[var(--color-surface)]
      p-6 shadow-lg
      focus:outline-none;
  }
}
```

**Step 2: Create `src/components/overlay/Dialog.tsx`**

```typescript
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/utils/cn";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogContent({ children, className }: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="ds-overlay-backdrop" />
      <RadixDialog.Content className={cn("ds-dialog-content", className)}>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

export type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <RadixDialog.Title
      className={cn("text-lg font-semibold text-[var(--color-text-primary)] mb-4", className)}
    >
      {children}
    </RadixDialog.Title>
  );
}
```

**Step 3: Update `src/styles/index.css`**

```css
@import "../components/overlay/overlay.css";
```

**Step 4: Commit**

```bash
git add src/components/overlay/ src/styles/index.css
git commit -m "feat(overlay): add Dialog wrapper around Radix UI"
```

---

### Task 19: Dropdown and Popover + overlay barrel export

**Files:**
- Create: `src/components/overlay/Dropdown.tsx`
- Create: `src/components/overlay/Popover.tsx`
- Create: `src/components/overlay/index.ts`
- Update: `src/index.ts`

**Step 1: Create `src/components/overlay/Dropdown.tsx`**

```typescript
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils/cn";

export const Dropdown = RadixDropdown.Root;
export const DropdownTrigger = RadixDropdown.Trigger;

export type DropdownContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function DropdownContent({ children, className }: DropdownContentProps) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)]",
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
          "p-1",
          className
        )}
        sideOffset={4}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
}

export type DropdownItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
};

export function DropdownItem({ children, onSelect, className }: DropdownItemProps) {
  return (
    <RadixDropdown.Item
      onSelect={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2",
        "text-sm text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-surface-muted)] focus:outline-none",
        className
      )}
    >
      {children}
    </RadixDropdown.Item>
  );
}
```

**Step 2: Create `src/components/overlay/Popover.tsx`**

```typescript
import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "@/utils/cn";

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;

export type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function PopoverContent({ children, className }: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          "z-50 rounded-[var(--radius-md)]",
          "border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md",
          "p-4",
          className
        )}
        sideOffset={4}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}
```

**Step 3: Create `src/components/overlay/index.ts`**

```typescript
export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle } from "./Dialog";
export type { DialogContentProps, DialogTitleProps } from "./Dialog";
export {
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem,
} from "./Dropdown";
export type { DropdownContentProps, DropdownItemProps } from "./Dropdown";
export { Popover, PopoverTrigger, PopoverContent } from "./Popover";
export type { PopoverContentProps } from "./Popover";
```

**Step 4: Update `src/index.ts`**

```typescript
export * from "./components/overlay";
```

**Step 5: Run typecheck and all tests**

```bash
npm run typecheck && npm test
```

Expected: No type errors. All tests PASS.

**Step 6: Commit**

```bash
git add src/components/overlay/ src/index.ts
git commit -m "feat(overlay): add Dropdown and Popover wrappers, overlay barrel export"
```

---

## Phase 10: First Build & Tag

### Task 20: Full build, verify output, tag v0.1.0

**Step 1: Run full build**

```bash
npm run build
```

Expected: `dist/` contains:
- `index.js` (ESM)
- `index.cjs` (CJS)
- `index.d.ts` (types)
- `index.d.ts.map`
- `styles.css` (compiled tokens + all component CSS)

**Step 2: Inspect `dist/styles.css`**

Verify that OKLCH token variables appear at the top and all component CSS classes (`btn-primary`, `ds-input`, `ds-spinner`, etc.) are present.

**Step 3: Run all tests and typecheck**

```bash
npm run typecheck && npm test
```

Expected: No errors.

**Step 4: Commit dist and tag**

```bash
git add dist/
git commit -m "chore: build v0.1.0 dist"
git tag v0.1.0
```

Do not push yet — wait until client integration is confirmed.

---

## Phase 11: Client Integration

Work switches to `../KISA-website/client/`. All steps below run from that directory.

### Task 21: Wire client to DS package

**Files:**
- Modify: `../KISA-website/client/package.json`

**Step 1: Add DS dependency**

```bash
cd ../KISA-website/client
npm install --save file:../../umichkisa-ds
```

This installs the local package. package.json will show:

```json
"@umichkisa-ds/web": "file:../../umichkisa-ds"
```

**Step 2: Import styles in root layout**

Open `src/app/layout.tsx`. Add at the top of imports:

```typescript
import "@umichkisa-ds/web/dist/styles.css";
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: No errors.

**Step 4: Commit**

```bash
git add package.json package-lock.json src/app/layout.tsx
git commit -m "chore: wire @umichkisa-ds/web package into client"
```

---

### Task 22: Replace client button components with DS imports

**Step 1: Global find-replace**

Everywhere in `src/` that imports from `@/components/ui/button`, replace with `@umichkisa-ds/web`.

Key mapping:
- `CustomButton` → `Button` (note: `text` prop becomes `children`)
- `CustomImageButton` → `IconButton`
- `CustomLinkButton` → `LinkButton`

Run:

```bash
npx tsc --noEmit
npm run lint
```

Fix all errors before proceeding.

**Step 2: Delete old button directory**

```bash
rm -rf src/components/ui/button
```

**Step 3: Run typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: No errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "refactor: replace CustomButton/CustomImageButton/CustomLinkButton with DS imports"
```

---

### Task 23: Replace form, divider, feedback, toggle components

Repeat the pattern from Task 22 for:

- `src/components/ui/form/` → `@umichkisa-ds/web`
- `src/components/ui/divider/` → `@umichkisa-ds/web`
- `src/components/ui/feedback/` → `@umichkisa-ds/web`
- `src/components/ui/toggle/` → `@umichkisa-ds/web`

After each replacement, run `npx tsc --noEmit && npm run lint` before deleting the old folder.

Commit after all four are done:

```bash
git add -A
git commit -m "refactor: replace form/divider/feedback/toggle components with DS imports"
```

---

### Task 24: Replace shared icons with DS imports

Replace all imports from `@/components/ui/icon/` with `@umichkisa-ds/web`.

Pocha-specific icon files (`PochaBackIcon`, `PochaCartIcon`, etc.) remain in the client at `src/components/ui/icon/`. Do not delete them.

```bash
npx tsc --noEmit && npm run lint
```

Commit:

```bash
git add -A
git commit -m "refactor: replace shared icon imports with DS imports"
```

---

### Task 25: Remove deprecated-components

**Step 1: Find all remaining usages**

```bash
grep -r "deprecated-components" src/ --include="*.tsx" --include="*.jsx" --include="*.ts"
```

**Step 2: Resolve each usage**

For each file found, replace the deprecated import with either:
- A DS import (`@umichkisa-ds/web`) if a DS equivalent exists
- A refactored local component if it is truly app-specific (e.g. `BurgerMenuIcon` in Header)

**Step 3: After all usages are resolved**

```bash
rm -rf src/deprecated-components
```

**Step 4: Run typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: No errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "refactor: remove deprecated-components folder"
```

---

## Done

After Task 25, the client is fully migrated. The design system package is standalone, versioned, and the client imports it cleanly.

**Next steps (out of scope for this plan):**
- Push both repos and tag `v0.1.0` in `umichkisa-ds`
- Update client `package.json` from `file:` reference to GitHub tag reference
- Set up GitHub Actions in `umichkisa-ds` to auto-build on tag push
- Storybook documentation site (v2)
