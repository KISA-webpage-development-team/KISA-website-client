import { pickImageUrl } from "./fetchPosts.ts";
import type { InstagramNode } from "./fetchPosts.ts";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

export interface CarouselItem {
  id: string;
  title: string; // short title (1 line)
  desc: string; // summary / 2-3 sentence description
  url: string; // Instagram post URL
  imageUrl?: string | null;
  takenAt?: string | null; // ISO (instagram post time)
  eventTakenAt?: string | null; // ISO (event time extracted from caption)
  type?: string | null;
  meta?: any;
}

export interface FormatOptions {
  titleMaxLength?: number;
  summarySentences?: number;
  useGemini?: boolean; // attempt to call Gemini if GEMINI_API_KEY is present
  defaultTimezone?: string; // for date normalization (default: UTC)
}

const DEFAULTS: Required<FormatOptions> = {
  titleMaxLength: 60,
  summarySentences: 2,
  useGemini: true,
  defaultTimezone: "UTC",
};

function sanitizeText(t?: string | null): string {
  if (!t) return "";
  return t.replace(/\s+/g, " ").trim();
}

export function extractTakenAt(node: InstagramNode): string | null {
  const ts = node.taken_at ?? node.caption?.created_at;
  if (!ts) return null;
  // The sample value looks like unix seconds
  const millis = ts > 1_000_000_000_000 ? ts : ts * 1000;
  try {
    return new Date(millis).toISOString();
  } catch (err) {
    return null;
  }
}

export function buildInstagramLink(code?: string | null): string | null {
  if (!code) return null;
  return `https://www.instagram.com/p/${code}/`;
}

// Event extraction: try Gemini (if configured), otherwise fallback to deterministic regex parsing
export function extractEventDateLocal(text: string): string | null {
  const clean = sanitizeText(text);
  if (!clean) return null;

  const now = new Date();

  // Helpers
  const monthNames: Record<string, number> = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sept: 8,
    sep: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  // 1) ISO-like: YYYY-MM-DD or YYYY/MM/DD
  const iso = clean.match(/\b(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]) - 1;
    const d = Number(iso[3]);
    const hh = iso[4] ? Number(iso[4]) : 0;
    const mm = iso[5] ? Number(iso[5]) : 0;
    const dt = new Date(Date.UTC(y, m, d, hh, mm, 0));
    return dt.toISOString();
  }

  // 2) MM/DD or MM/DD/YYYY
  const md = clean.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (md) {
    const month = Number(md[1]) - 1;
    const day = Number(md[2]);
    let year = md[3] ? Number(md[3]) : now.getUTCFullYear();
    if (String(year).length === 2) year += 2000;
    let dt = new Date(Date.UTC(year, month, day, 0, 0, 0));

    // If the date is far in the past (> 180 days), assume next year
    const diffDays = (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 180) {
      dt = new Date(Date.UTC(year + 1, month, day, 0, 0, 0));
    }

    return dt.toISOString();
  }

  // 3) Month name variants: e.g., January 3 or Jan 3rd, optional year
  const mname = clean.match(/\b(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sept|Sep|October|Oct|November|Nov|December|Dec)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?\b/i);
  if (mname) {
    const monthText = mname[1].toLowerCase();
    const month = monthNames[monthText] ?? 0;
    const day = Number(mname[2]);
    const year = mname[3] ? Number(mname[3]) : now.getUTCFullYear();
    let dt = new Date(Date.UTC(year, month, day, 0, 0, 0));
    const diffDays = (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 180) dt = new Date(Date.UTC(year + 1, month, day, 0, 0, 0));
    return dt.toISOString();
  }

  return null;
}

export async function extractEventDate(text: string, useGemini = true): Promise<string | null> {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (useGemini && geminiKey) {
    // TODO: implement actual Gemini call to extract a date/time from caption and return ISO.
    // For now, we fallback to the local deterministic extractor.
  }

  return extractEventDateLocal(text);
}

// Local deterministic fallback summary: split into sentences and pick first N
export function extractSummaryLocal(text: string, sentences = 2): { title: string; summary: string } {
  const clean = sanitizeText(text);
  if (!clean) return { title: "Instagram", summary: "" };

  // Split on punctuation that looks like sentence boundaries
  const parts = clean.split(/(?<=[.!?])\s+/);
  const first = parts[0] || clean;
  const summaryParts = parts.slice(0, sentences);
  const summary = summaryParts.join(" ");

  // Derive a title from the first sentence, clip
  const rawTitle = first.replace(/\s+/g, " ").trim();

  return { title: rawTitle, summary };
}

/**
 * Placeholder Gemini summarizer. If GEMINI_API_KEY is set, this function should be
 * implemented to call the model and return { title, summary }.
 *
 * For now: if useGemini is true and no key present, we fall back to local extraction.
 */
export async function summarizeCaption(
  caption: string,
  opts: { sentences: number; useGemini: boolean } = { sentences: 2, useGemini: true }
): Promise<{ title: string; summary: string }> {
  const { sentences, useGemini } = opts;

  // If the caller asked for Gemini but we don't have a key, fall back gracefully
  const geminiKey = process.env.GEMINI_API_KEY;
  if (useGemini && geminiKey) {
    // TODO: Implement a proper Gemini/OpenAI client request here.
    // The implementation depends on the SDK / endpoint you choose.
    // Example (high level): send a prompt like "Summarize the following caption in 2-3 sentences and also give a 6-10 word title." and parse the response.

    // For now, we'll use the local fallback until the key + client are configured.
    // This keeps behavior deterministic for unit tests and local development.
  }

  return extractSummaryLocal(caption, sentences);
}

export async function formatNodeToCarouselItem(
  node: InstagramNode,
  options?: FormatOptions
): Promise<CarouselItem> {
  const opts: Required<FormatOptions> = { ...DEFAULTS, ...(options || {}) };

  const captionText = sanitizeText(node.caption?.text ?? "");

  const { title, summary } = await summarizeCaption(captionText, {
    sentences: opts.summarySentences,
    useGemini: opts.useGemini,
  });

  // Clip title to max length
  const clippedTitle = title.length > opts.titleMaxLength ? title.slice(0, opts.titleMaxLength).trim() + "…" : title;

  const takenAt = extractTakenAt(node);
  const eventTakenAt = await extractEventDate(captionText, opts.useGemini);

  const imageUrl = pickImageUrl(node);
  const link = buildInstagramLink(node.code ?? null) ?? "#";

  const item: CarouselItem = {
    id: node.id ?? node.pk ?? `instagram_${node.code ?? Math.random().toString(36).slice(2, 8)}`,
    title: clippedTitle || "Instagram",
    desc: summary || "",
    url: link,
    imageUrl,
    takenAt,
    eventTakenAt,
    type: node.product_type ?? (node.media_type ? String(node.media_type) : null),
    meta: node,
  };

  return item;
}


export async function formatPosts(nodes: InstagramNode[], options?: FormatOptions): Promise<CarouselItem[]> {
  const opts = { ...DEFAULTS, ...(options || {}) };

  // Map to items in sequence (newest -> oldest if nodes are in that order from API)
  const items = await Promise.all(nodes.map((n) => formatNodeToCarouselItem(n, opts)));

  // Ensure deterministic ordering with event date preference:
  // - items with eventTakenAt come first, sorted by eventTakenAt ascending (soonest first)
  // - items without eventTakenAt fall back to instagram takenAt desc
  items.sort((a, b) => {
    if (a.eventTakenAt && b.eventTakenAt) return a.eventTakenAt.localeCompare(b.eventTakenAt);
    if (a.eventTakenAt && !b.eventTakenAt) return -1;
    if (!a.eventTakenAt && b.eventTakenAt) return 1;

    if (a.takenAt && b.takenAt) return b.takenAt.localeCompare(a.takenAt);
    if (a.takenAt) return -1;
    if (b.takenAt) return 1;

    return a.id.localeCompare(b.id);
  });

  return items;
}

// If run directly for quick manual formatting demo
if ((import.meta as any).main) {
  (async () => {
    // simple demo that reads a local JSON sample (if provided) — for manual testing only
    const samplePath = process.argv[2];
    if (!samplePath) {
      console.log("Usage: node formatPosts.js <sample.json>");
      process.exit(1);
    }

    const raw = fs.readFileSync(samplePath, "utf-8");
    const sample = JSON.parse(raw);
    const nodes: InstagramNode[] = sample?.result?.edges?.map((e: any) => e.node) || [];
    const formatted = await formatPosts(nodes, { useGemini: false });
    console.log(JSON.stringify(formatted.slice(0, 6), null, 2));
  })();
}
