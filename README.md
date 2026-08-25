# KISA Website Frontend

## Tech Stack

- **Framework**: NextJS (^14.2.4)
- **Styling**: TailwindCSS
- **UI Library**: NextUI + Aceternity UI | React-icons
- **State Management**: React Context API
- **HTTP Client**: Axios (^1.7.2) + SWR (^2.2.5)

## Getting Started

**If you're responsible for the project or new to the project, please check out [general_guide.md](docs/general_guide.md) to understand the project structure and guidelines.**

---

### 1. run the following command to install necessary packages

`npm install`

### 2-1. Run with production environment

`npm run dev`

### 2-2. Run with local environment

Make sure local backend server is running (https://github.com/KISA-webpage-development-team/KISA-website-backend)

`npm run dev-local`

### 3. run following command to build the project and run the server

`npm run build && npm run start`

---

## Getting Started with Claude Code

Prepare Claude account and Claude Code installed.

After running Claude Code session under this repo,

run following commands to install necessary skills/plugins

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
# make sure you install it locally only for claude code using Symlinks
```

### Pastiche

use [pastiche plugin](https://github.com/retz8/pastiche) to **implement UI without design**

open Claude Code session

```bash
/plugin marketplace add retz8/pastiche
/plugin install pastiche@pastiche-marketplace
```

then run

```bash
/pastiche <task>
```

## Pocha Theme Toggle

The pocha app supports seasonal themes. To switch between spring and default:

Edit `src/features/pocha/featureFlag.ts` and set `POCHA_THEME` to `"spring"` or `"default"`.

---

## Insta2Carousel

Automated Pipeline for Instagram Posts -> Home Carousel UI

[Docs Link](./docs/insta2carousel.md)
