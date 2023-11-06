import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value
    const res = NextResponse.next();
    const response = await fetch("http://localhost:8080/api/v1/auth/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ accessToken })
    })
    const data = await response.json()
    console.log(data.ok)

    const { origin, pathname } = new URL(req.url);

    if (data.ok && pathname === "/auth") {
        return NextResponse.redirect(new URL("/dashboard", origin));
    }

    if (!data.ok && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth", origin));
    }

    return res;
}

export const config = {
    matcher: ["/auth", "/dashboard/:path*"],
};
