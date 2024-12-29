"use client";
import React, { useState, useEffect, useActionState } from "react";
import globalconfig from "../../../globalconfig";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface State {
	message: string;
}

const initialState: State = {
	message: "",
};

interface AuthFormProps {
	mode?: "signin" | "signup";
	action: (prevState: State, formData: FormData) => Promise<State>;
}

export function AuthForm({ mode = "signin", action }: AuthFormProps) {
	const searchParams = useSearchParams();
	const emailParam = searchParams.get("u") || "";
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [state, formAction, pending] = useActionState<State, FormData>(action, initialState);

	useEffect(() => {
		if (emailParam) {
			setEmail(emailParam);
		}
	}, [emailParam]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
				<h1 className="text-2xl font-light tracking-wider mb-8 text-center">{mode === "signin" ? "Welcome Back" : "Create Account"}</h1>
				<form action={formAction} className="space-y-6">
					{/* {mode === "signup" && (
					<div className="space-y-2">
						<label htmlFor="name" className="block text-sm font-light text-gray-700">
							Name
						</label>
						<input
							id="name"
							type="text"
							value={formData.name}
							onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
							className="w-full px-4 py-3 border-gray-200 border rounded-md 
                focus:outline-none focus:ring-1 focus:ring-black
                placeholder:text-gray-400 text-sm"
							placeholder="John Doe"
						/>
					</div>
				)} */}
					<div className="space-y-2">
						<label htmlFor="email" className="block text-sm font-light text-gray-700">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-3 border-gray-200 border rounded-md 
              focus:outline-none focus:ring-1 focus:ring-black
              placeholder:text-gray-400 text-sm"
							placeholder="you@example.com"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="password" className="block text-sm font-light text-gray-700">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-3 border-gray-200 border rounded-md 
              focus:outline-none focus:ring-1 focus:ring-black
              placeholder:text-gray-400 text-sm"
						/>
					</div>

					{state?.message && <p className="text-sm text-red-500 text-center font-light ">{state.message}</p>}

					<Button variant="primary" size="lg" className="w-full" type="submit" isLoading={pending}>
						{mode === "signin" ? "Sign In" : "Create Account"}
					</Button>
				</form>

				<div className="mt-8 text-center">
					<p className="flex items-center justify-center text-sm text-gray-500">
						{mode === "signin" ? "Don't have an account? " : "Already have an account? "}
						<Button
							variant="ghost"
							className="underline font-light p-0 h-auto"
							onClick={() => {
								window.location.href = mode === "signin" ? globalconfig.pages.signup : globalconfig.pages.login;
							}}
						>
							{mode === "signin" ? "Sign up" : "Sign in"}
						</Button>
					</p>
				</div>
			</div>
		</div>
	);
}

export default AuthForm;
