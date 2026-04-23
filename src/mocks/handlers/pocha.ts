import { http, HttpResponse } from "msw";
import {
  mockPochaMenus,
  mockPochas,
  type PochaRecord,
} from "../fixtures/pocha";

/**
 * Module-level in-memory store. Mutated by POST/PUT handlers and reset
 * by `resetPochaStore()` (called from `afterEach` in tests).
 */
let store: PochaRecord[] = [];
let nextId = 1;

function seed(): void {
  store = mockPochas.map((p) => ({
    ...p,
    startDate: new Date(p.startDate),
    endDate: new Date(p.endDate),
  }));
  const maxId = store.reduce((m, p) => Math.max(m, p.pochaID), 0);
  nextId = maxId + 1;
}

export function resetPochaStore(): void {
  seed();
}

// Initialize on module load.
seed();

export const pochaHandlers = [
  http.get(/\/pocha\/status-info\/?(\?.*)?$/, ({ request }) => {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get("date");
    if (!dateStr) return HttpResponse.json({});
    const date = new Date(dateStr);
    const active = store.find(
      (p) => p.startDate.getTime() <= date.getTime() && date.getTime() <= p.endDate.getTime()
    );
    if (!active) return HttpResponse.json({});
    return HttpResponse.json(active);
  }),

  http.get(/\/pocha\/previous\/?(\?.*)?$/, ({ request }) => {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get("date");
    if (!dateStr) return HttpResponse.json([]);
    const date = new Date(dateStr);
    const previous = store.filter((p) => p.endDate.getTime() < date.getTime());
    return HttpResponse.json(previous);
  }),

  http.post(/\/pocha\/?$/, async ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = (await request.json()) as {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
    };
    const created: PochaRecord = {
      pochaID: nextId++,
      title: body.title,
      description: body.description,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };
    store.push(created);
    return HttpResponse.json({
      pochaID: created.pochaID,
      message: "Pocha created",
    });
  }),

  http.get(/\/pocha\/menu\/(\d+)\/?$/, ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(request.url);
    const match = url.pathname.match(/\/pocha\/menu\/(\d+)\/?$/);
    const id = match ? Number(match[1]) : NaN;
    return HttpResponse.json(mockPochaMenus[id] ?? []);
  }),

  http.put(/\/pocha\/(\d+)\/?$/, async ({ request }) => {
    const url = new URL(request.url);
    const match = url.pathname.match(/\/pocha\/(\d+)\/?$/);
    const id = match ? Number(match[1]) : NaN;
    const idx = store.findIndex((p) => p.pochaID === id);
    if (idx === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    const body = (await request.json()) as {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
    };
    store[idx] = {
      ...store[idx],
      title: body.title,
      description: body.description,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };
    return HttpResponse.json({
      pochaID: id,
      message: "Pocha updated",
    });
  }),
];
