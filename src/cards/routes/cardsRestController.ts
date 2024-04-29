import express, { type Request, type Response } from "express";
import {
	createCard,
	deleteCard,
	getCardByID,
	getCards,
	getCardsByUserID,
	likeCard,
	updateCard,
} from "../data/cardsDataAccessService";
import { handleError } from "../../common/handleError";
import { normalizeCard } from "../utils/normalizeCard";
import validateCard from "../validations/cardValidationService";
import type { ICard, inputICard } from "../models/ICard.model";
import type { ValidationResult } from "joi";
const router = express.Router();
// TODO: user_id and isAdmin are hardcoded for testing
const user_id = "65d9fbba624794ceee4f4b53";
const isAdmin = false;

router.get("/", async (req: Request, res: Response) => {
	try {
		// TODO: get user_id from request
		if (!user_id) {
			return handleError(res, 403, "Forbidden", "fetching cards");
		}
		return res.status(200).send(await Promise.resolve(getCards()));
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching cards");
	}
});

router.get("/my-cards", async (req: Request, res: Response) => {
	try {
		// TODO: get user_id from request
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
		const { error } = validateCard(card) as ValidationResult<unknown>;
		if (error) {
			return handleError(
				res,
				400,
				error.details.map((err) => err.message).join(", "),
				"creating card",
			);
		}
		const normalizedCard = await normalizeCard(card, user_id);
		const newCard = await createCard(normalizedCard);
		return res.status(201).send(newCard);
	} catch (error: unknown) {
		return handleError(res, 500, error, "creating card");
	}
});

router.put("/:id", async (req: Request, res: Response) => {
	try {
		const card = req.body as inputICard;
		const id = req.params.id;
		// TODO: get user_id from request
		const cardFromDB = (await getCardByID(id)) as ICard | null;
		if (!cardFromDB) {
			return handleError(res, 404, "Card not found", "updating card");
		}
		console.log(cardFromDB.user_id.toString(), user_id, isAdmin);
		if (cardFromDB.user_id.toString() === user_id && isAdmin) {
			return handleError(res, 403, "Unauthorized", "updating card");
		}
		// biome-ignore lint/suspicious/noExplicitAny: to avoid type errors
		const { error } = validateCard(card) as ValidationResult<any>;
		if (error) {
			return handleError(
				res,
				400,
				error.details.map((err) => err.message).join(", "),
				"updating card",
			);
		}
		const normalizedCard = await normalizeCard(card, user_id);

		const updatedCard = await updateCard(id, normalizedCard);
		return res.status(200).send(updatedCard);
	} catch (error: unknown) {
		return handleError(res, 500, error, "updating card");
	}
});
router.patch("/:id", async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		// TODO: get user_id from request
		const card = (await getCardByID(id)) as ICard | null;
		if (!card) {
			return handleError(res, 404, "Card not found", "updating card");
		}
		const likedCard = await likeCard(card, user_id);
		return res.status(200).send(likedCard);
	} catch (error: unknown) {
		return handleError(res, 500, error, "liking card");
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const card = (await getCardByID(id)) as ICard | null;
		if (!card) {
			return handleError(res, 404, "Card not found", "deleting card");
		}
		if (card.user_id.toString() !== user_id && !isAdmin) {
			return handleError(res, 403, "Unauthorized", "deleting card");
		}
		const success = await deleteCard(id, user_id);
		if (!success) {
			throw new Error("Error deleting card");
		}
		return res.status(200).send("Successfully deleted card");
	} catch (error: unknown) {
		return handleError(res, 500, error, "deleting card");
	}
});
export default router;
