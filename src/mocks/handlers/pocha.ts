import { http, HttpResponse } from "msw";
import {
  mockOrderItemIDStart,
  mockOrderItems,
  mockPochaMenus,
  mockPochas,
  type PochaRecord,
} from "../fixtures/pocha";
import { convertMenuByCategoryToRawList } from "@/features/pocha/utils/convertMenuType";
import type {
  MenuByCategory,
  MenuItem,
  MenuItemRaw,
  OrderItem,
} from "@/types/pocha";

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

/**
 * Active pocha for dashboard handlers. Hard-coded to 1 (matches the active
 * fixture) — dashboard handlers route by pochaID in the URL but the order
 * store is keyed flat for simplicity.
 */
const ACTIVE_DASHBOARD_POCHA_ID = 1;
let orderItemStore: OrderItem[] = [];
let nextOrderItemID = mockOrderItemIDStart + mockOrderItems.length;

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

function seedOrders(): void {
  // Deep-clone so test mutations to embedded `menu` don't bleed into fixtures.
  orderItemStore = mockOrderItems.map((o) => ({
    ...o,
    menu: { ...o.menu },
  }));
  nextOrderItemID = mockOrderItemIDStart + mockOrderItems.length;
}

export function resetPochaStore(): void {
  seed();
}

export function resetOrderStore(): void {
  seedOrders();
}

// Initialize on module load.
seed();
seedOrders();

/**
 * State machine helper — mirrors backend
 * `KISA-website-server/server/api/pocha/dashboard.py:202-216` exactly.
 *   food (isImmediatePrep=false): pending → preparing → ready → closed
 *   drink (isImmediatePrep=true):  pending → ready → closed (skips preparing)
 * Returns `null` for items already at `closed` (handler maps to 400).
 */
type StatusLiteral = "pending" | "preparing" | "ready" | "closed";
function nextStatus(item: OrderItem): StatusLiteral | null {
  const s = item.status as unknown as StatusLiteral;
  if (s === "closed") return null;
  if (s === "pending") return item.menu.isImmediatePrep ? "ready" : "preparing";
  if (s === "preparing") return "ready";
  if (s === "ready") return "closed";
  return null;
}

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

  // --- Dashboard: active orders -------------------------------------------
  http.get(/\/pocha\/dashboard\/(\d+)\/?$/, ({ request }) => {
    if (!request.headers.get("Authorization")) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const active = orderItemStore.filter((o) => o.status !== "closed");
    return HttpResponse.json({
      pending: active.filter((o) => o.status === "pending"),
      preparing: active.filter((o) => o.status === "preparing"),
      ready: active.filter((o) => o.status === "ready"),
    });
  }),

  // --- Dashboard: closed orders -------------------------------------------
  http.get(/\/pocha\/dashboard\/(\d+)\/closed\/?$/, ({ request }) => {
    if (!request.headers.get("Authorization")) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({
      closed: orderItemStore.filter((o) => o.status === "closed"),
    });
  }),

  // --- Dashboard: change order status -------------------------------------
  http.put(/\/pocha\/dashboard\/(\d+)\/change-status\/?$/, ({ request }) => {
    const url = new URL(request.url);
    const m = url.pathname.match(/\/pocha\/dashboard\/(\d+)\/change-status\/?$/);
    const id = m ? Number(m[1]) : NaN;
    const item = orderItemStore.find((o) => o.orderItemID === id);
    if (!item) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }
    const next = nextStatus(item);
    if (next === null) {
      return HttpResponse.json(
        { error: "Order item already closed" },
        { status: 400 }
      );
    }
    item.status = next as unknown as OrderItem["status"];
    return HttpResponse.json({ newStatus: next });
  }),

  // --- Dashboard: change menu stock ---------------------------------------
  http.put(/\/pocha\/dashboard\/change-stock\/?$/, async ({ request }) => {
    const body = (await request.json()) as { menuID: number; quantity: number };
    if (typeof body.quantity !== "number" || body.quantity < 0) {
      return HttpResponse.json(
        { error: "quantity must be a non-negative number" },
        { status: 400 }
      );
    }
    for (const list of Object.values(menusStore)) {
      const target = list.find((m) => m.menuID === body.menuID);
      if (target) {
        target.stock = body.quantity;
        return HttpResponse.json({
          ok: true,
          menuID: body.menuID,
          quantity: body.quantity,
        });
      }
    }
    return HttpResponse.json({ error: "Menu not found" }, { status: 404 });
  }),

  // --- Mock-only: spawn a random order ------------------------------------
  http.post(
    /\/pocha\/_mock\/spawn-order\/(\d+)\/?$/,
    ({ request }) => {
      const url = new URL(request.url);
      const m = url.pathname.match(/\/pocha\/_mock\/spawn-order\/(\d+)\/?$/);
      const pochaID = m ? Number(m[1]) : ACTIVE_DASHBOARD_POCHA_ID;
      const menus = menusStore[pochaID] ?? [];
      const stocked = menus.filter((mi) => (mi.stock ?? 0) > 0);
      if (stocked.length === 0) {
        return HttpResponse.json(
          { error: "All menu items out of stock" },
          { status: 409 }
        );
      }
      const picked = stocked[Math.floor(Math.random() * stocked.length)]!;
      const quantity = Math.min(
        picked.stock ?? 1,
        1 + Math.floor(Math.random() * 3)
      );
      picked.stock = (picked.stock ?? 0) - quantity;

      const orderers = [
        { name: "민수", email: "minsoo@umich.edu" },
        { name: "지영", email: "jiyoung@umich.edu" },
        { name: "현우", email: "hyunwoo@umich.edu" },
        { name: "수진", email: "sujin@umich.edu" },
        { name: "도윤", email: "doyoon@umich.edu" },
      ];
      const orderer = orderers[Math.floor(Math.random() * orderers.length)]!;
      // Ensure the embedded `menu` is a fully-typed MenuItem (menuID required).
      const menu: MenuItem = {
        ...picked,
        menuID: picked.menuID!,
      };
      const newItem: OrderItem = {
        orderItemID: nextOrderItemID++,
        status: "pending" as unknown as OrderItem["status"],
        menu,
        quantity,
        ordererName: orderer.name,
        ordererEmail: orderer.email,
      };
      orderItemStore.push(newItem);
      return HttpResponse.json(newItem);
    }
  ),
];
