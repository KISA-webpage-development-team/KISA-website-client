import { http, HttpResponse } from "msw";

const ADMIN_FLAG_KEY = "kisa-mock-auth-isadmin";

/**
 * Mock-mode admin check. Mirrors the real API shape:
 * - 200 `{ message: "user is admin" }` when the mock admin flag is on
 * - 401 `{ message: "user is not admin" }` otherwise
 * - 401 when Authorization header is missing (matches "Decode failed" semantics)
 *
 * Admin state is controlled by the MockAuthToggle, persisted in
 * sessionStorage under `kisa-mock-auth-isadmin`. MSW runs in-browser in
 * dev; in tests (jsdom) sessionStorage is also available.
 */
export const authHandlers = [
  http.get("*/auth/isAdmin/:email", ({ request }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) {
      return HttpResponse.json(
        { error: "Decode failed" },
        { status: 401 }
      );
    }
    const flag = sessionStorage.getItem(ADMIN_FLAG_KEY);
    if (flag === "1") {
      return HttpResponse.json({ message: "user is admin" });
    }
    return HttpResponse.json(
      { message: "user is not admin" },
      { status: 401 }
    );
  }),
];
