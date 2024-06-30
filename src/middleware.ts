// [TESTING] Next-Auth Middleware

import { NextRequest, NextResponse } from "next/server";

// 로그인한 상태여야 접근할 수 있는 페이지들에 대한 처리
const withAuth = async (req: NextRequest, token: boolean) => {
  const url = req.nextUrl;
  const { pathname } = req.nextUrl;
  const search = url.search ? url.search : "";

  if (!token) {
    url.pathname = "/signin";
    url.search = `callbackUrl=${pathname.toString() + search.toString()}`;
    return NextResponse.redirect(url);
  }
};

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token");

  return withAuth(request, !!token);
}

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
export const config = {
  matcher: [
    "/users/:path*",
    "/posts/create/:path*",
    "/posts/update/:path*",
    "/posts/delete/:path*",
  ],
};
``;
``;
