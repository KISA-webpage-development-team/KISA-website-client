# CherryBlossom Components -- Code Review Notes

This document covers the issues found in `CherryBlossomBranch.tsx` and `CherryBlossomPetals_optimized.tsx` during code review, and how each was resolved. Written in a beginner-friendly way so that the team can learn from these patterns.

---

## 1. Dynamic Import for CherryBlossomBranch (CRITICAL -- Bundle Size)

### What was the problem?

`CherryBlossomBranch.tsx` is a purely decorative component -- it renders animated cherry blossom branches using SVG. The file is 200+ lines of SVG markup and animation logic. It was imported like this:

```tsx
import { CherryBlossomBranch } from "@/features/pocha/components/manage/CherryBlossomBranch";
```

This is a **static import**. When you use a static import, the component's code gets bundled into the **initial JavaScript payload** that the browser must download and parse before the page becomes interactive. This is called the "main bundle."

For essential UI (buttons, text, layout), this is fine. But for decorative animations that aren't needed for the page to function, this bloats the bundle unnecessarily and slows down the initial page load.

### What is hydration and why does this matter?

In Next.js, the server first sends HTML to the browser (fast initial render). Then the browser downloads JavaScript and "hydrates" the page -- meaning React attaches event listeners and makes the page interactive. The more JavaScript in the bundle, the longer hydration takes, and the longer the user waits before they can interact with the page.

A decorative SVG animation doesn't need to be part of that critical path.

### How was it fixed?

We switched to a **dynamic import** using `next/dynamic`:

```tsx
import dynamic from "next/dynamic";

const CherryBlossomBranch = dynamic(
  () =>
    import("@/features/pocha/components/manage/CherryBlossomBranch").then(
      (mod) => mod.CherryBlossomBranch
    ),
  { ssr: false }
);
```

What this does:
- **`dynamic()`** tells Next.js to split this component into a separate JavaScript chunk. It gets loaded *after* the main bundle, not during initial page load.
- **`ssr: false`** means this component won't be rendered on the server at all. Since it's a purely visual animation, there's no SEO or accessibility reason to server-render it. This also avoids any hydration mismatch issues.

### When should you use dynamic imports?

Use `next/dynamic` for:
- Heavy decorative/animation components
- Components that rely on browser-only APIs (e.g., `window`, `canvas`)
- Modals, tooltips, or other UI that isn't visible on initial load
- Third-party libraries that are large (chart libraries, rich text editors, etc.)

Don't use it for core page content that should be visible immediately.

---

## 2. Inline Style Tag with Keyframes (HIGH -- Rendering Performance)

### What was the problem?

The `CherryBlossomBranch` component had a `<style>` tag directly in its JSX:

```tsx
return (
  <>
    {/* ... SVG branches ... */}
    <style>{`
      @keyframes windSway {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(2deg); }
        /* ... */
      }
      @keyframes windSway2 { /* ... */ }
      @keyframes windSway3 { /* ... */ }
      @keyframes sway { /* ... */ }
    `}</style>
  </>
);
```

Every time React renders this component, it creates a new `<style>` DOM element and injects it into the page. Even if the content hasn't changed, the browser still has to parse those CSS rules again. This is wasteful.

Additionally, if the component mounts and unmounts multiple times (e.g., navigating away and back), you get **duplicate `<style>` tags** stacking up in the DOM.

### How was it fixed?

Moved all four `@keyframes` definitions into `src/app/globals.css`:

```css
/* Cherry Blossom Branch animations */
@keyframes windSway {
  0%   { transform: rotate(0deg); }
  25%  { transform: rotate(2deg); }
  50%  { transform: rotate(-1deg); }
  75%  { transform: rotate(2.5deg); }
  100% { transform: rotate(0deg); }
}
/* ... other keyframes ... */
```

Then removed the entire `<style>` block from the component.

### Why is a CSS file better?

- CSS files are parsed **once** by the browser when the stylesheet loads
- They are **cached** -- revisiting the page doesn't re-parse them
- No duplicate style injection on re-renders or re-mounts
- Keyframes in a CSS file are available globally, which is fine since animation names like `windSway` are specific enough to not conflict

### General rule

If your CSS is **static** (doesn't change based on props or state), it belongs in a CSS file or Tailwind config. Only use inline styles or CSS-in-JS for truly **dynamic** values (e.g., `style={{ width: `${progress}%` }}`).

---

## 3. setTimeout Without Cleanup (MEDIUM -- Memory Safety)

### What was the problem?

The sway animation used `setTimeout` to reset state after 1 second:

```tsx
const playSway = () => {
  setIsSwaying(true);
  setTimeout(() => setIsSwaying(false), 1000);
};
```

The problem: if the component **unmounts** before that 1 second is up (e.g., user navigates away), the `setTimeout` callback still fires and tries to call `setIsSwaying(false)` on a component that no longer exists.

In React 18, this doesn't cause a visible error anymore, but it's still a **memory leak** -- the callback holds a reference to the component's state setter, preventing garbage collection. In older React versions, this would produce the classic warning:

> "Can't perform a React state update on an unmounted component."

### How was it fixed?

We store the timer ID in a **ref** and clear it on unmount:

```tsx
const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

const playSway = useCallback(() => {
  setIsSwaying(true);
  clearTimeout(timerRef.current);  // cancel any existing timer
  timerRef.current = setTimeout(() => setIsSwaying(false), 1000);
}, []);

// Cleanup on unmount
useEffect(() => {
  return () => clearTimeout(timerRef.current);
}, []);
```

### What is a ref in this context?

`useRef` creates a mutable container that persists across renders without causing re-renders when changed. It's perfect for storing timer IDs, DOM references, or any value you need to read/write without triggering a re-render.

Here, `timerRef.current` holds the timer ID so we can `clearTimeout()` it later.

### General rule

Any time you use `setTimeout` or `setInterval` in a component, you **must** clean it up in a `useEffect` cleanup function. The pattern is always:

```tsx
useEffect(() => {
  const timer = setTimeout(() => { /* ... */ }, delay);
  return () => clearTimeout(timer);
}, [dependencies]);
```

---

## 4. Unstable Function Reference in useEffect (MEDIUM -- React Hooks Correctness)

### What was the problem?

The original code had:

```tsx
const playSway = () => {
  setIsSwaying(true);
  setTimeout(() => setIsSwaying(false), 1000);
};

useEffect(() => {
  if (triggerSway > 0) playSway();
}, [triggerSway]);
```

The `useEffect` uses `playSway` but doesn't list it in its dependency array. This is a **React hooks rule violation**. The ESLint rule `react-hooks/exhaustive-deps` would flag this.

But why can't we just add `playSway` to the dependency array as-is?

Because `playSway` is declared as a plain function inside the component body, it gets **recreated on every render**. In JavaScript, two functions with identical code are not equal:

```js
const a = () => {};
const b = () => {};
a === b; // false
```

So if we added `playSway` to the dependency array, the effect would re-run on **every single render**, not just when `triggerSway` changes. This could cause infinite loops or unnecessary side effects.

### What is useCallback?

`useCallback` is a React hook that **memoizes** a function -- it returns the same function reference across renders as long as its dependencies haven't changed:

```tsx
const playSway = useCallback(() => {
  setIsSwaying(true);
  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => setIsSwaying(false), 1000);
}, []);  // empty deps = same function forever
```

Now `playSway` is a stable reference. We can safely add it to the `useEffect` dependency array:

```tsx
useEffect(() => {
  if (triggerSway > 0) playSway();
}, [triggerSway, playSway]);
```

The effect now correctly lists all its dependencies, and it still only re-runs when `triggerSway` changes (since `playSway` is stable).

### General rule

If you define a function inside a component and use it inside a `useEffect`:
1. Wrap it in `useCallback` to stabilize the reference
2. Add it to the `useEffect` dependency array
3. Always list **all** values the effect reads from the component scope

This ensures your effects are predictable and don't have stale closure bugs.

---

## Summary

| Issue | Severity | Root Cause | Fix |
|-------|----------|------------|-----|
| Static import of large decorative component | CRITICAL | Bloats initial bundle, delays hydration | `next/dynamic` with `ssr: false` |
| Inline `<style>` tag with `@keyframes` | HIGH | Re-injected on every render, duplicates on remount | Moved to `globals.css` |
| `setTimeout` without cleanup | MEDIUM | Memory leak / state update after unmount | Store timer in ref, clear on unmount |
| Unstable function in useEffect deps | MEDIUM | Missing dependency, hooks rule violation | `useCallback` for stable reference |
