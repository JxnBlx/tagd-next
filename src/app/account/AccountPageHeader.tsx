"use server";

export default async function AccountPageHeader({ text }: { text: string }) {
	return (
		<div className="border-b border-gray-100 bg-white/80 backdrop-blur-sm">
			<div className="max-w-screen-xl mx-auto px-6 py-8">
				<h1 className="text-2xl font-light tracking-wide">{text}</h1>
			</div>
		</div>
	);
}
