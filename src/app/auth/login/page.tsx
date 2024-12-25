"use server";

import { handleLogin } from "@/utils/auth";
import AuthForm from "../AuthForm";
import globalconfig from "../../../../globalconfig";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AuthPage() {
	async function login(prevState: any, formData: FormData) {
		"use server";

		const rawFormData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		try {
			const resp = await handleLogin(rawFormData.email, rawFormData.password);
			if (resp.ok) {
				const cookieStore = await cookies();
				const data = await resp.json();

				cookieStore.set("accessToken", data.accessToken, {
					httpOnly: true,
					secure: false, // Changed to false for HTTP
					sameSite: "lax", // Changed to Lax for HTTP
					maxAge: 60 * 60 * 1000, // 1 hour
				});
				cookieStore.set("refreshToken", data.refreshToken, {
					httpOnly: true,
					secure: false, // Changed to false for HTTP
					sameSite: "lax", // Changed to Lax for HTTP
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});
			} else {
				const data = await resp.json();
				return { message: data.error };
			}
		} catch (error) {
			return { message: "An error occurred during login: " + JSON.stringify(error) };
		}
		redirect(globalconfig.pages.account);
	}

	return <AuthForm type={"Login"} action={login} />;
}
