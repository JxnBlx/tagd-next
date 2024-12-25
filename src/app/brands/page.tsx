import { Suspense } from "react";
import { getBrands } from "../../utils/brand";
import BrandCard from "./BrandCard";

async function BrandList() {
	const resp = await getBrands();
	const brands = await resp.json();
	return (
		<>
			{brands && brands.length > 0 ? (
				<div>
					{brands.map((brand) => (
						<BrandCard key={brand.id} info={brand} />
					))}{" "}
				</div>
			) : (
				<div>No Brands Found</div>
			)}
		</>
	);
}

export default function AllBrandsPage() {
	return (
		<div>
			<h1>All Brands</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<BrandList />
			</Suspense>
		</div>
	);
}
