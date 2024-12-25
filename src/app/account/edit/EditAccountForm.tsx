"use client";

import { useActionState, useEffect, useState } from "react";

const initialState = { message: "" };

export default function EditAccountForm({ accountData, action }: { accountData: any; action: any }) {
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");

	const [state, formAction, pending] = useActionState(action, initialState);

	useEffect(() => {
		if (accountData) {
			setUsername(accountData.username);
			setBio(accountData.bio);
		}
	}, [accountData]);

	return (
		<form className="custom-form" action={formAction}>
			<input
				id="username"
				name="username"
				className="edit-field"
				placeholder="Username"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				id="bio"
				name="bio"
				className="edit-field"
				placeholder="Bio"
				type="text"
				value={bio}
				onChange={(e) => setBio(e.target.value)}
				required
			/>
			{<p className="error-message">{state?.message}</p>}
			<button type="submit" className="submit-button" disabled={pending}>
				{pending ? "Loading..." : "Save"}
			</button>
		</form>
	);
}
