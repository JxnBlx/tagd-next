"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import globalconfig from "../../../globalconfig";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const { isAuthenticated } = useAuthStore();

	const handleAccountClick = () => {
		router.push(globalconfig.pages.account);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50">
			<div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
				<Link href="/" className="text-xl font-medium tracking-[0.15em] hover:opacity-80 transition-opacity">
					TAGD
				</Link>

				<nav className="flex gap-4">
					{!isAuthenticated ? (
						<>
							<Button variant="secondary" size="default" onClick={() => router.push(globalconfig.pages.login)}>
								Login
							</Button>
							<Button variant="primary" size="default" onClick={() => router.push(globalconfig.pages.signup)}>
								Sign up
							</Button>
						</>
					) : (
						<>
							<Button variant="outline" size="default" onClick={handleAccountClick}>
								Account
							</Button>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}
