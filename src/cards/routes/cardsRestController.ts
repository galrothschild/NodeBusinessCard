import express, { type Request, type Response } from "express";
import { getCardByID, getCards } from "../data/cardsDataAccessService";
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

export default router;
