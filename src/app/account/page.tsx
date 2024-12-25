import { getAccountData } from "@/utils/account";
import AccountPageHeader from "./AccountPageHeader";
import { redirect } from "next/navigation";
import globalconfig from "../../../globalconfig";
import { Suspense } from "react";

async function AccountData() {
	const res = await getAccountData();

	const accountData = await res.json();
	if (res.status === 404) {
		redirect(globalconfig.pages.account + "/edit");
	} else if (!res.ok) {
		redirect(globalconfig.pages.login);
	}

	return (
		<div>
			<pre>{JSON.stringify(accountData, null, 2)}</pre>
			<a href="/account/edit">Edit Account</a>
		</div>
	);
}

export default function AccountPage() {
	return (
		<>
			<AccountPageHeader text="Account" />
			<Suspense fallback={<div>Loading account data...</div>}>
				<AccountData />
			</Suspense>
		</>
	);
}
