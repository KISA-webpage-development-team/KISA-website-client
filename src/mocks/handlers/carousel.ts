import { http, HttpResponse } from "msw";
import type {
  AdminCarouselItem,
  CreateCarouselItemBody,
  UpdateCarouselItemBody,
} from "@/types/carousel";
import { compareByEndDateRule } from "@/features/carousel-admin/utils/endDateRule";
import { mockCarouselItems } from "../fixtures/carousel";

/**
 * Mock carousel API. Mirrors the backend: effective status (an item past its
 * end date reads as archive), end-date placement for created and restored
 * items, and 409 for a stale order save. Also stands in for the Cloudinary
 * upload/delete routes so mock mode never touches the real account.
 */
let store: AdminCarouselItem[] = [];
let nextID = 0;
const tempUploads = new Map<string, string>();

export function resetCarouselStore(): void {
  store = mockCarouselItems.map((item) => ({ ...item }));
  nextID = Math.max(...store.map((item) => item.carouselItemID)) + 1;
  tempUploads.clear();
}
resetCarouselStore();

const today = () => new Date().toLocaleDateString("en-CA");
const now = () => new Date().toISOString().slice(0, 19);

function storedStatus(item: AdminCarouselItem): "live" | "archive" {
  return item.archivedAt === null && item.position !== null ? "live" : "archive";
}

function effective(item: AdminCarouselItem): AdminCarouselItem {
  const expired = item.endDate !== null && item.endDate < today();
  const status = storedStatus(item) === "archive" || expired ? "archive" : "live";
  return { ...item, status };
}

function live(): AdminCarouselItem[] {
  return store
    .map(effective)
    .filter((item) => item.status === "live")
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}

function place(item: AdminCarouselItem): void {
  const others = live().filter((other) => other.carouselItemID !== item.carouselItemID);
  const index = others.findIndex((other) => compareByEndDateRule(item, other) < 0);
  others.splice(index === -1 ? others.length : index, 0, item);
  others.forEach((entry, position) => {
    const stored = store.find((s) => s.carouselItemID === entry.carouselItemID);
    if (stored) stored.position = position;
  });
}

function find(id: string | readonly string[] | undefined) {
  return store.find((item) => item.carouselItemID === Number(id));
}

const unauthorized = () =>
  HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
const notFound = () =>
  HttpResponse.json({ error: "carousel item not found" }, { status: 404 });

export const carouselHandlers = [
  http.get("*/carousel/", () =>
    HttpResponse.json(
      live().map(({ carouselItemID, title, description, link, imageUrl }) => ({
        carouselItemID,
        title,
        description,
        link,
        imageUrl,
      }))
    )
  ),

  http.get("*/carousel/admin/", ({ request }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const archive = store
      .map(effective)
      .filter((item) => item.status === "archive")
      .sort((a, b) =>
        (b.archivedAt ?? b.endDate ?? "").localeCompare(a.archivedAt ?? a.endDate ?? "")
      );
    return HttpResponse.json({ live: live(), archive });
  }),

  http.put("*/carousel/order/", async ({ request }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const { order } = (await request.json()) as { order: number[] };
    const liveIDs = live().map((item) => item.carouselItemID);
    const sameSet =
      order.length === new Set(order).size &&
      order.length === liveIDs.length &&
      order.every((id) => liveIDs.includes(id));
    if (!sameSet) {
      return HttpResponse.json(
        { error: "live items changed since this order was loaded" },
        { status: 409 }
      );
    }
    order.forEach((id, position) => {
      const item = find(String(id));
      if (item) item.position = position;
    });
    return HttpResponse.json(live());
  }),

  http.get("*/carousel/:id/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const item = find(params.id);
    return item ? HttpResponse.json(effective(item)) : notFound();
  }),

  http.post("*/carousel/", async ({ request }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const body = (await request.json()) as CreateCarouselItemBody;
    const source = "copyImageFrom" in body ? find(String(body.copyImageFrom)) : undefined;
    const imageUrl =
      "imageTempPublicID" in body
        ? tempUploads.get(body.imageTempPublicID) ?? "/kisa_logo_2026.png"
        : source?.imageUrl ?? "/kisa_logo_2026.png";
    const item: AdminCarouselItem = {
      carouselItemID: nextID++,
      title: body.title,
      description: body.description,
      link: body.link,
      imageUrl,
      endDate: body.endDate,
      status: "live",
      position: null,
      archivedAt: null,
      createdBy: "admin@umich.edu",
      updatedBy: "admin@umich.edu",
      created: now(),
      updated: now(),
    };
    store.push(item);
    place(item);
    return HttpResponse.json(effective(item), { status: 201 });
  }),

  http.put("*/carousel/:id/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const item = find(params.id);
    if (!item) return notFound();
    const body = (await request.json()) as UpdateCarouselItemBody;
    Object.assign(item, {
      title: body.title,
      description: body.description,
      link: body.link,
      endDate: body.endDate,
      updated: now(),
    });
    if (body.imageTempPublicID) {
      item.imageUrl = tempUploads.get(body.imageTempPublicID) ?? item.imageUrl;
    }
    return HttpResponse.json(effective(item));
  }),

  http.post("*/carousel/:id/archive/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const item = find(params.id);
    if (!item) return notFound();
    Object.assign(item, { position: null, archivedAt: now(), updated: now() });
    return HttpResponse.json(effective(item));
  }),

  http.post("*/carousel/:id/restore/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const item = find(params.id);
    if (!item) return notFound();
    const { endDate } = (await request.json()) as { endDate: string | null };
    Object.assign(item, { endDate, archivedAt: null, position: -1, updated: now() });
    place(item);
    return HttpResponse.json(effective(item));
  }),

  http.delete("*/carousel/:id/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const item = find(params.id);
    if (!item) return notFound();
    store = store.filter((entry) => entry !== item);
    return HttpResponse.json({ message: "carousel item removed" });
  }),

  http.post("*/api/upload-to-cloudinary", async ({ request }) => {
    const form = await request.formData();
    const file = form.get("file");
    const publicID = `temp/${form.get("public_id")}`;
    const url = file instanceof File ? URL.createObjectURL(file) : "/kisa_logo_2026.png";
    tempUploads.set(publicID, url);
    return HttpResponse.json({ secure_url: url, public_id: publicID });
  }),

  http.delete("*/api/delete-from-cloudinary", () =>
    HttpResponse.json({ result: "ok" })
  ),
];
