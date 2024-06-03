import { Schema, model } from "mongoose";

const googleUserSchema = new Schema({
	name: String,
	email: {
		type: String,
		required: true,
		maxLength: 256,
		trim: true,
		unique: true,
		match:
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	},
});

export default model("GoogleUser", googleUserSchema);
