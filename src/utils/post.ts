import { cookies } from "next/headers";
import globalconfig from "../../globalconfig";

const API_URL = globalconfig.API_URL;

async function makeCookieHeader() {
	const cookieStore = await cookies();
	return cookieStore
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join("; ");
}

/*
    Get all posts
    return: response object
*/
export const getPosts = async () => {
	try {
		const response = await fetch(`${API_URL}/posts/all`, {
			method: "GET",
		});

		return response;
	} catch (error) {
		return new Response({ error: "Post data fetch error" + error }, { status: 500 });
	}
};

/*
    Get post by ID
    param: id - post ID
    return: response object
*/
export const getPostById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/posts/${id}`, {
			method: "GET",
		});

		return response;
	} catch (error) {
		return new Response({ error: "Post data fetch error" + error }, { status: 500 });
	}
};

/*
    Create a post
    param: image_url - post image url
    param: description - post description
    return: response object
*/
export const createPost = async (image_url, description, tags) => {
	try {
		const response = await fetch(`${API_URL}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: await makeCookieHeader(),
			},
			body: JSON.stringify({ image_url: image_url, description: description, tags: tags }),
		});

		return response;
	} catch (error) {
		return new Response({ error: "Post creation error" + error }, { status: 500 });
	}
};

/*
    Edit a post
    param: id - post ID
    param: description - post description
    return: response object
*/
export const editPost = async (id, description, tags) => {
	try {
		const response = await fetch(`${API_URL}/posts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Cookie: await makeCookieHeader(),
			},
			body: JSON.stringify({ id: id, description: description, tags: tags }),
		});

		return response;
	} catch (error) {
		return new Response({ error: "Post edit error" + error }, { status: 500 });
	}
};
