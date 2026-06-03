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
Follow the rules in @docs/general_guide.md's ## 4. Additional Notes section.

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

## GitHub Automation (when triggered by `@claude`)

These rules apply when you are invoked from a GitHub issue or pull request (the `@claude` trigger). They are in addition to everything above.

Being invoked via `@claude` is explicit authorization to commit to a working branch and open a pull request. This overrides the local "Never Push Without Explicit Permission" rule for automation runs only. It is never authorization to push to `main` or to merge.

### Working style
- Create small, focused pull requests. One concern per PR.
- Never push directly to `main`. Always work on a branch; the automation opens the PR (see "Opening the pull request").
- Never auto-merge. Codex review and the human owner decide.
- Write a clear PR description with: a short summary of the change, the reason, the files touched, and the checks you ran with their results.

### Risk level (classified automatically)
You do NOT set the risk level and you do NOT run `gh label`. After your branch is
pushed, a workflow step classifies the PR deterministically from its changed files
(`.github/scripts/classify-risk.sh`) and applies the matching label; any
`Risk level:` line you put in the PR body is stripped and replaced. The levels are:

- `simple` — small, low-risk, well-contained change (copy, styling, isolated bug fix) with passing checks.
- `complex` — multi-file or non-trivial logic change. Review more deeply, add or update tests, and run all checks before recommending approval.
- `human-required` — touches a sensitive area (see below). Flagged for human review; never presented as safe to auto-approve.

### Opening the pull request
Do NOT run `gh pr create` yourself. After you commit and push your branch, an
automated workflow step opens a **draft** PR for you (using a token that lets the
review workflows trigger) and then requests a Codex review with an `@codex review`
comment. The PR title is set automatically; you do not provide one.

Hand off the PR description by writing `/tmp/pr_body.md`: a short summary, the
reason, the files touched, and the checks you ran with results. Do NOT add a
`Risk level:` line — risk is classified automatically (see "Risk level" above)
and any such line is stripped and replaced.

If you do not write `/tmp/pr_body.md` the PR is still opened with a generic body;
the risk level is classified from the diff either way.

### Responding to a Codex fix request
Codex (the `@codex` GitHub reviewer) reviews each PR and only flags serious
(P0/P1) issues. When that happens, an automated bridge posts a comment of the
form "@claude fix Codex feedback ..." on the PR. When you are triggered by such a
comment:

- Work on the PR's existing branch. Do NOT create a new branch or a new PR.
- Address every Codex review comment; add or update tests where appropriate.
- Run the checks (see below), then push your fixes to the same PR branch.
- Do not mark the PR ready for review and do not merge — that is the human owner's
  decision. A fresh Codex review is requested automatically after your push.

### Sensitive areas (auto-classified `human-required`)
The classifier marks a PR `human-required` automatically when it touches any of
these — you do not mark it yourself, but be aware these areas always get human
review and are never auto-fixed without explicit human opt-in:
- payments / Stripe / Pocha order state
- auth / JWT / admin permissions
- database migrations or schema changes
- secrets, credentials, or environment variables (including `src/constants/env.ts`)
- deployment config or GitHub Actions workflows (`.github/`)
- dependency upgrades (`package.json`, lockfiles)
- the NextAuth middleware (`src/middleware.ts`) and server API routes (`src/app/api/`)
- anything security-sensitive

### Checks before opening or updating a PR
Run these and report their output in the PR body:

```bash
npx tsc --noEmit   # TypeScript type check
npm run lint       # ESLint
npm test           # vitest, when the change has test coverage
```

Do not finish with a broken build.