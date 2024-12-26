"use client";

import { useEffect, useState } from "react";
import { getBrandItemsById } from "@/utils/brand";
import { useRouter } from "next/navigation";

export function Items({ id }) {
	const [items, setItems] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchBrandItems = async () => {
			try {
				const response = await getBrandItemsById(id);
				const data = await response.json();

				if (response.ok) {
					setItems(data);
				} else {
					throw new Error("Error loading items");
				}
			} catch (error) {
				return <div>Error loading items</div>;
			}
		};

		fetchBrandItems();
	}, [id]);

	return (
		<>
			{items.length > 0 ? (
				items.map((item) => {
					return (
						<div key={item.id} onClick={() => router.push(`${config.pages.items}/${item.id}`)}>
							<img src={item.image_link} alt={`${item.name} logo`} />
							<h2>{item.name}</h2>
						</div>
					);
				})
			) : (
				<p>No items found</p>
			)}
		</>
	);
}
