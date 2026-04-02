# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Context Hygiene

At the start of every response, output `[Context: ~X% used]` and estimate based on conversation length.

Thresholds  
* 0 to 30% Fresh context
* 30 to 60% Normal
* 60 to 80% Caution
* 80% plus Danger

Never auto compact. When context exceeds 70%, ask:

> Context at ~70%. Want me to compact now, or continue? If we compact, I will preserve the current task state.

Before any compaction, state
1. What will be preserved
2. What will be lost
3. Ask for confirmation

If the conversation goes sideways, use `Esc Esc` to roll back to a known good checkpoint.

## Commands

```bash
npm install              # Install dependencies

npm run dev              # Dev server using production backend
npm run dev-local        # Dev server using local backend (requires local backend running)

npm run build            # Production build
npm run start            # Start production server

npm run lint             # ESLint

npm run test:insta       # Run Instagram carousel formatter tests
npm run insta:run        # Run Instagram-to-carousel pipeline
npm run insta:dry-run    # Dry run of Instagram-to-carousel pipeline
```

The `dev` vs `dev-local` distinction matters: `dev-local` sets `NEXT_PUBLIC_USE_LOCAL_BACKEND=true` in `.env.local` via `devops/args.ts`, pointing axios at the local backend URL instead of production.

## Critical Rules

### No Emojis in Markdown
Never use emojis in any markdown documents (`.md` files), comments, or code. They waste tokens and add no value.

### Never Push Without Explicit Permission
**Never run `git push` under any circumstances unless the user explicitly says to push.** This includes `git push`, `git push --force`, or any remote-modifying git operation. Committing locally is fine when asked; pushing is not.

### Use Relevant Skills Proactively
When working on UI/UX changes, component design, or layout work, invoke the `/ui-ux-pro-max` skill before starting implementation. When writing, reviewing, or refactoring React or Next.js code (components, data fetching, bundle optimization, performance), invoke the `/vercel-react-best-practices` skill before starting implementation. Do not wait for the user to ask — use these skills on your own initiative whenever the task warrants them.

### Verify Every Code Change
After every edit to a `.ts` or `.tsx` or `.js` file, run a type check and lint before considering the task done:

```bash
npx tsc --noEmit   # Check for TypeScript type errors
npm run lint       # Check for lint errors
```

If either command reports errors introduced by your changes, fix them before finishing. Do not leave the codebase in a broken state.

## Architecture Overview

This is a **Next.js 14 App Router** project (TypeScript, TailwindCSS). The `src/` directory is organized as follows:

### Key Architectural Layers

**`src/apis/`** — All backend communication lives here exclusively. Organized by entity (matching backend API path prefix, e.g., `/api/v1/users` → `src/apis/users/`). Each entity folder has up to three files:
- `queries.ts` — GET calls via axios
- `mutations.ts` — POST/PUT/DELETE calls via axios
- `swrHooks.ts` — GET calls via SWR (React hooks, named `useSomething`)

No API calls should be made outside this folder.

**`src/features/`** — Feature-based structure (the primary development area). Each feature is self-contained with its own `components/`, `contexts/`, `hooks/`, and `data/`. Current features: `about-page`, `bulletin-board`, `home-sponsor`, `info-page`, `jobs-curator`, `pocha`, `users`.

**`src/components/`** — Shared UI components only (`layout/` for header/footer, `ui/` for buttons/icons/inputs/modals). Do not put feature-specific components here.

**`src/lib/`** — Third-party library wrappers only. Each library has its own subfolder (e.g., `lib/axios/`, `lib/next-auth/`, `lib/stripe/`). Direct library imports elsewhere in the codebase should be avoided; import from `lib/` instead.

**`src/constants/`** — App-wide constants. `env.ts` is the sole file that reads from `process.env` — all other files must import from here instead of using `process.env` directly. Library-specific env vars belong in their respective `lib/[library]/env.ts`.

**`src/types/`** — Shared TypeScript interfaces/types, organized by entity.

**`src/app/`** — Next.js App Router pages and API routes. Routes: `about`, `boards`, `everykisa`, `info`, `jobs`, `pocha`, `posts`, `signin`, `signup`, `users`. API routes live in `src/app/api/`.

**`src/middleware.ts`** — Uses `next-auth`'s `withAuth` to protect routes: `/users/*`, `/posts/create/*`, `/posts/update/*`, `/posts/delete/*`, `/pocha/*`.

### Auth

Authentication uses **NextAuth.js** (Google OAuth). Configuration is in `src/lib/next-auth/authOptions.ts`. Sessions are JWT-based. The `useAdmin` hook in `src/lib/next-auth/useAdmin.ts` gates admin-only features.

### Environment Variables

The `NEXT_PUBLIC_USE_LOCAL_BACKEND` flag (set automatically by `npm run dev-local`) controls whether axios points to the local or production backend. Similarly `NEXT_PUBLIC_USE_LOCAL_WEBSOCKET` for Socket.IO.

### External Services

- **AWS S3** — CDN bucket (`kisaweb-cdn-bucket.s3.amazonaws.com`)
- **Cloudinary** — Image uploads (upload/sign endpoints in `src/app/api/`)
- **Stripe** — Payments (wrapped in `src/lib/stripe/`)
- **Socket.IO** — Real-time features (pocha)
- **Google Calendar API** — Events calendar

## Code Style Guidelines

From `.cursor/rules/toss-frontend.mdc` (always applied):

- **Name magic numbers** as constants (e.g., `const ANIMATION_DELAY_MS = 300`)
- **Separate code paths** for significantly different conditional renders into distinct components rather than complex ternaries
- **Use IIFEs or if/else** instead of nested ternary operators for complex conditionals
- **Name complex boolean conditions** as variables before using them in JSX
- **Single Responsibility**: JSX components render UI only; business logic, API calls, and state go in custom hooks
- **Component composition** over props drilling
- **Avoid premature abstraction** — duplication is acceptable when use cases may diverge
- Prefer `if`/`else` with explicit named variables over inline `&&`/`||` conditionals in JSX

The project is partially refactored. `bulletin-board/board`, `home-sponsor`, `info-page`, and `users/signup` still rely on older patterns and deprecated components from `src/deprecated-components/`.
