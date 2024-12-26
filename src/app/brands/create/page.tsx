"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrand } from "../../../utils/brand";
import globalconfig from "../../../../globalconfig";

export default function CreateBrandPage() {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [websiteLink, setWebsiteLink] = useState("");
	const [imageLink, setImageLink] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		const create = async () => {
			try {
				const resp = await createBrand(name, bio, websiteLink, imageLink);
				if (resp.ok) {
					const data = await resp.json();
					router.push(`${globalconfig.pages.brands}/${data.id}`);
				} else {
					const data = await resp.json();
					setError(data.error);
				}
			} catch (error) {
				console.error("Brand create error:", error);
				setError(error.message);
			}
		};

		create();
	};

	return (
		<div>
			<h1>Create Brand</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div>
					<label htmlFor="bio">Bio:</label>
					<textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
				</div>
				<div>
					<label htmlFor="websiteLink">Website Link:</label>
					<input type="text" id="websiteLink" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} />
				</div>
				<div>
					<label htmlFor="imageLink">Image Link:</label>
					<input type="text" id="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
				</div>
				{error && <p className="error-message">{error}</p>}
				<button type="submit">Create Brand</button>
			</form>
		</div>
	);
}
