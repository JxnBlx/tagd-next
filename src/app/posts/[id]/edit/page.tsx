import { redirect } from "next/navigation";
import globalconfig from "../../../../../globalconfig.js";
import { Suspense } from "react";
import { getPostById } from "@/utils/post";
import PostForm from "../../PostForm.tsx";
import { editPost } from "@/utils/post";

type Tag = {
	x: number;
	y: number;
	itemId: string;
};

export default async function ItemPage({ params }) {
	const { id } = await params;

	const response = await getPostById(id);
	const post = await response.json();

	if (!response.ok) {
		redirect(globalconfig.pages.posts);
	}

	async function update(prevState, formData) {
		"use server";
		const formTags = formData.get("tags");
		const parsedTags = formTags ? (JSON.parse(formTags as string) as Tag[]) : [];

		const rawFormData = {
			description: formData.get("description") as string,
			tags: parsedTags,
		};

		const resp2 = await editPost(id, rawFormData.description, rawFormData.tags);
		if (!resp2.ok) {
			return { message: "Error updating post" + resp2.status };
		} else {
			const data = await resp2.json();
			redirect(globalconfig.pages.posts + "/" + data.id);
		}
	}

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<PostForm postData={post} action={update} title={"Edit Post"} />
			</Suspense>
		</>
	);
}
