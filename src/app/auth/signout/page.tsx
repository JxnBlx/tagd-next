"use client";

import { handleLogout } from "@/utils/auth";
import globalconfig from "../../../../globalconfig";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignOutPage() {
	const router = useRouter();

	useEffect(() => {
		const logout = async () => {
			// Delete cookies using document.cookie
			document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			document.cookie = "tokenExpiry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

			await handleLogout();
			router.push(globalconfig.pages.login);
		};

		logout();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50/50">
			<div className="w-full max-w-[400px] mx-auto px-6 text-center">
				<div className="flex flex-col items-center gap-4">
					<p className="text-sm text-gray-500 font-light">Signing out...</p>
				</div>
			</div>
		</div>
	);
}
