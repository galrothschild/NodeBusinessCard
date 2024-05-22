import express, { type NextFunction, type Response } from "express";
import {
	createCard,
	deleteCard,
	getCardByID,
	getCards,
	getCardsByParam,
	likeCard,
	patchCardBusinessNumber,
	updateCard,
} from "../data/cardsDataAccess.service";
import { handleError } from "../../common/handleError";
import { normalizeCard } from "../utils/normalizeCard";
import validateCard from "../validations/cardValidation.service";
import type { ICard, inputICard } from "../models/ICard.model";
import type { ValidationResult } from "joi";
import {
	auth,
	type AuthenticatedRequest as Request,
} from "../../auth/auth.service";
const router = express.Router();

// get all cards
router.get("/", async (req: Request, res: Response) => {
	try {
		return res.status(200).send(await Promise.resolve(getCards()));
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching cards");
	}
});

// get my cards
router.get("/my-cards", auth, async (req: Request, res: Response) => {
	try {
		const user_id = req.user?._id;
		if (!user_id) {
			return handleError(res, 403, "Forbidden", "fetching cards");
		}
		const cards = await getCardsByParam(user_id, "user_id");
		return res.status(200).send(cards);
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching cards");
	}
});

// get card by id
router.get("/:id", async (req: Request, res: Response) => {
	try {
		return res
			.status(200)
			.send(await Promise.resolve(getCardByID(req.params.id)));
	} catch (error: unknown) {
		return handleError(res, 500, error, "fetching card");
	}
});

// create card
router.post("/", auth, async (req: Request, res: Response) => {
	try {
		const card = req.body as inputICard;
		const user_id = req.user?._id;
		const isBusiness = req.user?.isBusiness;
		if (!user_id || !isBusiness) {
			return handleError(res, 403, "Forbidden", "creating card");
		}

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

// update card by id
router.put("/:id", auth, async (req: Request, res: Response) => {
	try {
		const card = req.body as inputICard;
		const id = req.params.id;
		const user_id = req.user?._id;
		const isAdmin = req.user?.isAdmin;
		if (!user_id) {
			return handleError(res, 403, "Forbidden", "updating card");
		}
		const cardFromDB = (await getCardByID(id)) as ICard | null;
		if (!cardFromDB) {
			return handleError(res, 404, "Card not found", "updating card");
		}
		if (cardFromDB.user_id.toString() === user_id || isAdmin) {
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
		}
		return handleError(res, 403, "Unauthorized", "updating card");
	} catch (error: unknown) {
		return handleError(res, 500, error, "updating card");
	}
});

// like card (if bizNumber is not provided)
router.patch(
	"/:id",
	auth,
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { bizNumber } = req.body as { bizNumber: number };
			if (bizNumber) {
				return next();
			}
			const id = req.params.id;
			const user_id = req.user?._id;
			if (!user_id) {
				return handleError(res, 403, "Forbidden", "liking card");
			}
			const card = (await getCardByID(id)) as ICard | null;
			if (!card) {
				return handleError(res, 404, "Card not found", "updating card");
			}
			const likedCard = await likeCard(card, user_id);
			return res.status(200).send(likedCard);
		} catch (error: unknown) {
			return handleError(res, 500, error, "liking card");
		}
	},
);

// delete card by id
router.delete("/:id", auth, async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user_id = req.user?._id;
		if (!user_id) {
			return handleError(res, 403, "Forbidden", "deleting card");
		}
		const isAdmin = req.user?.isAdmin;
		const card = (await getCardByID(id)) as ICard | null;
		if (!card) {
			return handleError(res, 404, "Card not found", "deleting card");
		}
		if (isAdmin || card.user_id.toString() === user_id) {
			const success = await deleteCard(id, user_id);
			if (!success) {
				throw new Error("Error deleting card");
			}
			return res.status(200).send("Successfully deleted card");
		}
		return handleError(res, 403, "Unauthorized", "deleting card");
	} catch (error: unknown) {
		return handleError(res, 500, error, "deleting card");
	}
});

// Patch card business number
router.patch("/:id", auth, async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user_id = req.user?._id;
		const isAdmin = req.user?.isAdmin;
		const { bizNumber } = req.body as { bizNumber: number };
		if (!user_id || !isAdmin) {
			return handleError(
				res,
				403,
				"Forbidden",
				"updating card business number",
			);
		}
		const card = (await getCardByID(id)) as ICard | null;
		if (!card) {
			return handleError(
				res,
				404,
				"Card not found",
				"updating card business number",
			);
		}
		if (bizNumber > 10_000_000 || bizNumber < 9_000_000) {
			return handleError(
				res,
				400,
				"Business number must be between 9,000,000 and 10,000,000",
				"updating card business number",
			);
		}
		const isBizNumberTaken = (await getCardsByParam(
			bizNumber,
			"bizNumber",
		)) as ICard[];
		console.log(isBizNumberTaken);
		if (isBizNumberTaken) {
			return handleError(
				res,
				400,
				"Business number is already taken",
				"updating card business number",
			);
		}
		const updatedCard = await patchCardBusinessNumber(id, bizNumber);
		return res.status(200).send(updatedCard);
	} catch (error: unknown) {
		return handleError(res, 500, error, "updating card");
	}
});
export default router;
