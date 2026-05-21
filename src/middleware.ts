// middleware:
// before the request (to render the page) is sent to the server,
// middleware logic is executed

// to learn more: https://velog.io/@uno8941/NextJS-Middleware

// withAuth middleware from next-auth library
// automatically checks page routes listed on the matcher
// if the user is not authenticated, redirect to the signin page
// (autoOptions.ts - redirect function will be executed)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Mock-mode bypass: MSW + MockAuthToggle replace real next-auth, so withAuth
// (which checks for a real JWT cookie) would redirect every gated route to
// /signin. Env flag is build-time inlined by Next, so the branch is static.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === "1";

export default IS_MOCK_MODE ? () => NextResponse.next() : withAuth;

export const config = {
  matcher: [
    "/users/:path*",
    "/posts/create/:path*",
    "/posts/update/:path*",
    "/posts/delete/:path*",
    "/pocha/:path*",
    "/admin/:path*",
    "/courses/:path+",
  ],
};
