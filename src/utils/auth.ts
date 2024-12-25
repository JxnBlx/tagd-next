import api_config from "../../config";

const API_URL = api_config.API_URL;

/*
    Check if the user is logged in
    return: response object or null
*/
export const checkLoginStatus = async () => {
	try {
		let response = await fetch(`${API_URL}/auth/check-session`, {
			method: "GET",
			credentials: "include", // Include cookies in the request
		});

		if (response.status === 400) {
			const result = await refreshToken();

			if (result == null) {
				return response;
			}

			response = await fetch(`${API_URL}/auth/check-session`, {
				method: "GET",
				credentials: "include", // Include cookies in the request
			});
			return response;
		}

		return response;
	} catch (error) {
		console.error("Error checking login status:", error);
		return new Response(null, { status: 400 });
	}
};

/*
    Refresh the user's access token
    return: response object or null
*/
export const refreshToken = async () => {
	try {
		const response = await fetch(`${API_URL}/auth/refresh-token`, {
			method: "POST",
			credentials: "include", // Include cookies in the request
		});

		if (!response.ok) {
			console.error("Token refresh error:", (await response.json()).error);
			return response;
		} else {
			return response;
		}
		return response;
	} catch (error) {
		console.error("Token refresh error:", error);
		return null;
	}
};

/*
    Handle user login
    param: email - user email
    param: password - user password
    return: response object or null
*/
export const handleLogin = async (email: string, password: string) => {
	try {
		const response = await fetch(`${API_URL}/auth/signin`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
			credentials: "include", // Include cookies in the request
		});

		return response;
	} catch (error) {
		const response = new Response(JSON.stringify({ error: error.message || "Login error" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
		return response;
	}
};

/*
Handle user signup
param: email - user email
param: password - user password
return: response object
*/
export const handleSignup = async (email: string, password: string) => {
	try {
		const response = await fetch(`${API_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
			credentials: "include", // Include cookies in the request
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.error);
		} else {
			return response;
		}
	} catch (error) {
		const response = new Response(JSON.stringify({ error: error.message || "Signup error" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
		return response;
	}
};

/*
    Handle user logout
    return: true or false
*/
export const handleLogout = async () => {
	try {
		const response = await fetch(`${API_URL}/auth/signout`, {
			method: "POST",
			credentials: "include", // Include cookies in the request
		});

		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.error);
		}

		return true;
	} catch (error) {
		console.error("Logout error:", error);
		return false;
	}
};
