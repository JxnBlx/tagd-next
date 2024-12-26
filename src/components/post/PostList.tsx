"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import globalconfig from "../../../globalconfig";

export default function Posts({ initialPosts }) {
	const [posts, setPosts] = useState(initialPosts);
	const router = useRouter();

	return (
		<>
			{posts.map((post, index) => (
				<div key={post.id} className="post-card" onClick={() => router.push(`${globalconfig.pages.posts}/${post.id}`)}>
					<img src={post.image_url} alt={`post`} className="post-image" />
				</div>
			))}
		</>
	);
}
