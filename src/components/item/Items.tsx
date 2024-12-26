"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import globalconfig from "../../../globalconfig";

export function Items({ initialItems }) {
	const [items, setItems] = useState(initialItems);
	const router = useRouter();

	return (
		<>
			{items.map((item) => {
				return (
					<div key={item.id} onClick={() => router.push(`${globalconfig.pages.items}/${item.id}`)}>
						<img src={item.image_link} alt={`${item.name} logo`} />
						<h2>{item.name}</h2>
					</div>
				);
			})}
		</>
	);
}
