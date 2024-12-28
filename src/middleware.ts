import { NextResponse, type NextRequest } from "next/server";
import { ResponseCookies, RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import globalconfig from "../globalconfig";
import { refreshToken } from "./utils/auth";

function applySetCookie(req: NextRequest, res: NextResponse) {
	const setCookies = new ResponseCookies(res.headers);
	const newReqHeaders = new Headers(req.headers);
	const newReqCookies = new RequestCookies(newReqHeaders);

	setCookies.getAll().forEach((cookie) => {
		newReqCookies.set(cookie);
	});

	const dummyRes = NextResponse.next({
		request: { headers: newReqHeaders },
	});

	dummyRes.headers.forEach((value, key) => {
		if (key === "x-middleware-override-headers" || key.startsWith("x-middleware-request-")) {
			res.headers.set(key, value);
		}
	});
}

export async function middleware(request: NextRequest) {
	// Redirect logged-in users away from auth pages
	if (request.nextUrl.pathname.match(/\/auth\/(signup|login)/) && request.cookies.get("accessToken")) {
		const response = NextResponse.redirect(new URL(globalconfig.pages.account, request.url));
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}

	// Redirect non-logged-in users to login
	if (request.nextUrl.pathname.match(/\/account\/*/) && !request.cookies.get("accessToken")) {
		const response = NextResponse.redirect(new URL(globalconfig.pages.login, request.url));
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	}

	// Handle token refresh for create/edit pages
	if (request.nextUrl.pathname.match(/\/(create|edit)$/) && request.cookies.get("accessToken")) {
		try {
			const tokenExpiryString = request.cookies.get("tokenExpiry")?.value;
			const tokenExpiry = tokenExpiryString ? parseInt(tokenExpiryString) : 0;

			if (tokenExpiry < Date.now() + 5 * 60 * 1000) {
				const response = await refreshToken();

				if (!response.ok) {
					throw new Error("Error refreshing token");
				}

				const newTokens = await response.json();
				const newResponse = NextResponse.next();

				newResponse.cookies.set("accessToken", newTokens.accessToken, {
					httpOnly: true,
					secure: false,
					sameSite: "lax",
					maxAge: 60 * 60 * 1000, // 1 hour
				});

				newResponse.cookies.set("refreshToken", newTokens.refreshToken, {
					httpOnly: true,
					secure: false,
					sameSite: "lax",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				newResponse.cookies.set("tokenExpiry", JSON.stringify(Date.now() + 60 * 60 * 1000), {
					httpOnly: true,
					secure: false,
					sameSite: "lax",
					maxAge: 60 * 61 * 1000, // 1 hour 1 minute
				});

				// Apply cookies to current request
				applySetCookie(request, newResponse);
				return newResponse;
			}
		} catch (error) {
			console.log(error);
			return NextResponse.redirect(new URL(globalconfig.pages.login, request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/signup", "/auth/login", "/account/:path*", "/(.*)/create", "/(.*)/edit"],
};
