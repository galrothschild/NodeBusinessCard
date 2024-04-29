import express, { type Request, type Response } from "express";
import {
	createCard,
	getCardByID,
	getCards,
	getCardsByUserID,
} from "../data/cardsDataAccessService";
import { handleError } from "../../common/handleError";
import { normalizeCard } from "../utils/normalizeCard";
import validateCard from "../validations/cardValidationService";
import type { inputICard } from "../models/ICard.model";
import { MongooseError } from "mongoose";
import e from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		return res.status(200).send(await Promise.resolve(getCards()));
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching cards");
	}
});

router.get("/my-cards", async (req: Request, res: Response) => {
	try {
		// TODO: get user_id from request
		const user_id = "65d9fbba624794ceee4f4b53";
		const cards = await getCardsByUserID(user_id);
		return res.status(200).send(cards);
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching cards");
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		return res
			.status(200)
			.send(await Promise.resolve(getCardByID(req.params.id)));
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching card");
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const card = req.body as inputICard;
		// TODO: get user_id from request
		const user_id = "65d9fbba624794ceee4f4b53";
		const isValid = validateCard(card);
		if (!isValid) {
			return handleError(res, 400, "Invalid card", "creating card");
		}
		const normalizedCard = await normalizeCard(card, user_id);
		const newCard = await createCard(normalizedCard);
		return res.status(201).send(newCard);
	} catch (error: unknown) {
		return handleError(res, 500, error, "creating card");
	}
});

export default router;
