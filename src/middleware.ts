import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import authOptions from "./lib/next-auth/authOptions";
import { cookies } from "next/headers";
export default withAuth;
// export default withAuth(
//   function middleware(req) {
//     console.log(req.nextauth.token);
//   },
//   {
//     // pages that should be excluded from the middleware
//     callbacks: {
//       authorized({ req, token }) {
//         if (token) return true; // If there is a token, the user is authenticated
//       },
//     },
//   }
// );

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
export const config = {
  matcher: [
    "/users/:path*",
    "/posts/create/:path*",
    "/posts/update/:path*",
    "/posts/delete/:path*",
  ],
};

// export async function middleware(request: NextRequest, event: NextFetchEvent) {
//   // Get the pathname from the request URL
//   const { pathname } = request.nextUrl;

//   // Exclude "/under-construction" from being redirected
//   if (pathname === "/under-construction" || pathname.startsWith("/_next")) {
//     return NextResponse.next(); // Continue without redirect
//   }
//   console.log(request.nextauth.token);

//   // if (session) {
//   //   return NextResponse.next(); // Continue without redirect
//   // }

//   // Redirect all other paths to "/under-construction"
//   return NextResponse.redirect(new URL("/under-construction", request.url));
// }

// // // 모든 url에 대해 실행되는 middleware
// // // 앱의 어떤 url이든 접속하면, /under-construction으로 redirect
// export const config = {
//   // matcher: "/((?!api|_next|.*\\..*).*)", // Exclude API, static files, and Next.js internals
//   matcher: ["/:path*"],
// };
