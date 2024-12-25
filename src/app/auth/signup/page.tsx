import { handleSignup } from "@/utils/auth";
import AuthForm from "../AuthForm";
import { redirect } from "next/navigation";
import config from "../../../../config";

export default function AuthPage() {
	async function signup(prevState: any, formData: FormData) {
		"use server";

		const rawFormData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		try {
			const resp = await handleSignup(rawFormData.email, rawFormData.password);
			if (resp.ok) {
				redirect(config.pages.login + "?u=" + rawFormData.email);
			} else {
				const data = await resp.json();
				return { message: data.error };
			}
		} catch {
			return { message: "An error occurred during signup" };
		}
	}

	return <AuthForm type={"Sign Up"} action={signup} />;
}
