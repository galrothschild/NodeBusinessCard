import { morganLogger } from "./loggers/morganLogger";
import type { RequestHandler } from "express";

const loggerType = process.env.logger || "morgan";
let logger: RequestHandler | null = null;
if (loggerType === "morgan") {
	logger = morganLogger;
}

export default logger;
