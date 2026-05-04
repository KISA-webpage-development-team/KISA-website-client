import { http, HttpResponse } from "msw";

/**
 * Mock-mode user profile. `useUserAge` reads `/users/{email}/` to derive age
 * (over/under 21). The real API returns at least `{ bornDate, bornMonth,
 * bornYear, fullname }`; we return a hardcoded adult DOB for any email so
 * the toggle-on flow works without a real backend.
 */
export const usersHandlers = [
  http.get("*/users/:email/", ({ request, params }) => {
    const auth = request.headers.get("Authorization");
    if (!auth) {
      return HttpResponse.json(
        { error: "Decode failed" },
        { status: 401 }
      );
    }
    const email = decodeURIComponent(params.email as string);
    return HttpResponse.json({
      email,
      fullname: "KISA Tester",
      bornYear: 1995,
      bornMonth: 6,
      bornDate: 15,
    });
  }),
];
