#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fetchPosts } from "./fetchPosts.ts";
import { formatPosts } from "./formatPosts.ts";
import type { CarouselItem } from "./formatPosts.ts";

import yargs from "yargs";
// import { hideBin } from 'yargs/helpers'

const argv = yargs(process.argv)
  .option("username", { type: "string", default: "kisa_michigan" })
  .option("maxId", { type: "string", default: "0" })
  .option("dry-run", { type: "boolean", default: false })
  .option("commit", { type: "boolean", default: false })
  .option("max-items", { type: "number", default: 6 })
  .option("stale-days", { type: "number", default: 30 })
  .option("output", {
    type: "string",
    default: "src/features/home-sponsor/data/instagramCarousel.generated.json",
  })
  .parseSync();

const OUTPUT_PATH = path.resolve(process.cwd(), argv.output as string);

function readExisting(): CarouselItem[] {
  try {
    const raw = fs.readFileSync(OUTPUT_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as CarouselItem[];
    return [];
  } catch (err) {
    return [];
  }
}

function stableStringify(obj: any) {
  return JSON.stringify(obj, Object.keys(obj).sort(), 2);
}

function isStale(existing: CarouselItem[], latestItems: CarouselItem[], staleDays: number) {
  // If existing is empty, it's stale
  if (!existing || existing.length === 0) return true;

  const now = Date.now();
  const cutoff = now - staleDays * 24 * 60 * 60 * 1000;

  // Find newest eventTakenAt or takenAt in existing
  const newestExistingTs = existing
    .map((it) => it.eventTakenAt ?? it.takenAt)
    .filter(Boolean)
    .map((s) => new Date(s as string).getTime())
    .reduce((acc, cur) => Math.max(acc, cur), 0);

  if (!newestExistingTs) return true;

  return newestExistingTs < cutoff;
}

async function run() {
  console.log("Fetching recent posts for", argv.username);
  const nodes = await fetchPosts(String(argv.username), { maxId: String(argv.maxId) });
  console.log(`Fetched ${nodes.length} nodes`);

  const items = await formatPosts(nodes, { useGemini: Boolean(process.env.GEMINI_API_KEY) });

  const limited = items.slice(0, Number(argv["max-items"]));

  const existing = readExisting();

  const latestJson = JSON.stringify(limited, null, 2);
  const existingJson = JSON.stringify(existing, null, 2);

  const contentsChanged = latestJson !== existingJson;
  const stale = isStale(existing, limited, Number(argv["stale-days"]));

  if (!contentsChanged && !stale) {
    console.log("No changes detected and not stale. Exiting.");
    return 0;
  }

  console.log("Changes detected or stale. Writing generated file to", OUTPUT_PATH);

  if (argv["dry-run"]) {
    console.log("Dry-run mode: not writing files.");
    console.log(latestJson);
    return 0;
  }

  // Ensure directory exists
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, latestJson, "utf-8");

  console.log("Wrote generated JSON.");

  if (argv.commit) {
    try {
      // Stage and commit changes
      execSync(`git add ${OUTPUT_PATH}`);
      const message = `chore: update instagram carousel (auto)`;
      const existingStatus = execSync("git status --porcelain").toString().trim();
      execSync(`git commit -m "${message}" || true`);
      execSync("git push");
      console.log("Committed and pushed changes.");
    } catch (err: any) {
      console.warn("Commit failed:", err?.message || err);
    }
  }

  return 0;
}

// Use ESM-friendly entrypoint guard
if ((import.meta as any).main) {
  run()
    .then((code) => process.exit(Number(code)))
    .catch((err) => {
      console.error(err);
      process.exit(2);
    });
}
