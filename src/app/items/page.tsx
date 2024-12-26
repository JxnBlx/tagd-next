import { Suspense } from "react";
import { getItems } from "@/utils/item";
import { Items } from "@/components/item/Items";

async function ItemsList() {
	"use server";
	const response = await getItems();

	if (!response.ok) {
		console.error("Error fetching items");
		return <p>No items found</p>;
	}
	const initialItems = await response.json();

	return <Items initialItems={initialItems} />;
}

export default function AllItemsPage() {
	return (
		<div>
			<h1>All Items</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<ItemsList />
			</Suspense>
		</div>
	);
}
