import type { inputICard } from "../models/ICard.model";
import { generateBizNumber } from "./generateBizNum";

export const normalizeCard = async (
	card: inputICard,
	user_id: string,
): Promise<inputICard> => {
	const {
		image: { url, alt },
		address,
	} = card;
	const image = {
		url:
			url ||
			"https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
		alt: alt || "Business card image",
	};
	return {
		...card,
		bizNumber: card.bizNumber || ((await generateBizNumber()) as number),
		user_id,
		image,
		address: {
			...address,
			state: address.state || "",
		},
	};
};
