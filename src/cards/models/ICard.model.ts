import type { Address, Image } from "../../common/models";

export type ICard = {
	_id: string;
	title: string;
	subtitle: string;
	description: string;
	phone: string;
	email: string;
	web: string;
	image: Image;
	address: Address;
	bizNumber: number;
	likes: string[];
	user_id: string;
	createdAt: string;
	__v: number;
};
