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

	return <div>Signing out...</div>;
}
