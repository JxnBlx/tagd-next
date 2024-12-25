import { NextResponse, type NextRequest } from "next/server";
import globalconfig from "../globalconfig";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.match(/\/(signin|login)/) && request.cookies.get("accessToken")) {
		const response = NextResponse.redirect(new URL(globalconfig.pages.account, request.url));
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}
}

// const signupPath = globalconfig.pages.signup;
// const loginPath = globalconfig.pages.login;

export const config = {
	matcher: ["/auth/signup", "/auth/login"],
};
