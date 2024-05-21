import chalk from "chalk";
import type { inputICard } from "../cards/models/ICard.model";
import type { inputIUser } from "../users/models/IUser.model";
import initialData from "./initialData.json";
import { initialDataMongo } from "./mongodb/initialDataMongo";
import { handleError } from "../common/handleError";

const db = process.env.DB || "MONGODB";

export const loadInitialData = async () => {
	if (db === "MONGODB") {
		return await initialDataMongo(initialData.users, initialData.cards);
	}
	return console.log(chalk.redBright("Db is not supported"));
};
