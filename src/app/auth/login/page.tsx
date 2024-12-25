"use server";

import { handleLogin } from "@/utils/auth";
import AuthForm from "../AuthForm";
import { redirect } from "next/navigation";
import config from "../../../../config";

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
				redirect(config.pages.login);
			} else {
				const data = await resp.json();
				return { message: data.error };
			}
		} catch {
			return { message: "An error occurred during login" };
		}
	}

	return <AuthForm type={"Login"} action={login} />;
}
