"use client";
import globalconfig from "../../../globalconfig";
import { useRouter } from "next/navigation";
// import Image from "next/image";

const BrandCard = ({ info }) => {
	const router = useRouter();

	const onClick = () => {
		router.push(`${globalconfig.pages.brands}/${info.id}`);
	};

	return (
		<>
			{info ? (
				<div onClick={onClick}>
					<img className="brand-card-image" src={info.logo_link} alt={`${info.name} logo`} height={200} width={200} />
					<div className="brand-card-name">{info.name}</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default BrandCard;
