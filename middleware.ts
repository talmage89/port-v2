import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicPaths = ["/admin/login"];
  const isPublicPath = publicPaths.includes(path);

  const isAdminPath = path.startsWith("/admin");

  if (!isAdminPath) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
