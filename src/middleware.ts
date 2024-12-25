import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.match(/\/(signin|login)/) && request.cookies.get("accessToken")) {
		const response = NextResponse.redirect(new URL("/account", request.url));
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/signin", "/login"],
};
