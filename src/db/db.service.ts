import mongoose from "mongoose";
import { connectToDBLocally } from "./mongodb/connectToDBLocally";
import { connectToAtlas } from "./mongodb/connectToAtlas";

const NODE_ENV = process.env.NODE_ENV || "development";
const DB = process.env.DB || "MONGODB";

export async function connectDB() {
	if (DB === "MONGODB") {
		if (NODE_ENV === "development") {
			return await connectToDBLocally();
		}
		if (NODE_ENV === "production") {
			return await connectToAtlas();
		}
	}
	console.log("DB not supported");
	return;
}
