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
    Get signed URL for image upload
    return: response object
*/
export const getSignedURL = async () => {
	try {
		const response = await fetch(`${API_URL}/image/signed-url`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Cookie: await makeCookieHeader(),
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		return new Response({ error: "Signed URL fetch error" + error }, { status: 500 });
	}
};

/*
    Upload image to url
    param: signedURL - signed URL for image upload
    param: file - image file
    return: response object
*/
export const uploadImage = async (signedURL, file) => {
	const response = await fetch(signedURL, {
		method: "PUT",
		body: file,
		headers: {
			Cookie: await makeCookieHeader(),
		},
	});

	return response;
};

/*
    Make image source url from path
    param: path - image path
    return: string = image source url
*/
export const makeImageUrl = (path) => {
	return `https://sjqzyhiksxfkrccmzyyx.supabase.co/storage/v1/object/public/post-images/${path}`;
};
