"use client";
import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import globalconfig from "../../../globalconfig";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

const initialState = {
	message: "",
};

export function AuthForm({ action, type }) {
	const searchParams = useSearchParams();
	const emailParam = searchParams.get("u") || "";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [state, formAction, pending] = useActionState(action, initialState);

	useEffect(() => {
		if (emailParam) {
			setEmail(emailParam);
		}
	}, [emailParam]);

	return (
		<form className="custom-form" action={formAction}>
			<h2 className="title">{type}</h2>
			<input
				id="email"
				name="email"
				className="edit-field"
				placeholder="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				id="password"
				name="password"
				className="edit-field"
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{<p className="error-message">{state?.message}</p>}
			<button type="submit" className="submit-button" disabled={pending}>
				{pending ? "Loading..." : type}
			</button>
			<div className="subtext">
				<p>Don't have an account?</p>
				<a className="toggle-form" href={type === "Login" ? globalconfig.pages.signup : globalconfig.pages.login}>
					{type === "Login" ? "Sign Up" : "Login"}
				</a>
			</div>
		</form>
	);
}

export default AuthForm;
