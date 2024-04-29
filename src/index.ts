import express, { Request, Response } from "express";
import router from "./router/router";
import cors from "cors";
import { connectDB } from "./db/dbService";
import chalk from "chalk";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

const { PORT } = process.env || 8181;
app.listen(PORT, async () => {
	console.log(chalk.green(`Server is listening on http://localhost:${PORT}`));
	try {
		await connectDB();
	} catch (error) {
		console.log(chalk.redBright("Error connecting to DB"));
	}
});
