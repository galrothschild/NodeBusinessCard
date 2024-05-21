import type { SchemaDefinitionProperty, Document, ObjectId } from "mongoose";
import type {
	Address,
	Image,
	inputAddress,
	inputImage,
} from "../../common/models";

export type IUser = {
	_id: string | SchemaDefinitionProperty<string, IUser>;
	name: Name;
	phone: string;
	email: string;
	image: Image;
	address: Address;
	isAdmin: boolean;
	isBusiness: boolean;
	createdAt: Date;
	password: string;
};

export type Name = {
	first: string;
	middle: string;
	last: string;
	_id: string;
};

export type inputName = {
	first: string;
	middle: string;
	last: string;
};

export type inputIUser = {
	name: inputName;
	phone: string;
	email: string;
	password: string;
	image: inputImage;
	address: inputAddress;
	isBusiness: boolean;
	isAdmin?: boolean;
};

export type loginUserType = {
	email: string;
	password: string;
};
