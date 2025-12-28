# 📱 Insta2Carousel

## 1. Overview

This project automates the synchronization between the **[UMich KISA Instagram](https://www.instagram.com/kisa_michigan/?hl=en)** and the **[official website's announcement carousel](https://www.umichkisa.com)**.

Previously, board members had to manually copy Instagram captions, summarize them, and update the website code. Insta2Carousel is an automated CI pipeline that fetches new instagram posts, summarizes captions using AI, and deploys the updates automatically.

## 2. Motivation (The "Why")

* **Problem:** High operational overhead and human error in keeping the website's main carousel up-to-date with social media.
* **Goal:** Improve **DX (Developer Experience)** and operational efficiency by removing manual intervention.

## 3. Tech Stack

* **Scripting:** TypeScript
* **AI:** GPT-4o Mini (OpenAI API) (Content Summarization, Date&Title Extraction)
* **Data Source:** Instagram API from [Rapid API](https://rapidapi.com/3205/api/instagram120/playground)
* **CI/CD & DevOps:** GitHub Actions (Automation)
* **Frontend:** Next.js (Client-side rendering of [`HomeCarousel.jsx`](../src/features/home-sponsor/components/HomeCarousel.jsx))

## 4. Pipeline Architecture

1. **Fetch:** A TS script triggers via GitHub Actions to fetch the latest post data (JSON) from Instagram (used axios).
2. **Process (AI):** GPT-4o Mini model processes raw caption from Instagram API and convert it to `caption`, `title`, `eventEndDate` and `imageUrl`.
3. **Update:** The script updates the local `instagramCarousel.generated.json` file with the new structured data.
4. **Commit & Deploy:** GitHub Actions performs an **auto-commit** back to the repository and makes PR to the `main` branch from `instagram-sync` branch. Cron job is set to run workflow every 5:00 UTC.

## 5. File Structure & Key Functions

| File | Responsibility |
| --- | --- |
| `scripts/insta-to-carousel/fetchPosts.ts` | Main logic: Makes API calls to Rapid API to fetch instagram posts
| `scripts/insta-to-carousel/formatPosts.ts` | Main Logic: AI data extraction with OpenAI API
| `scripts/insta-to-carousel/cli.ts` | custom yargs CLI to run scripts by Github Actions |
---