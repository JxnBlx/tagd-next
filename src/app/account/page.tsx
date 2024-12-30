"use server";

import { getAccountData } from "@/utils/account";
import AccountPageHeader from "./AccountPageHeader";
import { redirect } from "next/navigation";
import globalconfig from "../../../globalconfig";
import { Suspense } from "react";
import UpdateCookies from "./UpdateCookies.tsx";
import Posts from "@/components/post/PostList";
import { Button } from "@/components/ui/Button";

async function AccountData() {
	const res = await getAccountData();

	const accountData = await res.json();

	if (res.status === 404) {
		redirect(globalconfig.pages.account + "/edit");
	} else if (!res.ok) {
		redirect(globalconfig.pages.signout);
	}

	return (
		<div className="max-w-screen-xl mx-auto px-6 py-8">
			<div className="space-y-12">
				{/* Profile Section */}
				<div className="space-y-4">
					<div className="space-y-1">
						<h2 className="text-xl font-medium tracking-wide">{accountData.username}</h2>
						<p className="text-sm text-gray-500 font-light">{accountData.bio}</p>
					</div>

					<div className="flex gap-4">
						<a href="/account/edit">
							<Button variant="secondary" size="default" className="text-sm">
								Edit Profile
							</Button>
						</a>
						<a href="/auth/signout">
							<Button variant="outline" size="default" className="text-sm text-gray-500">
								Sign Out
							</Button>
						</a>
					</div>
				</div>

				{/* Posts Component */}
				<Posts initialPosts={accountData.posts} />

				{/* Cookie Update Component */}
				<div className="hidden">{accountData.cookies ? <UpdateCookies newCookies={accountData.cookies} /> : null}</div>
			</div>
		</div>
	);
}
export async function AccountLoadingFallback() {
	return (
		<div className="max-w-screen-xl mx-auto px-6 py-8">
			<div className="flex flex-col items-center gap-4">
				<p className="text-sm text-gray-500 font-light">Loading account data...</p>
			</div>
		</div>
	);
}

export default async function AccountPage() {
	return (
		<>
			<AccountPageHeader text="Account" />
			<Suspense fallback={<AccountLoadingFallback />}>
				<AccountData />
			</Suspense>
		</>
	);
}
