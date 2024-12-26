import EditItemForm from "./EditItemForm";
import { redirect } from "next/navigation";
import { getItemById, editItem } from "@/utils/item";
import globalconfig from "../../../../../globalconfig";
import { getBrands } from "@/utils/brand";

export default async function EditItemPage({ params }) {
	const { id } = await params;

	const response = await getItemById(id);
	if (!response.ok) {
		redirect(globalconfig.pages.items);
	}
	const itemData = await response.json();

	const resp = await getBrands();
	if (!resp.ok) {
		itemData.brands = [];
	} else {
		itemData.brands = await resp.json();
	}

	async function submitEdit(prevState, formData) {
		"use server";
		const rawFormData = {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			purchase_link: formData.get("purchase_link") as string,
			image_link: formData.get("image_link") as string,
			brand_id: formData.get("brand_id") as string,
		};

		const resp = await editItem(
			id,
			rawFormData.name,
			rawFormData.description,
			rawFormData.purchase_link,
			rawFormData.image_link,
			rawFormData.brand_id
		);
		if (!resp.ok) {
			return { message: "Error editing item" + resp.status };
		}
		redirect(globalconfig.pages.items + "/" + id);
	}

	return <EditItemForm itemData={itemData} action={submitEdit} />;
}
