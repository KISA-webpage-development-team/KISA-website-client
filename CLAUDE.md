# CLAUDE.md

Covers: project architecture, task-specific instructions (where to work and which skills to invoke), verification requirements, critical rules, and local development setup.

## Architecture Overview

Next.js 14 App Router project (TypeScript, TailwindCSS) serving two apps under `umichkisa.com`:

- **KISA Web** — main site (`/`): `about-page`, `bulletin-board`, `home-sponsor`, `info-page`, `jobs-curator`, `users`
- **Pocha** — mini-app at `/pocha`: `pocha`, `users`

> **Note:** `bulletin-board/board`, `home-sponsor`, `info-page`, and `users/signup` are partially refactored and still rely on `src/deprecated-components/`.

```
.
├── devops/    # build and deployment scripts
├── docs/      # project documentation
├── public/    # static assets served directly
├── scripts/   # one-off utility scripts
├── src/       # application source (see @docs/general_guide.md for full breakdown)
└── tests/     # test files
```

## Task Instructions

MUST identify the task type before starting and follow the corresponding rules.

- **New feature** → create under `src/features/[feature-name]/` | Invoke: `superpowers:brainstorming`, `vercel-react-best-practices`; for UI parts also invoke `frontend-design`, `ui-ux-pro-max`
- **Modify existing feature** → work in `src/features/[feature-name]/` | Invoke: `vercel-react-best-practices`; if UI/UX involved, also invoke `frontend-design`, `ui-ux-pro-max`
- **Bug fix** → identify the affected feature/component first, then fix in place | Invoke: `superpowers:systematic-debugging`; if UI/UX involved, also invoke `frontend-design`, `ui-ux-pro-max`
- **Refactor** → stay within existing folder boundaries; do not move code across layers
- **Add/modify shared UI component** → `src/components/` only, never inside a feature | Invoke: `frontend-design`, `ui-ux-pro-max`, `vercel-react-best-practices`
- **Add/modify API calls** → `src/apis/[entity]/` only; never make API calls outside this folder
- **Add/modify third-party library** → `src/lib/[library-name]/` only; never import directly outside `lib/`
- **Add environment variable** → declare in `src/constants/env.ts` only; never use `process.env` elsewhere
- **Add shared TypeScript types** → `src/types/`; feature-local types stay within the feature folder

## Verification

**MUST run after every edit:**

```bash
npx tsc --noEmit   # TypeScript type check
npm run lint       # ESLint
```

Fix any errors before finishing. Do not leave the codebase in a broken state.

## Critical Rules

### Code Style
Follow the rules in @.cursor/rules/toss-frontend.mdc (always applied).

### No Emojis in Markdown
Never use emojis in any markdown documents (`.md` files), comments, or code. They waste tokens and add no value.

### Never Push Without Explicit Permission
**Never run `git push` under any circumstances unless the user explicitly says to push.** This includes `git push`, `git push --force`, or any remote-modifying git operation. Committing locally is fine when asked; pushing is not.

## Local Development Commands

To develop against the local backend:

1. Make sure the local backend is running at `http://localhost:8000`
2. Run `npm install` if you haven't already or after pulling new changes
3. Start the dev server pointing to local backend:

```bash
npm run dev-local
```

To develop against the production backend instead:

```bash
npm run dev
```