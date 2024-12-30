"use server";
import api_config from "../../globalconfig";
import { refreshToken } from "./auth";
import { cookies } from "next/headers";

const API_URL = api_config.API_URL;

export const getAccountData = async () => {
	const cookieStore = await cookies();
	const cookieHeader = {
		Cookie: cookieStore
			.getAll()
			.map((cookie) => `${cookie.name}=${cookie.value}`)
			.join("; "),
	};

	try {
		const response = await fetch(`${API_URL}/account`, {
			method: "GET",
			headers: cookieHeader,
		});

		if (response.status === 402) {
			const cookieResp = await refreshToken();
			const newCookies = await cookieResp.json();

			const resp = await fetch(`${API_URL}/account`, {
				method: "GET",
				headers: {
					accessToken: newCookies.accessToken,
					refreshToken: newCookies.refreshToken,
				},
			});

			if (resp.ok) {
				const accountData = await resp.json();
				return new Response(
					JSON.stringify({
						...accountData,
						cookies: {
							accessToken: newCookies.accessToken,
							refreshToken: newCookies.refreshToken,
						},
					}),
					{
						status: resp.status,
						headers: {
							"Content-Type": "application/json",
							...resp.headers,
						},
					}
				);
			} else {
				return resp;
			}
		} else {
			return response;
		}
	} catch (error) {
		return new Response("Account data fetch error" + error, { status: 400 });
	}
};

export const editAccount = async (username: string, bio: string) => {
	try {
		const cookieStore = await cookies();
		const response = await fetch(`${API_URL}/account`, {
			method: "POST",
			credentials: "include", // Include cookies in the request
			headers: {
				"Content-Type": "application/json",
				Cookie: cookieStore
					.getAll()
					.map((cookie) => `${cookie.name}=${cookie.value}`)
					.join("; "),
			},
			body: JSON.stringify({ username: username, bio: bio }),
			cache: "no-store",
		});
		return response;
	} catch (error) {
		console.error("Account data fetch error:", error);
		throw new Error("Account data fetch error");
	}
};
