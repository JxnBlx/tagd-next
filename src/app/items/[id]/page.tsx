import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig.js";
import { Suspense } from "react";
import { getItemById, getItemPosts } from "@/utils/item";
import Posts from "@/components/post/PostList.tsx";

async function ItemInfo({ id }) {
	"use server";
	const response = await getItemById(id);
	const item = await response.json();

	if (!response.ok) {
		redirect(globalconfig.pages.items);
	}

	return (
		<div>
			<h1>{item.name}</h1>
			<p>Brand: {item.brands.name}</p>
			<p>Description: {item.description}</p>
			<p>Website ID: {item.purchase_link}</p>
			<img src={item.image_link} alt={`${item.name} pic :)`} />
		</div>
	);
}

async function PostList({ id }) {
	"use server";
	const response = await getItemPosts(id);

	if (!response.ok) {
		return <p>No posts found</p>;
	}
	const initialPosts = await response.json();

	if (initialPosts.length === 0) {
		return <p>No posts found</p>;
	}

	return <Posts initialPosts={initialPosts} />;
}

export default async function ItemPage({ params }) {
	const { id } = await params;
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<ItemInfo id={id} />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<PostList id={id} />
			</Suspense>
		</>
	);
}
