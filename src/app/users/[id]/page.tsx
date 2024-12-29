import { getUserPosts, getUserInfo } from "@/utils/user";
import { Suspense } from "react";
import globalconfig from "../../../../globalconfig";
import { redirect } from "next/navigation";
import Posts from "@/components/post/PostList";

async function UserInfo({ username }) {
	const response = await getUserInfo(username);
	if (!response.ok) {
		return redirect(globalconfig.pages.home);
	}
	const user = await response.json();

	return (
		<div>
			<h1>{user.username}</h1>
			<p>{user.bio}</p>
		</div>
	);
}
async function UserPosts({ username }) {
	const response = await getUserPosts(username);

	if (!response.ok) {
		return redirect(globalconfig.pages.home);
	}
	const posts = await response.json();
	return <Posts initialPosts={posts} />;
}

export default async function UserPage({ params }) {
	const { id: username } = await params;

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<UserInfo username={username} />
			</Suspense>
			<Suspense fallback={<div>Loading...</div>}>
				<UserPosts username={username} />
			</Suspense>
		</>
	);
}
