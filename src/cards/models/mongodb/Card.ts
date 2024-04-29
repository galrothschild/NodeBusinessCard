import { Schema, model } from "mongoose";
import {
	URL,
	addressSchema,
	imageSchema,
	requiredString,
} from "../../../common/mongodb/mongoSchemas";
import type { ICard } from "../ICard.model";

const cardSchema = new Schema<ICard>({
	title: requiredString,
	subtitle: requiredString,
	description: { ...requiredString, maxLength: 1024 },
	phone: {
		type: String,
		required: true,
		match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
	},
	email: {
		type: String,
		required: true,
		match: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
		unique: true,
	},
	web: URL,
	image: imageSchema,
	address: addressSchema,
	bizNumber: {
		type: Number,
		required: true,
		trim: true,
		minLength: 7,
		maxLength: 7,
	},
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	user_id: Schema.Types.ObjectId,
	createdAt: { type: Date, default: Date.now },
});

export default model("Card", cardSchema);
