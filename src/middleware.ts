import {
  MiddlewareConfig,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const response = NextResponse;

  const next = response.next();
  return next;
};

export const config: MiddlewareConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img|api|icons|svg).*)"],
};
