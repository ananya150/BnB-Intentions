import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/rate-limiter";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname === "/";

    const sensitiveRoutes = ["/wallet", "/create"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route),
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/wallet", req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // if (pathname === '/') {
    //   return NextResponse.redirect(new URL('/dashboard', req.url))
    // }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);
