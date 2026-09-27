// middleware.ts
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";
const authRoutes = ['/login',
  '/signup'
]
export default auth((req) => {
  const isLoggedIn = !!req.auth?.accessToken;
  console.log(req.nextUrl)
  const isAuthRoute = authRoutes.some((ele) => ele === req.nextUrl.pathname)
  if (isLoggedIn && isAuthRoute) {
  return NextResponse.redirect(new URL("/", req.nextUrl));
}

const response = NextResponse.next();


return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
