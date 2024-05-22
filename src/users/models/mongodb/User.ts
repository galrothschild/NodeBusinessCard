import { Schema, model } from "mongoose";
import {
	addressSchema,
	imageSchema,
	requiredString,
} from "../../../common/mongodb/mongoSchemas";
import bcrypt from "bcrypt";
import type { inputIUser } from "../IUser.model";

const nameSchema = new Schema({
	first: requiredString,
	last: requiredString,
	middle: { type: String, required: false, maxLength: 256, trim: true },
});

const userSchema = new Schema({
	name: nameSchema,
	phone: {
		type: String,
		required: true,
		maxLength: 15,
		trim: true,
		match: /0[0-9]{1,2}\-?\s?[0-9]{3}[-\s]?[0-9]{4}/,
	},
	email: {
		type: String,
		required: true,
		maxLength: 256,
		trim: true,
		unique: true,
		match:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	},
	password: {
		type: String,
		required: true,
		maxLength: 256,
		select: false,
	},
	image: imageSchema,
	address: addressSchema,
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	isBusiness: {
		type: Boolean,
		required: true,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	failCount: {
		type: Number,
		default: 0,
	},
	lockedUntil: Number,
});

userSchema.virtual("isLocked").get(function () {
	return !!(this.lockedUntil && this.lockedUntil > Date.now());
});
const pepper = process.env.PEPPER || "pepper";

// hashing the password before saving a user (if the password is modified)
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	// hash the password
	const hash = await bcrypt.hash(pepper + this.password, 10);
	this.password = hash;
	next();
});
userSchema.pre("insertMany", async (next, docs: inputIUser[]) => {
	try {
		await Promise.all(
			docs.map(async (doc) => {
				doc.password = await bcrypt.hash(pepper + doc.password, 10);
			}),
		);
	} catch (error) {
		console.error(error);
	}
	next();
});

export default model("User", userSchema);
