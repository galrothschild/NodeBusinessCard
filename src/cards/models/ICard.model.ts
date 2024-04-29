import type { SchemaDefinitionProperty } from "mongoose";
import type {
	Address,
	Image,
	OmitID,
	inputAddress,
	inputImage,
} from "../../common/models";
import type mongoose from "mongoose";

export type ICard = {
	_id: string | SchemaDefinitionProperty<string, ICard>;
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
	user_id: mongoose.Schema.Types.ObjectId | string;
	createdAt: Date;
	__v: number;
};

export type inputICard = {
	title: string;
	subtitle: string;
	description: string;
	phone: string;
	email: string;
	web: string;
	image: inputImage;
	address: inputAddress;
	bizNumber: number;
	user_id: string;
};
