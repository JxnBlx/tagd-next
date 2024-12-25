"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import config from "../../../config";
import { handleLogin, handleSignup } from "@/utils/auth";
import { useSearchParams } from "next/navigation";

interface AuthProps {
	type: string;
}

const AuthForm: React.FC<AuthProps> = ({ type }) => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const searchParams = useSearchParams();
	const emailParam = searchParams.get("u") || "";

	useEffect(() => {
		if (emailParam) {
			setEmail(emailParam);
		}
	}, [emailParam, type]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (type === "Login") {
			login(e);
		} else {
			signup(e);
		}
	};

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const resp = await handleLogin(email, password);
			if (resp.ok) {
				router.push("/account");
			} else {
				const data = await resp.json();
				setError(data.error);
			}
		} catch {
			// setError(err.message);
			setError("An error occurred during login");
		} finally {
			setLoading(false);
		}
	};

	const signup = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const resp = await handleSignup(email, password);
			if (resp.ok) {
				router.push(config.pages.login + "?u=" + email);
			} else {
				const data = await resp.json();
				setError(data.error);
			}
		} catch {
			setError("An error occurred during signup");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="custom-form" onSubmit={handleSubmit}>
			<h2 className="title">{type}</h2>
			<input
				id="email"
				className="edit-field"
				placeholder="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				id="password"
				className="edit-field"
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{error && <p className="error-message">{error}</p>}
			<button type="submit" className="submit-button" disabled={loading}>
				{loading ? "Loading..." : type}
			</button>
			<div className="subtext">
				<p>Don't have an account?</p>
				<a className="toggle-form" href={type === "Login" ? config.pages.signup : config.pages.login}>
					{type === "Login" ? "Sign Up" : "Login"}
				</a>
			</div>
		</form>
	);
};

export default AuthForm;
