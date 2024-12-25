import api_config from "../../config";

const API_URL = api_config.API_URL;

export const getAccountData = async () => {
	try {
		const response = await fetch(`${API_URL}/account`, {
			method: "GET",
			credentials: "include", // Include cookies in the request
		});

		return response;
	} catch (error) {
		console.error("Account data fetch error:", error);
		throw new Error("Account data fetch error");
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