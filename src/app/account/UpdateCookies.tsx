"use client";

import { useEffect } from "react";

type NewCookie = {
	accessToken: string;
	refreshToken: string;
};

export default function UpdateCookies({ newCookies }: { newCookies: NewCookie }) {
	useEffect(() => {
		function mount() {
			document.cookie = `accessToken=${newCookies.accessToken}; path=/`;
			document.cookie = `refreshToken=${newCookies.refreshToken}; path=/`;
		}
		mount();
	}, [newCookies]);

	return null;
}
