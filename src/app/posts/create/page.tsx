import EditItemForm from "./EditItemForm";
import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig.js";
import { createPost } from "@/utils/post";
import PostForm from "../PostForm";
import { getSignedURL, makeImageUrl, uploadImage } from "@/utils/image";

type Tag = {
	x: number;
	y: number;
	itemId: string;
};

export default async function CreatePostPage() {
	async function create(prevState, formData) {
		"use server";

		const response = await getSignedURL();
		if (!response.ok) {
			return { message: "Error getting signed URL" + response.status };
		}
		const { signedUrl, path } = await response.json();

		if (!signedUrl) {
			return { message: "Error getting signed URL" };
		}
		const formTags = formData.get("tags");
		const parsedTags = formTags ? (JSON.parse(formTags as string) as Tag[]) : [];

		const rawFormData = {
			description: formData.get("description") as string,
			image_file: formData.get("image_file") as File,
			tags: parsedTags,
		};

		const resp = await uploadImage(signedUrl, rawFormData.image_file);
		if (!resp.ok) {
			return { message: "Error uploading image" + resp.status };
		}
		const resp2 = await createPost(makeImageUrl(path), rawFormData.description, rawFormData.tags);
		if (!resp2.ok) {
			return { message: "Error creating post" + resp2.status };
		} else {
			const data = await resp2.json();
			redirect(globalconfig.pages.posts + "/" + data.id);
		}
	}

	return <PostForm postData={null} action={create} title="New Post" />;
}
