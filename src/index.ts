import express, {
	type Request,
	type Response,
	type NextFunction,
} from "express";
import router from "./router/router";
import cors from "cors";
import { connectDB } from "./db/dbService";
import chalk from "chalk";
import { handleError } from "./common/handleError";

const app = express();
// Middleware
app.use(cors());
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
	} catch (error) {
		console.log(chalk.redBright("Error connecting to DB"));
	}
});
