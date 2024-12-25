import api_config from "../../globalconfig";
import { refreshToken } from "./auth";
import { cookies } from "next/headers";

const API_URL = api_config.API_URL;

export const getAccountData = async () => {
	try {
		const response = await fetch(`${API_URL}/account`, {
			method: "GET",
			credentials: "include", // Include cookies in the request
		});

		if (!response.ok) {
			const res = await refreshToken();
			if (!res.ok) {
				return response;
			} else {
				const cookieStore = await cookies();
				return await fetch(`${API_URL}/account`, {
					method: "GET",
					headers: {
						Cookie: cookieStore
							.getAll()
							.map((cookie) => `${cookie.name}=${cookie.value}`)
							.join("; "),
					},
				});
			}
		}
		return response;
	} catch (error) {
		return new Response("Account data fetch error" + error, { status: 400 });
	}
};

export const editAccount = async (username: string, bio: string) => {
	try {
		const response = await fetch(`${API_URL}/account`, {
			method: "POST",
			credentials: "include", // Include cookies in the request
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: username, bio: bio }),
		});

		return response;
	} catch (error) {
		console.error("Account data fetch error:", error);
		throw new Error("Account data fetch error");
	}
};
