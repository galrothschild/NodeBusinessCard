import type { Response } from "express";
import { handleError } from "../../common/handleError";
import type { ICard } from "../models/ICard.model";

const DB = process.env.DB || "MONGODB";

export const getCards: () =>
	| Promise<ICard[]>
	// biome-ignore lint/suspicious/noExplicitAny: Needs to be Any.
	| Response<any, Record<string, any>> = async () => {
	if (DB === "MONGODB") {
		try {
			return [] as ICard[];
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
			return {} as unknown as ICard;
		} catch (error: unknown) {
			return Promise.reject({ error, status: 404 });
		}
	}
	return Promise.reject("DB not supported");
};
