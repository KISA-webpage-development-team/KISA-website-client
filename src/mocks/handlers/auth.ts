import { http, HttpResponse } from "msw";

const ADMIN_FLAG_KEY = "kisa-mock-auth-isadmin";

/**
 * In-memory user fixture for the signup flow. Seeded with a deterministic
 * "already exists" handle so the signup → already-exists Dialog can be
 * exercised without a prior submission. Successful signups append here so a
 * resubmission with the same email lands on the already-exists path within
 * the session.
 *
 * Kept local to auth.ts: usersHandlers (`/users/:email/`) returns a synthetic
 * profile for any email, so there's no cross-handler dependency.
 */
type SignupRecord = {
  email: string;
  fullname: string;
  bornYear: number | null;
  bornMonth: number | null;
  bornDate: number | null;
  major: string | null;
  gradYear: number | null;
  linkedin: string | null;
};

const signupUsers: SignupRecord[] = [
  {
    email: "already-exists@umich.edu",
    fullname: "Existing User",
    bornYear: 1995,
    bornMonth: 6,
    bornDate: 15,
    major: "Computer Science",
    gradYear: 2025,
    linkedin: null,
  },
];

function findUser(email: string): SignupRecord | undefined {
  const normalized = email.trim().toLowerCase();
  return signupUsers.find((u) => u.email.toLowerCase() === normalized);
}

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

  /**
   * Signup precheck. Real API contract: 200 when a user with this email
   * already exists, 404 otherwise. The signup page treats 200 as "already
   * exists" and 404 as "new user, proceed to POST /auth/signup/".
   */
  http.get("*/auth/userExists/:email", ({ params }) => {
    const email = decodeURIComponent(params.email as string);
    if (findUser(email)) {
      return HttpResponse.json({ exists: true });
    }
    return HttpResponse.json({ exists: false }, { status: 404 });
  }),

  /**
   * Signup creation. Real API returns 201 on success. We append to the
   * in-memory fixture so the userExists precheck flips for the same email
   * on a subsequent attempt. No server-side validation; the form owns it.
   */
  http.post("*/auth/signup/", async ({ request }) => {
    const body = (await request.json()) as Partial<SignupRecord>;
    const email = (body.email ?? "").trim();
    if (!email) {
      return HttpResponse.json(
        { ok: false, error: "email is required" },
        { status: 400 }
      );
    }
    const user: SignupRecord = {
      email,
      fullname: body.fullname ?? "",
      bornYear: body.bornYear ?? null,
      bornMonth: body.bornMonth ?? null,
      bornDate: body.bornDate ?? null,
      major: body.major ?? null,
      gradYear: body.gradYear ?? null,
      linkedin: body.linkedin ?? null,
    };
    signupUsers.push(user);
    return HttpResponse.json({ ok: true, user }, { status: 201 });
  }),
];
