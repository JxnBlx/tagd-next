import { getAccountData, editAccount } from "@/utils/account";
import AccountPageHeader from "../AccountPageHeader";
import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig";
import { Suspense } from "react";
import EditAccountForm from "./EditAccountForm";
import { AccountLoadingFallback } from "../page";

async function submitAccountData(prevState: any, formData: FormData) {
	"use server";

	const rawFormData = {
		username: formData.get("username") as string,
		bio: formData.get("bio") as string,
	};

	const resp = await editAccount(rawFormData.username, rawFormData.bio);
	if (!resp.ok) {
		const data = await resp.json();
		return { message: data.error };
	} else {
		redirect(globalconfig.pages.account);
	}
}

async function EditAccountData() {
	"use server";
	const res = await getAccountData();

	if (!res.ok && res.status !== 404) {
		redirect(globalconfig.pages.login);
	}

	const accountData = await res.json();

	return <EditAccountForm accountData={accountData} action={submitAccountData} />;
}

export default function EditAccountPage() {
	return (
		<>
			<AccountPageHeader text="Edit Account" />
			<Suspense fallback={<AccountLoadingFallback />}>
				<EditAccountData />
			</Suspense>
		</>
	);
}
