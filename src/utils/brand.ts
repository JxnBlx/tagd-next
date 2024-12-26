import globalconfig from "../../globalconfig";

const API_URL = globalconfig.API_URL;

/*
    Get all brands
    return: response object
*/
export const getBrands = async () => {
	try {
		const response = await fetch(`${API_URL}/brands/all`, {
			method: "GET",
		});
		return response;
	} catch (error) {
		return new Response(JSON.stringify({ error: "Brand data fetch error" }), { status: 400, headers: { "Content-Type": "application/json" } });
	}
};

/*
Get brand by ID
param: id - brand ID
return: response object
*/
export const getBrandById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/brands/${id}`, {
			method: "GET",
			credentials: "include", // Include cookies in the request
		});

		return response;
	} catch (error) {
		return new Response({ error: "Brand data fetch error" }, { status: 400 });
	}
};

/*
Get brand items by ID
param: id - brand ID
return: response object
*/
export const getBrandItemsById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/brands/${id}/items`, {
			method: "GET",
		});

		return response;
	} catch (error) {
		return new Response({ error: "Brand data fetch error" }, { status: 400 });
	}
};

/*
Create a brand
param: name - brand name
param: bio - brand bio
param: website_link - brand website link
param: logo_link - brand logo link
return: response object
*/
export const createBrand = async (name, bio, website_link, logo_link) => {
	try {
		const response = await fetch(`${API_URL}/brands`, {
			method: "POST",
			credentials: "include", // Include cookies in the request
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, bio: bio, website_link: website_link, logo_link: logo_link }),
		});

		return response;
	} catch (error) {
		return new Response({ error: "Brand data fetch error" }, { status: 400 });
	}
};

/*
Edit a brand
param: id - brand ID
param: name - brand name
param: bio - brand bio
param: website_link - brand website link
param: logo_link - brand logo link
return: response object
*/
export const editBrand = async (id, name, bio, website_link, logo_link) => {
	try {
		const response = await fetch(`${API_URL}/brands/${id}`, {
			method: "PUT",
			credentials: "include", // Include cookies in the request
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: name, bio: bio, website_link: website_link, logo_link: logo_link }),
		});

		return response;
	} catch (error) {
		return new Response({ error: "Brand data fetch error" }, { status: 400 });
	}
};
