import type { Address, Image } from "../../common/models";

export type IUser = {
	_id: string;
	name: Name;
	phone: string;
	email: string;
	image: Image;
	address: Address;
	isAdmin: boolean;
	isBusiness: boolean;
	createdAt: string;
};

export type Name = {
	first: string;
	middle: string;
	last: string;
	_id: string;
};
