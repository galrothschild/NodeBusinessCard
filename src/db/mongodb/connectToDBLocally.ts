import chalk from "chalk";
import mongoose from "mongoose";

export const connectToDBLocally = async () => {
	const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
	try {
		await mongoose.connect(MONGO_URI);
		console.log(chalk.magentaBright("Connected to MongoDB"));
	} catch (error) {
		console.log(chalk.redBright(`Error connecting to MongoDB: ${error}`));
	}
};