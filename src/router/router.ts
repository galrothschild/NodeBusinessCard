import cardRouter from "../cards/routes/cardsRestController";
import userRouter from "../users/routes/usersRestController";
import { Router } from "express";

const router = Router();

router.use("/cards", cardRouter);
router.use("/users", userRouter);

export default router;
