import { http, HttpResponse } from "msw";
import {
  mockPochaMenus,
  mockPochas,
  type PochaRecord,
} from "../fixtures/pocha";
import { convertMenuByCategoryToRawList } from "@/features/pocha/utils/convertMenuType";
import type { MenuByCategory, MenuItemRaw } from "@/types/pocha";

/**
 * Module-level in-memory stores. Mutated by POST/PUT handlers and reset
 * by `resetPochaStore()` (called from `afterEach` in tests).
 *
 * `pochaStore` holds pocha info records (title, dates, etc.).
 * `menusStore` holds per-pocha raw menu lists, mutated by pocha PUT/POST so
 * the menu add/edit/delete UX inside `PochaFormDialog` round-trips through
 * MSW within a session (resets on page reload — no localStorage).
 */
let pochaStore: PochaRecord[] = [];
let menusStore: Record<number, MenuItemRaw[]> = {};
let nextId = 1;

function seed(): void {
  pochaStore = mockPochas.map((p) => ({
    ...p,
    startDate: new Date(p.startDate),
    endDate: new Date(p.endDate),
  }));
  const maxId = pochaStore.reduce((m, p) => Math.max(m, p.pochaID), 0);
  nextId = maxId + 1;
  menusStore = Object.fromEntries(
    Object.entries(mockPochaMenus).map(([id, byCategory]) => [
      Number(id),
      convertMenuByCategoryToRawList(byCategory),
    ])
  );
}

export function resetPochaStore(): void {
  seed();
}

// Initialize on module load.
seed();

/** Group a raw menu list back into the `MenuByCategory[]` response shape. */
function groupMenusByCategory(menus: MenuItemRaw[]): MenuByCategory[] {
  const groups = new Map<string, MenuItemRaw[]>();
  for (const m of menus) {
    const list = groups.get(m.category) ?? [];
    list.push(m);
    groups.set(m.category, list);
  }
  return Array.from(groups, ([category, menusList]) => ({
    category,
    menusList: menusList.map((m) => ({ ...m, category })),
  })) as MenuByCategory[];
}

export const pochaHandlers = [
  http.get(/\/pocha\/status-info\/?(\?.*)?$/, ({ request }) => {
    const url = new URL(request.url);
    const dateStr = url.searchParams.get("date");
    if (!dateStr) return HttpResponse.json({});
    const date = new Date(dateStr);
    const active = pochaStore.find(
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
    const previous = pochaStore.filter((p) => p.endDate.getTime() < date.getTime());
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
      menus?: MenuItemRaw[];
    };
    const created: PochaRecord = {
      pochaID: nextId++,
      title: body.title,
      description: body.description,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };
    pochaStore.push(created);
    menusStore[created.pochaID] = body.menus ?? [];
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
    const stored = menusStore[id];
    if (stored) {
      return HttpResponse.json(groupMenusByCategory(stored));
    }
    return HttpResponse.json(mockPochaMenus[id] ?? []);
  }),

  http.put(/\/pocha\/(\d+)\/?$/, async ({ request }) => {
    const url = new URL(request.url);
    const match = url.pathname.match(/\/pocha\/(\d+)\/?$/);
    const id = match ? Number(match[1]) : NaN;
    const idx = pochaStore.findIndex((p) => p.pochaID === id);
    if (idx === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    const body = (await request.json()) as {
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      menus?: MenuItemRaw[];
    };
    pochaStore[idx] = {
      ...pochaStore[idx],
      title: body.title,
      description: body.description,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    };
    if (body.menus) {
      menusStore[id] = body.menus;
    }
    return HttpResponse.json({
      pochaID: id,
      message: "Pocha updated",
    });
  }),
];
