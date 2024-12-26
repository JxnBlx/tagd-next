"use client";

import { useActionState, useEffect, useState } from "react";

const initialState = {
	message: "",
};

export default function EditBrandForm({ brandData, action }) {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [websiteLink, setWebsiteLink] = useState("");
	const [imageLink, setImageLink] = useState("");

	const [state, formAction, pending] = useActionState(action, initialState);

	useEffect(() => {
		if (brandData.name) {
			setName(brandData.name);
		}
		if (brandData.bio) {
			setBio(brandData.bio);
		}
		if (brandData.website_link) {
			setWebsiteLink(brandData.website_link);
		}
		if (brandData.logo_link) {
			setImageLink(brandData.logo_link);
		}
	}, [brandData]);

	return (
		<form action={formAction}>
			<div>
				<label htmlFor="name">Name:</label>
				<input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div>
				<label htmlFor="bio">Bio:</label>
				<textarea id="bio" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
			</div>
			<div>
				<label htmlFor="website_ink">Website Link:</label>
				<input type="text" name="website_link" id="websiteLink" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
			</div>
			<div>
				<label htmlFor="logo_link">Image Link:</label>
				<input type="text" name="logo_link" id="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
			</div>
			{state && <p className="error-message">{state.message}</p>}
			<button type="submit">{pending ? "Saving..." : "Save"}</button>
		</form>
	);
}
