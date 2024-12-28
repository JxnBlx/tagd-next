import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig.js";
import { Suspense } from "react";
import { getPostById } from "@/utils/post";

async function PostInfo({ id }) {
	"use server";
	const response = await getPostById(id);
	const post = await response.json();

	if (!response.ok) {
		redirect(globalconfig.pages.posts);
	}

	return (
		<div>
			<pre>{JSON.stringify(post, null, 2)}</pre>
		</div>
	);
}

export default async function ItemPage({ params }) {
	const { id } = await params;
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<PostInfo id={id} />
			</Suspense>
		</>
	);
}
