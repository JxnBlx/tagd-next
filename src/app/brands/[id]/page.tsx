import { getBrandById } from "../../../utils/brand";
import { redirect } from "next/navigation";
import globalconfig from "../../../../globalconfig.js";
import { Suspense } from "react";
import { Items } from "./Items";

async function BrandInfo({ id }) {
	const response = await getBrandById(id);
	const brand = await response.json();

	if (!response.ok) {
		redirect(globalconfig.pages.brands);
	}

	return (
		<div className="brand-top-row">
			<img className="brand-image" src={brand.logo_link} alt={`${brand.name} logo`} />
			<div className="brand-info">
				<div className="brand-name-and-svg">
					<a href={brand.website_link} title="Visit Website" target="_blank" rel="noopener noreferrer">
						<div className="brand-name">{brand.name}</div>
						<svg width="24" height="24" viewBox="0 0 24 24">
							<path
								d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19V6.413L11.207 14.207L9.793 12.793L17.585 5H13V3H21Z"
								fill="currentColor"
							/>
						</svg>
					</a>
				</div>
				<div className="brand-bio">{brand.bio}</div>
			</div>
		</div>
	);
}

export default async function BrandPage({ params }) {
	const { id } = await params;
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BrandInfo id={id} />
			<Items id={id} />
		</Suspense>
	);
}
