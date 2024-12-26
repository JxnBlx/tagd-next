import EditBrandForm from "./EditBrandForm";
import { redirect } from "next/navigation";
import { getBrandById, editBrand } from "../../../../utils/brand";
import globalconfig from "../../../../../globalconfig";

export default async function EditBrandPage({ params }) {
	const { id } = await params;

	const response = await getBrandById(id);
	if (!response.ok) {
		redirect(globalconfig.pages.brands);
	}
	const brandData = await response.json();

	async function submitEdit(prevState, formData) {
		"use server";

		const rawFormData = {
			name: formData.get("name") as string,
			bio: formData.get("bio") as string,
			website_link: formData.get("website_link") as string,
			logo_link: formData.get("logo_link") as string,
		};

		const resp = await editBrand(id, rawFormData.name, rawFormData.bio, rawFormData.website_link, rawFormData.logo_link);
		if (!resp.ok) {
			return { message: "Error editing brand" + resp.status };
		}
		redirect(globalconfig.pages.brands + "/" + id);
	}

	return <EditBrandForm brandData={brandData} action={submitEdit} />;
}
