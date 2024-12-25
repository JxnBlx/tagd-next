import { handleSignup } from "@/utils/auth";
import AuthForm from "../AuthForm";
import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig";

export default function AuthPage() {
	async function signup(prevState: any, formData: FormData) {
		"use server";

		const rawFormData = {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		};

		try {
			const resp = await handleSignup(rawFormData.email, rawFormData.password);
			if (!resp.ok) {
				const data = await resp.json();
				return { message: JSON.stringify(data) };
			}
		} catch (error) {
			return { message: "An error occurred during signup" };
		}
		redirect(globalconfig.pages.login + "?u=" + rawFormData.email);
	}

	return <AuthForm type={"Sign Up"} action={signup} />;
}
