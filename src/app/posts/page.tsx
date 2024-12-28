import { getPosts } from "@/utils/post";
import { Suspense } from "react";
import Posts from "@/components/post/PostList";

async function AllPostsList() {
	"use server";

	const response = await getPosts();

	if (!response.ok) {
		return <div> No posts </div>;
	}

	const posts = await response.json();

	if (posts.length === 0) {
		return <div> No posts </div>;
	}

	return <Posts initialPosts={posts} />;
}

export default async function AllPostsPage() {
	return (
		<>
			<div>All posts</div>
			<Suspense fallback={<div>Loading...</div>}>
				<AllPostsList />
			</Suspense>
		</>
	);
}
