import rateLimit from "express-rate-limit";
import cors from "cors";

export const corsLimitation = cors({
	origin: [
		"http://localhost:3000",
		"http://localhost:8080",
		"http://localhost:5050",
	],
});

export const limiter = rateLimit({
	windowMs: 1000,
	max: 100,
});
