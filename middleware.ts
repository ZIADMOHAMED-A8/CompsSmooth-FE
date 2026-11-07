// middleware.ts
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
const publicRoutes = ["/login", "/signup", "/reset-password"];

const isRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export default auth((req) => {
  const isLoggedIn = !!req.auth?.accessToken;
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.some((route) => isRoute(pathname, route));

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
