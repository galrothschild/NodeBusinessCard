import type { Response } from "express";
import { handleError } from "../../common/handleError";
import type { ICard, inputICard } from "../models/ICard.model";
import Card from "../models/mongodb/Card";
const DB = process.env.DB || "MONGODB";

export const getCards: () => Promise<ICard[]> | Promise<unknown> = async () => {
	if (DB === "MONGODB") {
		try {
			const cards = (await Card.find()) as ICard[];
			return cards;
		} catch (error: unknown) {
			return Promise.reject("Error getting cards");
		}
	}
	return Promise.reject("DB not supported");
};

export const getCardByID: (id: string) => Promise<ICard> | Promise<unknown> =
	async (id) => {
		if (DB === "MONGODB") {
			try {
				const card = await Card.findById(id);
				if (card) {
					return Promise.resolve(card as ICard);
				}
				return Promise.reject("Card not found");
			} catch (error: unknown) {
				return Promise.reject({ error, status: 404 });
			}
		}
		return Promise.reject("DB not supported");
	};

export const getCardsByParam: (
	value: string | number,
	param: "user_id" | "bizNumber",
) => Promise<ICard[]> | Promise<unknown> = async (value, param) => {
	if (DB === "MONGODB") {
		try {
			if (param === "bizNumber") {
				const cards = (await Card.find({ bizNumber: value })) as ICard[];
				return cards.length > 0;
			}
			const cards = (await Card.find({ user_id: value })) as ICard[];
			return cards;
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const createCard: (
	card: inputICard,
) => Promise<ICard> | Promise<unknown> = async (card) => {
	if (DB === "MONGODB") {
		try {
			const cardExists = await Card.findOne({ email: card.email });
			if (cardExists) {
				return Promise.reject("A card with this email already exists.");
			}
			const newCard = new Card(card);
			return Promise.resolve(await newCard.save());
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const updateCard: (
	id: string,
	card: inputICard,
) => Promise<ICard> | Promise<unknown> = async (id, card) => {
	if (DB === "MONGODB") {
		try {
			const updatedCard = (await Card.findByIdAndUpdate(id, card, {
				new: true,
			})) as ICard;
			return Promise.resolve(updatedCard);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const deleteCard: (
	id: string,
	user_id: string,
) => Promise<string> | Promise<unknown> = async (id, user_id) => {
	if (DB === "MONGODB") {
		try {
			const deletedCard = await Card.findByIdAndDelete(id);
			return Promise.resolve(deletedCard);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const likeCard = async (card: ICard, user_id: string) => {
	if (DB === "MONGODB") {
		try {
			const cardDocument = new Card(card);
			const userIDIndex = card.likes.indexOf(user_id);
			if (userIDIndex !== -1) {
				cardDocument.likes.splice(cardDocument.likes.indexOf(user_id), 1);
				return await cardDocument.save();
			}
			cardDocument.likes.push(user_id);
			const likedCard = await cardDocument.save();
			return likedCard;
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const patchCardBusinessNumber = async (
	id: string,
	bizNumber: number,
) => {
	if (DB === "MONGODB") {
		try {
			const updatedCard = await Card.findByIdAndUpdate(
				id,
				{ bizNumber: bizNumber },
				{ new: true },
			);
			return updatedCard;
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
};
