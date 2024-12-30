import Header from "@/components/ui/Header";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				<div className="h-[72px]" />
				<main>{children}</main>
			</body>
		</html>
	);
}
