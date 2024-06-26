import { connectDB } from "./db/db.service";
import chalk from "chalk";
import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import router from "./router/router";
import { handleError } from "./common/handleError";
import logger from "./logger/logger.service";
import { loadInitialData } from "./initialData/initialData.service";
import { corsLimitation, limiter } from "./utils";
export const app = express();
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
if (process.env.NODE_ENV !== "production") {
	dotenv.config({ path: ".dev.env" });
}
// Middleware
// cors limitation
app.use(corsLimitation);
// rate limiter for 100 requests per second
app.use(limiter);
// logger
if (logger) {
	app.use(logger);
}
// public folder for static files
app.use(express.static("public"));
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use(router);

// Handle Crashes and Errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	handleError(res, 500, err, "handling error");
	next();
});

const { PORT } = process.env || 8181;
app.listen(PORT, async () => {
	console.log(chalk.green(`Server is listening on http://localhost:${PORT}`));
	try {
		await connectDB();
		await loadInitialData();
	} catch (error) {
		console.log(chalk.redBright("Error connecting to DB"));
	}
});
