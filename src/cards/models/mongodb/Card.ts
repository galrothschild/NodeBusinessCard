import { Schema, model } from "mongoose";
import {
	URL,
	addressSchema,
	requiredString,
} from "../../../common/mongodb/mongoSchemas";

const cardSchema = new Schema({
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
	},
	web: URL,
	image: {
		url: URL,
		alt: { type: String, minLength: 2, maxLength: 255, trim: true },
	},
	address: addressSchema,
	bizNumber: {
		type: Number,
		required: true,
		trim: true,
		minLength: 7,
		maxLength: 7,
	},
	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

export default model("Card", cardSchema);
