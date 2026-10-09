import { http, HttpResponse } from "msw";
import type {
  AdminBoardEntry,
  AdminBoardYear,
  BoardEntryFields,
  CreateBoardYearBody,
} from "@/types/members";
import { mockBoardEntries, mockBoardYears } from "../fixtures/members";

/**
 * Mock members API. Mirrors the backend: unpublished years are admin-only,
 * new entries go to the end of their tier, a tier change moves an entry to
 * the end of the new tier, and stale order saves get 409.
 */
let years: { startYear: number; published: boolean }[] = [];
let entries: AdminBoardEntry[] = [];
let nextID = 0;

export function resetMembersStore(): void {
  years = mockBoardYears.map((year) => ({ ...year }));
  entries = mockBoardEntries.map((entry) => ({ ...entry, roles: [...entry.roles] }));
  nextID = Math.max(...entries.map((entry) => entry.boardMemberID)) + 1;
}
resetMembersStore();

const now = () => new Date().toISOString().slice(0, 19);
const label = (startYear: number) =>
  `${String(startYear % 100).padStart(2, "0")}-${String((startYear + 1) % 100).padStart(2, "0")}`;

function yearEntries(startYear: number): AdminBoardEntry[] {
  return entries
    .filter((entry) => entry.startYear === startYear)
    .sort(
      (a, b) =>
        Number(a.tier === "member") - Number(b.tier === "member") ||
        a.position - b.position ||
        a.boardMemberID - b.boardMemberID
    );
}

function adminYear(startYear: number): AdminBoardYear {
  const year = years.find((y) => y.startYear === startYear)!;
  return { startYear, label: label(startYear), published: year.published, entries: yearEntries(startYear) };
}

const newestFirst = () => [...years].sort((a, b) => b.startYear - a.startYear);

function nextPosition(startYear: number, tier: AdminBoardEntry["tier"]): number {
  const positions = entries
    .filter((entry) => entry.startYear === startYear && entry.tier === tier)
    .map((entry) => entry.position);
  return positions.length ? Math.max(...positions) + 1 : 0;
}

const findYear = (param: string | readonly string[] | undefined) =>
  years.find((year) => year.startYear === Number(param));
const findEntry = (param: string | readonly string[] | undefined) =>
  entries.find((entry) => entry.boardMemberID === Number(param));

const unauthorized = () => HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
const notFound = (what: string) => HttpResponse.json({ error: `${what} not found` }, { status: 404 });
const conflict = (error: string) => HttpResponse.json({ error }, { status: 409 });

export const membersHandlers = [
  http.get("*/members/", () =>
    HttpResponse.json(
      newestFirst()
        .filter((year) => year.published)
        .map((year) => ({
          startYear: year.startYear,
          label: label(year.startYear),
          entries: yearEntries(year.startYear).map(
            ({ boardMemberID, name, major, classYear, roles, isLead, tier }) => ({
              boardMemberID, name, major, classYear, roles, isLead, tier,
            })
          ),
        }))
    )
  ),

  http.get("*/members/admin/", ({ request }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    return HttpResponse.json(newestFirst().map((year) => adminYear(year.startYear)));
  }),

  http.post("*/members/years/", async ({ request }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const { startYear, copyFrom } = (await request.json()) as CreateBoardYearBody;
    if (copyFrom !== undefined && !findYear(String(copyFrom))) {
      return HttpResponse.json({ error: "copyFrom board year not found" }, { status: 400 });
    }
    if (findYear(String(startYear))) return conflict("board year already exists");
    years.push({ startYear, published: false });
    if (copyFrom !== undefined) {
      yearEntries(copyFrom).forEach((entry) =>
        entries.push({
          ...entry,
          roles: [...entry.roles],
          boardMemberID: nextID++,
          startYear,
          created: now(),
          updated: now(),
        })
      );
    }
    return HttpResponse.json(adminYear(startYear), { status: 201 });
  }),

  http.post("*/members/years/:startYear/publish/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const year = findYear(params.startYear);
    if (!year) return notFound("board year");
    if (year.published) return conflict("board year is already published");
    year.published = true;
    return HttpResponse.json(adminYear(year.startYear));
  }),

  http.post("*/members/years/:startYear/unpublish/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const year = findYear(params.startYear);
    if (!year) return notFound("board year");
    if (!year.published) return conflict("board year is already unpublished");
    year.published = false;
    return HttpResponse.json(adminYear(year.startYear));
  }),

  http.delete("*/members/years/:startYear/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const year = findYear(params.startYear);
    if (!year) return notFound("board year");
    if (year.published) return conflict("unpublish the board year before deleting it");
    years = years.filter((y) => y !== year);
    entries = entries.filter((entry) => entry.startYear !== year.startYear);
    return HttpResponse.json({ message: "board year deleted" });
  }),

  http.put("*/members/years/:startYear/order/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const year = findYear(params.startYear);
    if (!year) return notFound("board year");
    const { order } = (await request.json()) as { order: number[] };
    const ids = yearEntries(year.startYear).map((entry) => entry.boardMemberID);
    const sameSet =
      order.length === new Set(order).size &&
      order.length === ids.length &&
      order.every((id) => ids.includes(id));
    if (!sameSet) return conflict("entries changed since this order was loaded");
    order.forEach((id, position) => {
      const entry = findEntry(String(id));
      if (entry) entry.position = position;
    });
    return HttpResponse.json(adminYear(year.startYear));
  }),

  http.post("*/members/years/:startYear/entries/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const year = findYear(params.startYear);
    if (!year) return notFound("board year");
    const body = (await request.json()) as BoardEntryFields;
    const entry: AdminBoardEntry = {
      ...body,
      boardMemberID: nextID++,
      startYear: year.startYear,
      position: nextPosition(year.startYear, body.tier),
      createdBy: "admin@umich.edu",
      updatedBy: "admin@umich.edu",
      created: now(),
      updated: now(),
    };
    entries.push(entry);
    return HttpResponse.json(entry, { status: 201 });
  }),

  http.put("*/members/entries/:id/", async ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const entry = findEntry(params.id);
    if (!entry) return notFound("board entry");
    const body = (await request.json()) as BoardEntryFields;
    const position =
      body.tier === entry.tier ? entry.position : nextPosition(entry.startYear, body.tier);
    Object.assign(entry, body, { position, updated: now() });
    return HttpResponse.json(entry);
  }),

  http.delete("*/members/entries/:id/", ({ request, params }) => {
    if (!request.headers.get("Authorization")) return unauthorized();
    const entry = findEntry(params.id);
    if (!entry) return notFound("board entry");
    entries = entries.filter((e) => e !== entry);
    return HttpResponse.json({ message: "board entry deleted" });
  }),
];
