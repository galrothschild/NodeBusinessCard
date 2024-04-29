import express, { type Request, type Response } from "express";
import {
	createCard,
	getCardByID,
	getCards,
} from "../data/cardsDataAccessService";
import { handleError } from "../../common/handleError";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		return await Promise.resolve(getCards());
	} catch (error: unknown) {
		return handleError(
			error as Response<string, Record<string, string>>,
			500,
			"Error getting cards",
		);
	}
});

router.get("/:id", async (req: Request, res: Response) => {
	try {
		return await Promise.resolve(getCardByID(req.params.id));
	} catch (error: unknown) {
		return handleError(
			error as Response<string, Record<string, string>>,
			500,
			"Error getting card",
		);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const card = await Promise.resolve(createCard(req.body));
		return res.status(201).send(card);
	} catch (error: unknown) {
		handleError(res, 500, `Error creating card: ${error}`);
	}
});

export default router;
