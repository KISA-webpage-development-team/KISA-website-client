// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/jsonwebtoken/env", () => ({ JWT_SECRET_KEY: "test-secret" }));
vi.mock("@/apis/auth/queries", () => ({ getIsAdmin: vi.fn() }));

import { getIsAdmin } from "@/apis/auth/queries";
import { requireAdmin } from "@/lib/admin/requireAdmin";
import signToken from "@/lib/jsonwebtoken/signToken";

const ADMIN = "admin@example.com";

function requestWith(authorization?: string) {
  return new Request("http://localhost/api/anything", {
    method: "POST",
    headers: authorization ? { Authorization: authorization } : {},
  });
}

describe("requireAdmin", () => {
  beforeEach(() => {
    vi.mocked(getIsAdmin).mockReset();
  });

  it("rejects a request without a token", async () => {
    const response = await requireAdmin(requestWith());
    expect(response?.status).toBe(401);
    expect(getIsAdmin).not.toHaveBeenCalled();
  });

  it("rejects a token not signed with the app secret", async () => {
    const forged =
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImFkbWluQGV4YW1wbGUuY29tIn0.c2lnbmF0dXJl";
    const response = await requireAdmin(requestWith(`Bearer ${forged}`));
    expect(response?.status).toBe(401);
    expect(getIsAdmin).not.toHaveBeenCalled();
  });

  it("rejects a valid token of a non-admin", async () => {
    vi.mocked(getIsAdmin).mockResolvedValue(undefined);
    const token = await signToken("student@example.com");
    const response = await requireAdmin(requestWith(`Bearer ${token}`));
    expect(response?.status).toBe(403);
  });

  it("lets an admin through", async () => {
    vi.mocked(getIsAdmin).mockResolvedValue({ message: "user is admin" });
    const token = await signToken(ADMIN);
    const response = await requireAdmin(requestWith(`Bearer ${token}`));
    expect(response).toBeNull();
    expect(getIsAdmin).toHaveBeenCalledWith(ADMIN, token);
  });
});
