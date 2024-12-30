"use client";
import { Button } from "@/components/ui/Button";

import { useActionState, useEffect, useState } from "react";

const initialState = { message: "" };

export default function EditAccountForm({ accountData, action }: { accountData: any; action: any }) {
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");

	const [state, formAction, pending] = useActionState(action, initialState);

	useEffect(() => {
		if (accountData.username) {
			setUsername(accountData.username);
		}
		if (accountData.bio) {
			setBio(accountData.bio);
		}
	}, [accountData]);

	return (
		<div className="w-full max-w-[400px] mx-auto px-6 pt-8">
			<form action={formAction} className="space-y-6">
				<div className="space-y-1.5">
					<label htmlFor="username" className="block text-sm font-light text-gray-700">
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						placeholder="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className="w-full px-4 py-2.5 text-sm border border-gray-200 
          rounded-md bg-white/50 backdrop-blur-sm
          focus:outline-none focus:ring-1 focus:ring-black
          placeholder:text-gray-400 transition-colors"
					/>
				</div>

				<div className="space-y-1.5">
					<label htmlFor="bio" className="block text-sm font-light text-gray-700">
						Bio
					</label>
					<textarea
						id="bio"
						name="bio"
						placeholder="Tell us about yourself"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						required
						rows={4}
						className="w-full px-4 py-3 text-sm border border-gray-200 
          rounded-md bg-white/50 backdrop-blur-sm
          focus:outline-none focus:ring-1 focus:ring-black
          placeholder:text-gray-400 transition-colors
          resize-none"
					/>
				</div>

				{state?.message && <p className="text-sm text-red-500 font-light text-center">{state.message}</p>}

				<Button variant="primary" size="lg" className="w-full mt-6" type="submit" isLoading={pending}>
					Save
				</Button>
			</form>
		</div>
	);
}
