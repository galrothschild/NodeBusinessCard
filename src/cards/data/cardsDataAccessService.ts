import type { Response } from "express";
import { handleError } from "../../common/handleError";
import type { ICard } from "../models/ICard.model";
import Card from "../models/mongodb/Card";
const DB = process.env.DB || "MONGODB";

export const getCards: () =>
	| Promise<ICard[]>
	// biome-ignore lint/suspicious/noExplicitAny: Needs to be Any.
	| Response<any, Record<string, any>> = async () => {
	if (DB === "MONGODB") {
		try {
			const cards = (await Card.find()) as ICard[];
			return cards;
		} catch (error: unknown) {
			return Promise.reject(
				handleError(
					error as Response<string, Record<string, string>>,
					500,
					"Error getting cards",
				),
			);
		}
	}
	return Promise.reject("DB not supported");
};

export const getCardByID: (id: string) =>
	| Promise<ICard>
	// biome-ignore lint/suspicious/noExplicitAny: Needs to be Any.
	| Response<any, Record<string, any>> = async (id) => {
	if (DB === "MONGODB") {
		try {
			const card = (await Card.findById(id)) as ICard;
			if (card) {
				return card;
			}
			return Promise.reject("Card not found");
		} catch (error: unknown) {
			return Promise.reject({ error, status: 404 });
		}
	}
	return Promise.reject("DB not supported");
};

export const createCard: (card: ICard) =>
	| Promise<ICard>
	// biome-ignore lint/suspicious/noExplicitAny: Needs to be Any.
	| Response<any, Record<string, any>> = async (card) => {
	if (DB === "MONGODB") {
		try {
			console.log(card);
			const newCard = new Card(card);
			return await newCard.save();
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};
