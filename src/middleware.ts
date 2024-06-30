import { withAuth } from "next-auth/middleware";
export default withAuth;

// 미들웨어가 실행될 특정 pathname을 지정하면, 해당 pathname에서만 실행 가능
export const config = {
  matcher: [
    "/users/:path*",
    "/posts/create/:path*",
    "/posts/update/:path*",
    "/posts/delete/:path*",
  ],
};
