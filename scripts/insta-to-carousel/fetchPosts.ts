import axios from "axios";
import type { AxiosInstance } from "axios";

import dotenv from "dotenv";
import { fileURLToPath } from "url";
dotenv.config({ path: ".env.local" });
dotenv.config();

export interface ImageCandidate {
  url: string;
  width?: number;
  height?: number;
  filename?: string;
}

export interface InstagramNode {
  id: string;
  pk?: string;
  code?: string;
  taken_at?: number;
  media_type?: number;
  product_type?: string;
  caption?: { text?: string; created_at?: number } | null;
  image_versions2?: { candidates?: ImageCandidate[] } | null;
  [k: string]: any; // keep other fields available
}

export interface FetchPostsOptions {
  maxId?: string;
  host?: string; // override RapidAPI host
  timeoutMs?: number;
  retries?: number;
}

const DEFAULT_HOST =
  process.env.RAPIDAPI_INSTAGRAM_HOST || "instagram120.p.rapidapi.com";
const DEFAULT_TIMEOUT = 15_000;
const DEFAULT_RETRIES = 3;

/**
 * Build an Axios client for RapidAPI Instagram endpoint.
 * @returns AxiosInstance
 */
function buildClient(
  host = DEFAULT_HOST,
  timeout = DEFAULT_TIMEOUT
): AxiosInstance {
  const key = process.env.RAPIDAPI_INSTAGRAM_KEY || "";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (host) headers["x-rapidapi-host"] = host;
  if (key) headers["x-rapidapi-key"] = key;

  return axios.create({
    baseURL: `https://${host}`,
    timeout,
    headers,
  });
}

/**
 * Fetch recent posts for a given username from RapidAPI Instagram endpoint.
 *
 * Notes:
 * - Uses env vars RAPIDAPI_INSTAGRAM_KEY and RAPIDAPI_HOST by default.
 * - The endpoint returns { result: { edges: [{ node }] } } in the tested API.
 *
 * @returns Array of InstagramNode
 */
export async function fetchPosts(
  username: string,
  options: FetchPostsOptions = {}
): Promise<InstagramNode[]> {
  if (!username) throw new Error("username is required");

  const host = options.host || DEFAULT_HOST;
  const timeout = options.timeoutMs ?? DEFAULT_TIMEOUT;
  const retries = options.retries ?? DEFAULT_RETRIES;

  // instagram API client
  const client = buildClient(host, timeout);

  // NOTE: not sure what is `maxId` here,
  // using "0" will returns "some" number of recent posts
  const payload = {
    username,
    maxId: options.maxId ?? "0",
  };

  let attempt = 0;
  let lastErr: any = null;

  while (attempt <= retries) {
    try {
      const res = await client.post("/api/instagram/posts", payload);

      if (!res || !res.data) throw new Error("Empty response from API");

      const edges = res.data?.result?.edges;
      if (!Array.isArray(edges)) {
        throw new Error("Unexpected response shape: missing result.edges");
      }

      const nodes: InstagramNode[] = edges
        .map((e: any) => e.node)
        .filter(Boolean);
      return nodes;
    } catch (err: any) {
      lastErr = err;
      attempt += 1;

      // Respect 429s with a longer backoff
      const status = err?.response?.status;
      const waitMs = Math.min(2000 * 2 ** attempt, 30_000);

      if (attempt > retries) break;

      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }

  throw new Error(
    `fetchPosts failed after ${retries} retries: ${lastErr?.message || lastErr}`
  );
}

// Helper: pick the best image URL candidate (prefer width >= 720 and closest to 2:3 aspect ratio, else closest to 2:3, else largest by width)
export function pickImageUrl(node: InstagramNode): string | null {
  const candidates = node?.image_versions2?.candidates || [];
  if (!candidates.length) return null;

  const targetRatio = 2 / 3;

  function getRatio(c: ImageCandidate): number | null {
    if (c.width && c.height && c.width > 0) {
      return c.height / c.width;
    }
    return null;
  }

  function findClosestToRatio(candidates: ImageCandidate[], minWidth?: number): ImageCandidate | null {
    let filtered = candidates;
    if (minWidth !== undefined) {
      filtered = candidates.filter(c => (c.width ?? 0) >= minWidth);
    }
    if (!filtered.length) return null;

    let closest: ImageCandidate | null = null;
    let minDiff = Infinity;
    for (const c of filtered) {
      const ratio = getRatio(c);
      if (ratio !== null) {
        const diff = Math.abs(ratio - targetRatio);
        if (diff < minDiff) {
          minDiff = diff;
          closest = c;
        }
      }
    }
    return closest;
  }

  // Prefer candidate with width >= 720 and closest to 2:3 ratio
  let selected = findClosestToRatio(candidates, 720);
  if (selected) return selected.url;

  // Otherwise, among all, closest to 2:3
  selected = findClosestToRatio(candidates);
  if (selected) return selected.url;

  // Otherwise pick largest by width
  const largest = candidates.reduce((acc, cur) => {
    if (!acc || (cur.width ?? 0) > (acc.width ?? 0)) return cur;
    return acc;
  }, candidates[0]);

  return largest?.url ?? null;
}

// If run directly, a small CLI for quick manual testing (no secrets logged)
// Use `import.meta.main` in Node ESM; cast to `any` so TypeScript compiles.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  (async () => {
    const username = process.argv[2] || "kisa_michigan";
    try {
      const nodes = await fetchPosts(username, { maxId: "0", retries: 2 });
      console.log(`fetched ${nodes.length} nodes`);

      // Print a compact preview
      nodes.slice(0, 5).forEach((n, i) => {
        console.log(i + 1, {
          id: n.id ?? n.pk,
          code: n.code,
          taken_at: n.taken_at ?? n.caption?.created_at,
        });
      });
    } catch (err: any) {
      // Keep the error compact to avoid leaking secrets
      console.error("fetchPosts failed:", err?.message ?? err);
      process.exit(2);
    }
  })();
}
