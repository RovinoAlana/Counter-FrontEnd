import {
  MiddlewareConfig,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";
import { protectedRoutes } from "./constants/navigation.constant";
import { getToken } from "./utils/cookie.util";

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const token = await getToken();
  const response = NextResponse;
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return response.redirect(new URL("/login", request.url));
  }

  if (path === "/login" && token) {
    return response.redirect(new URL("/", request.url));
  }

  const next = response.next();
  return next;
};

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img|api|icons|svg).*)"],
};
