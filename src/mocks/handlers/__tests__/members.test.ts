import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import type { AdminBoardYear, BoardYear } from "@/types/members";
import { membersHandlers, resetMembersStore } from "../members";

const server = setupServer(...membersHandlers);
const BASE = "http://localhost/_mock-api";
const AUTH = { Authorization: "Bearer mock-access-token", "Content-Type": "application/json" };

const publicYears = async () =>
  (await (await fetch(`${BASE}/members/`)).json()) as BoardYear[];
const adminYears = async () =>
  (await (await fetch(`${BASE}/members/admin/`, { headers: AUTH })).json()) as AdminBoardYear[];
const names = (year: { entries: { name: string }[] }) => year.entries.map((e) => e.name);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => resetMembersStore());
afterAll(() => server.close());

describe("members mock handlers", () => {
  it("lists only published years, newest first, presidents first", async () => {
    const years = await publicYears();
    expect(years.map((y) => y.label)).toEqual(["25-26", "24-25"]);
    expect(years[0].entries.slice(0, 2).map((e) => e.tier)).toEqual(["president", "president"]);
    expect(Object.keys(years[0].entries[0]).sort()).toEqual(
      ["boardMemberID", "classYear", "isLead", "major", "name", "roles", "tier"]
    );
  });

  it("creates a year copied from another as an unpublished draft", async () => {
    const response = await fetch(`${BASE}/members/years/`, {
      method: "POST",
      headers: AUTH,
      body: JSON.stringify({ startYear: 2027, copyFrom: 2025 }),
    });
    expect(response.status).toBe(201);
    const year = (await response.json()) as AdminBoardYear;
    expect(year.published).toBe(false);
    expect(year.label).toBe("27-28");
    expect(names(year)).toEqual(names((await adminYears()).find((y) => y.startYear === 2025)!));

    const again = await fetch(`${BASE}/members/years/`, {
      method: "POST",
      headers: AUTH,
      body: JSON.stringify({ startYear: 2027 }),
    });
    expect(again.status).toBe(409);
  });

  it("publishes, unpublishes, and deletes only unpublished years", async () => {
    const published = await fetch(`${BASE}/members/years/2026/publish/`, { method: "POST", headers: AUTH });
    expect(published.status).toBe(200);
    expect((await publicYears())[0].label).toBe("26-27");

    const blocked = await fetch(`${BASE}/members/years/2026/`, { method: "DELETE", headers: AUTH });
    expect(blocked.status).toBe(409);

    await fetch(`${BASE}/members/years/2026/unpublish/`, { method: "POST", headers: AUTH });
    const deleted = await fetch(`${BASE}/members/years/2026/`, { method: "DELETE", headers: AUTH });
    expect(deleted.status).toBe(200);
    expect((await adminYears()).map((y) => y.startYear)).toEqual([2025, 2024]);
  });

  it("adds entries at the end of their tier and moves tier changes to the end", async () => {
    const created = await fetch(`${BASE}/members/years/2025/entries/`, {
      method: "POST",
      headers: AUTH,
      body: JSON.stringify({
        name: "New", major: "CS", classYear: 2029, roles: ["Design"], isLead: false, tier: "president",
      }),
    });
    expect(created.status).toBe(201);
    const year = (await adminYears()).find((y) => y.startYear === 2025)!;
    expect(names(year).slice(0, 3)).toEqual(["Jin Wook Shin", "Jisang Um", "New"]);

    const member = year.entries.find((e) => e.name === "Seungmin Shin")!;
    await fetch(`${BASE}/members/entries/${member.boardMemberID}/`, {
      method: "PUT",
      headers: AUTH,
      body: JSON.stringify({ ...member, tier: "president" }),
    });
    const after = (await adminYears()).find((y) => y.startYear === 2025)!;
    expect(names(after).slice(0, 4)).toEqual(["Jin Wook Shin", "Jisang Um", "New", "Seungmin Shin"]);
  });

  it("saves an order and rejects a stale one with 409", async () => {
    const year = (await adminYears()).find((y) => y.startYear === 2024)!;
    const ids = year.entries.map((e) => e.boardMemberID);

    const saved = await fetch(`${BASE}/members/years/2024/order/`, {
      method: "PUT",
      headers: AUTH,
      body: JSON.stringify({ order: [ids[1], ids[0], ids[2]] }),
    });
    expect(names((await saved.json()) as AdminBoardYear)).toEqual([
      year.entries[1].name, year.entries[0].name, year.entries[2].name,
    ]);

    const stale = await fetch(`${BASE}/members/years/2024/order/`, {
      method: "PUT",
      headers: AUTH,
      body: JSON.stringify({ order: ids.slice(1) }),
    });
    expect(stale.status).toBe(409);
  });

  it("requires a token for admin routes", async () => {
    const response = await fetch(`${BASE}/members/admin/`);
    expect(response.status).toBe(401);
  });
});
