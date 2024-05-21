import { Schema } from "mongoose";
import { urlRegex } from "../models";
import { allow } from "joi";

export const requiredString = {
	type: String,
	required: true,
	minLength: 2,
	maxLength: 255,
	trim: true,
};

export const URL = {
	type: String,
	trim: true,
	match: RegExp(urlRegex),
};

export const imageSchema = new Schema({
	url: URL,
	alt: { type: String, minLength: 2, maxLength: 255, trim: true, allow: "" },
});

export const addressSchema = new Schema({
	state: String,
	country: requiredString,
	city: requiredString,
	street: requiredString,
	houseNumber: { type: Number, required: true, min: 1 },
	zip: { type: Number, required: true, min: 1 },
});
