"use client";

import { useActionState, useEffect, useState } from "react";

const initialState = {
	message: "",
};

export default function EditItemForm({ itemData, action }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [purchaseLink, setPurchaseLink] = useState("");
	const [imageLink, setImageLink] = useState("");
	const [brandId, setBrandId] = useState("");
	const [brands, setBrands] = useState([]);

	const [state, formAction, pending] = useActionState(action, initialState);

	useEffect(() => {
		setName(itemData.name);
		setDescription(itemData.description);
		setPurchaseLink(itemData.purchase_link);
		setImageLink(itemData.image_link);
		setBrandId(itemData.brand_id);
		setBrands(itemData.brands);
	}, [itemData]);

	return (
		<div>
			<h1>Edit Item</h1>
			<form action={formAction}>
				<div>
					<label htmlFor="name">Name:</label>
					<input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
				</div>
				<div>
					<label htmlFor="description">Description:</label>
					<textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>
				<div>
					<label htmlFor="purchaseLink">Purchase Link:</label>
					<input
						type="text"
						name="purchase_link"
						id="purchaseLink"
						value={purchaseLink}
						onChange={(e) => setPurchaseLink(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="imageLink">Image Link:</label>
					<input type="text" id="imageLink" name="image_link" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
				</div>
				<div>
					<label htmlFor="brand">Brand:</label>
					<select id="brand" name="brand_id" value={brandId} onChange={(e) => setBrandId(e.target.value)}>
						{brands.map((brand) => (
							<option key={brand.id} value={brand.id}>
								{brand.name}
							</option>
						))}
					</select>
				</div>
				<p>{state.message}</p>
				<button type="submit" disabled={pending}>
					{pending ? "Saving..." : "Save"}
				</button>
			</form>
		</div>
	);
}
