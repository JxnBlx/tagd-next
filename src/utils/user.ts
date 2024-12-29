import globalconfig from "../../globalconfig";

const API_URL = globalconfig.API_URL;

/*
    Get user data
    return: response object
*/
export const getUserInfo = async (username) => {
	try {
		const response = await fetch(`${API_URL}/user/${username}/info`, {
			method: "GET",
		});

		return response;
	} catch (error) {
		return new Response({ message: "Error fetching user data" }, { status: 500 });
	}
};

/*
    Get user posts
    return: response object
*/
export const getUserPosts = async (username) => {
	try {
		const response = await fetch(`${API_URL}/user/${username}/posts`, {
			method: "GET",
		});

		return response;
	} catch (error) {
		return new Response({ message: "Error fetching user posts" }, { status: 500 });
	}
};
