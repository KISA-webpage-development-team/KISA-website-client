#!/usr/bin/env ts-node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fetchPosts } from "./fetchPosts.ts";
import { formatPosts } from "./formatPosts.ts";
import type { CarouselItem } from "./formatPosts.ts";
import { fileURLToPath } from 'url';

import yargs from "yargs";

const argv = yargs(process.argv)
  .option("username", { type: "string", default: "kisa_michigan" })
  .option("maxId", { type: "string", default: "0" })
  .option("dry-run", { type: "boolean", default: false })
  .option("commit", { type: "boolean", default: false })
  .option("output", {
    type: "string",
    default: "src/features/home/data/instagramCarousel.generated.json",
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

async function run() {
  console.log("Fetching recent posts for", argv.username);
  const nodes = await fetchPosts(String(argv.username), {
    maxId: String(argv.maxId),
  });
  console.log(`Fetched ${nodes.length} nodes`);

  const items = await formatPosts(nodes, {
    useLLM: Boolean(process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY),
  });

  const existing = readExisting();

  const latestJson = JSON.stringify(items, null, 2);
  const existingJson = JSON.stringify(existing, null, 2);

  const contentsChanged = latestJson !== existingJson;

  if (!contentsChanged) {
    console.log("No changes detected. Exiting.");
    return 0;
  }

  console.log(
    "Changes detected. Writing generated file to",
    OUTPUT_PATH
  );

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
      execSync(`git commit -m "${message}" || true`);
      execSync("git push");
      console.log("Committed and pushed changes.");
    } catch (err: any) {
      console.warn("Commit failed:", err?.message || err);
    }
  }

  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  run()
    .then((code) => process.exit(Number(code)))
    .catch((err) => {
      console.error(err);
      process.exit(2);
    });
}
