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

export const getCardsByUserID: (
	user_id: string,
) => Promise<ICard[]> | Promise<unknown> = async (user_id) => {
	if (DB === "MONGODB") {
		try {
			const cards = (await Card.find({ user_id })) as ICard[];
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
			return await newCard.save();
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
			const cardExists = await Card.findById(id);
			if (!cardExists) {
				return Promise.reject("Card not found");
			}
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

export const deleteCard: (id: string) => Promise<ICard> | Promise<unknown> =
	async (id) => {
		if (DB === "MONGODB") {
			try {
				const cardExists = await Card.findById(id);
				if (!cardExists) {
					return Promise.reject("Card not found");
				}
				const deletedCard = (await Card.findByIdAndDelete(id)) as ICard;
				return Promise.resolve(deletedCard);
			} catch (error: unknown) {
				return Promise.reject(error);
			}
		}
		return Promise.reject("DB not supported");
	};
