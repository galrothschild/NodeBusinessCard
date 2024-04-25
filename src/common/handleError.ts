import chalk from "chalk";
import type { Response } from "express";
import type { ValidationError } from "joi";

export const handleError = (res: Response, status: number, message = "") => {
	console.error(chalk.redBright(message));
	return res.status(status).send(message);
};

export const handleJoiError: (
	error: ValidationError,
) => Promise<ValidationError> = async (error) => {
	const errorMessage = error.details.map((detail) => detail.message).join(", ");
	error.message = errorMessage;
	console.error(chalk.redBright(error.message));
	return Promise.reject({ ...error, status: 400 });
};
