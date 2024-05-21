import chalk from "chalk";
import type { ICard, inputICard } from "../../cards/models/ICard.model";
import Card from "../../cards/models/mongodb/Card";
import type { IUser, inputIUser } from "../../users/models/IUser.model";
import User from "../../users/models/mongodb/User";

export const initialDataMongo = async (
	initialUsers: inputIUser[],
	initialCards: Omit<inputICard, "user_id">[],
) => {
	try {
		const usersLength = await User.countDocuments();
		if (!usersLength) {
			await User.insertMany(initialUsers);
		}
		const cardsLength = await Card.countDocuments();
		const user_id = (await User.findOne({ isBusiness: true }))?._id;
		if (!cardsLength) {
			await Card.insertMany(
				initialCards.map((card) => {
					return { ...card, user_id };
				}),
			);
		}
		if (!usersLength || !cardsLength)
			console.log(chalk.green("Initial Data Loaded"));
		return;
	} catch (error) {
		console.log(chalk.red(error));
	}
};
