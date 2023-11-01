import { NextResponse, type NextRequest } from "next/server";
import api from "./lib/axios";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value
  const res = NextResponse.next();


  const { origin, pathname } = new URL(req.url);

  if (accessToken && pathname === "/auth") {
      const isValidToken =  await api.get("auth/verify")
      console.log(isValidToken)
      return NextResponse.redirect(new URL("/dashboard", origin));
  }

  if (!accessToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", origin));
  }

  return res;
}

export const config = {
  matcher: ["/auth", "/dashboard/:path*"],
};
