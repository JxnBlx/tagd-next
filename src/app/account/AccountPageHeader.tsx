"use server";

export default async function AccountPageHeader({ text }: { text: string }) {
	return (
		<div>
			<h1>{text}</h1>
		</div>
	);
}
