import { getAccountData } from "@/utils/account";
import AccountPageHeader from "./AccountPageHeader";
import { redirect } from "next/navigation";
import globalconfig from "../../../globalconfig";
import { Suspense } from "react";

async function AccountData() {
	const res = await getAccountData();

	if (!res.ok) {
		redirect(globalconfig.pages.login);
	}

	const accountData = await res.json();

	return (
		<div>
			<pre>{JSON.stringify(accountData, null, 2)}</pre>
		</div>
	);
}

export default function AccountPage() {
	return (
		<>
			<AccountPageHeader />
			<Suspense fallback={<div>Loading account data...</div>}>
				<AccountData />
			</Suspense>
		</>
	);
}
