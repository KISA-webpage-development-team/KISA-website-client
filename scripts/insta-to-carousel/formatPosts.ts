import { pickImageUrl } from "./fetchPosts.ts";
import type { InstagramNode } from "./fetchPosts.ts";
import fs from "fs";
import dotenv from "dotenv";
import OpenAI from "openai";
import { fileURLToPath } from "url";
dotenv.config({ path: ".env.local" });
dotenv.config();

export interface CarouselItem {
  id: string;
  title: string; // short title (1 line)
  desc: string; // summary / 2-3 sentence description
  url: string; // Instagram post URL
  imageUrl?: string | null;
  takenAt?: string | null; // ISO (instagram post time)
  eventEndDate?: string | null; // ISO (event end time extracted from caption)
  type?: string | null;
  meta?: any;
}

export interface FormatOptions {
  titleMaxLength?: number;
  useLLM?: boolean; // attempt to call Gemini if GEMINI_API_KEY is present
  defaultTimezone?: string; // for date normalization (default: UTC)
}

const DEFAULTS: Required<FormatOptions> = {
  titleMaxLength: 60,
  useLLM: true,
  defaultTimezone: "UTC",
};

function sanitizeText(t?: string | null): string {
  if (!t) return "";
  return t.replace(/\s+/g, " ").trim();
}

export function buildInstagramLink(code?: string | null): string | null {
  if (!code) return null;
  return `https://www.instagram.com/p/${code}/`;
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
  const iso = clean.match(
    /\b(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/
  );
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
  const mname = clean.match(
    /\b(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sept|Sep|October|Oct|November|Nov|December|Dec)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?\b/i
  );
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

// Local deterministic fallback summary: split into sentences and pick first 2.
export function extractSummaryLocal(text: string): {
  title: string;
  summary: string;
} {
  const clean = sanitizeText(text);
  if (!clean) return { title: "Instagram", summary: "" };

  // Split on punctuation that looks like sentence boundaries
  const parts = clean.split(/(?<=[.!?])\s+/);
  const first = parts[0] || clean;
  // Pick first 2 sentences for summary
  const summaryParts = parts.slice(0, 2);
  const summary = summaryParts.join(" ");

  // Derive a title from the first sentence, clip
  const rawTitle = first.replace(/\s+/g, " ").trim();

  return { title: rawTitle, summary };
}

/**
 * Uses LLM to extract event end date, title, and summary in one call.
 */
async function llmExtract(
  takenAt: string,
  caption: string
): Promise<{ eventEndDate: string | null; title: string; summary: string }> {
  const openai = new OpenAI();
  const prompt = `You are processing Instagram posts from the University of Michigan Korean International Student Association (KISA). These posts are about self-hosted events, which can be one-day events, multi-day events, or semester-long activities. Most posts are in Korean.

Extract the event end date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ) if mentioned. 
Here are few tips for date extraction (order of importance):
1. Be aware that the post is taken at ${takenAt}, so end date is very probably on or after this date (BUT NOT ALWAYS).
2. If no date is mentioned, YOU MUST infer it based on context (e.g., "next Saturday" or "this Friday"). DON'T LEAVE IT null EVEN IF NO DATE IS EXPLICITLY MENTIONED.
3. BUT There are few exceptions that the post is not about an event (e.g. PR 팀 소개, OP 팀 소개); in that case, YOU MUST return null for eventEndDate.
4. Caption may include texts that refers to the semester (e.g. W26). In such cases, infer the event date based on the semester. For example if the event is for W26, assume the event end date is between January 2026 and May 2026.

Provide a short title and a summary in 2-3 sentences in Korean.

Examples:
- Post about a year-end party: {"eventEndDate": "2025-12-20T23:59:59.999Z", "title": "KISA 종강포차", "summary": "드디어 연말이 다가오고 있습니다! 학기말 시험과 과제를 잠시 내려놓고 즐거운 토요일에 함께 놀고 마시자. 소주 첫 50병을 $15에서 $10으로 할인 판매하며, Total Wireless 후원으로 특별한 밤을 보낼 수 있다."}
- Post about a yearbook project: {"eventEndDate": "2026-04-15T23:59:59.999Z", "title": "KISA Yearbook 2025-26", "summary": "미시간 졸업예정자 여러분, 여러분의 이야기로 채워질 Yearbook의 주인공이 되어주세요. 미시간에서의 소중한 추억과 경험을 담은 앨범 프로젝트로, 서로의 이야기를 나누는 의미 있는 여정을 함께하자."}

Return only valid JSON: {"eventEndDate": "ISO string", "title": "short title here", "summary": "summary here"}. Caption: ${caption}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const text = completion.choices[0].message.content?.trim() || "";
  const parsed = JSON.parse(text);

  return {
    eventEndDate: parsed.eventEndDate,
    title: parsed.title,
    summary: parsed.summary,
  };
}

export async function formatPosts(
  nodes: InstagramNode[],
  options?: FormatOptions
): Promise<CarouselItem[]> {
  const opts = { ...DEFAULTS, ...(options || {}) };
  const now = new Date();
  const items: CarouselItem[] = [];

  for (const n of nodes) {
    const captionText = sanitizeText(n.caption?.text ?? "");

    // First, check with local extraction if it's a past event
    const localEventEndDate = extractEventDateLocal(captionText);

    if (localEventEndDate && new Date(localEventEndDate) <= now) {
      // Past event, skip to minimize API calls
      continue;
    }
    // Future or no date, process
    let eventEndDate: string | null = localEventEndDate;
    let title: string = "Instagram";
    let summary: string = "";

    const takenAt = extractTakenAt(n);

    if (opts.useLLM) {
      try {
        const llmResult = await llmExtract(takenAt, captionText);
        eventEndDate = llmResult.eventEndDate || eventEndDate;
        title = llmResult.title;
        summary = llmResult.summary;
      } catch (error) {
        console.warn("LLM extraction failed, falling back to local:", error);
        const local = extractSummaryLocal(captionText);
        title = local.title;
        summary = local.summary;
      }
    } else {
      const local = extractSummaryLocal(captionText);
      title = local.title;
      summary = local.summary;
    }

    // Clip title to max length
    const clippedTitle =
      title.length > opts.titleMaxLength
        ? title.slice(0, opts.titleMaxLength).trim() + "…"
        : title;

    const imageUrl = pickImageUrl(n);
    const link = buildInstagramLink(n.code ?? null) ?? "#";

    const item: CarouselItem = {
      id: `llm-collected_instagram_${
        n.code ?? Math.random().toString(36).slice(2, 8)
      }`,
      title: clippedTitle || "Instagram",
      desc: summary || "",
      url: link,
      imageUrl,
      takenAt,
      eventEndDate,
      type: n.product_type ?? (n.media_type ? String(n.media_type) : null),
      meta: n,
    };

    items.push(item);
  }

  // Additional filter in case LLM provided a past date
  const filteredItems = items.filter(
    (item) => item.eventEndDate && new Date(item.eventEndDate) > now
  );

  // Ensure deterministic ordering with event date preference:
  // - items with eventEndDate come first, sorted by eventEndDate ascending (soonest first)
  // - items without eventEndDate fall back to instagram takenAt desc
  filteredItems.sort((a, b) => {
    if (a.eventEndDate && b.eventEndDate)
      return a.eventEndDate.localeCompare(b.eventEndDate);
    if (a.eventEndDate && !b.eventEndDate) return -1;
    if (!a.eventEndDate && b.eventEndDate) return 1;

    if (a.takenAt && b.takenAt) return b.takenAt.localeCompare(a.takenAt);
    if (a.takenAt) return -1;
    if (b.takenAt) return 1;

    return a.id.localeCompare(b.id);
  });

  return filteredItems;
}

// If run directly for quick manual formatting demo
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    // simple demo that reads a local JSON sample (if provided) — for manual testing only
    const samplePath = process.argv[2];
    if (!samplePath) {
      console.log("Usage: node formatPosts.js <sample.json>");
      process.exit(1);
    }

    const raw = fs.readFileSync(samplePath, "utf-8");
    const sample = JSON.parse(raw);
    const nodes: InstagramNode[] =
      sample?.result?.edges?.map((e: any) => e.node) || [];
    const formatted = await formatPosts(nodes, { useLLM: false });
    console.log(JSON.stringify(formatted.slice(0, 6), null, 2));
  })();
}
