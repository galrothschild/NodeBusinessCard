import chalk from "chalk";
import morgan from "morgan";
import { currentTime } from "../../common/time.service";
import { fileLogger } from "../fileLogger.service";
const logLevel = process.env.LOG_LEVEL || "ERROR";
export const morganLogger = morgan((tokens, req, res) => {
	const { year, month, day, hours, minutes, seconds } = currentTime();
	const currentDate = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
	const status = tokens.status(req, res) || 500;
	if (logLevel === "ERROR" && +status < 400) {
		return;
	}
	const log = [
		currentDate,
		tokens.method(req, res),
		status,
		tokens.url(req, res),
		`${tokens["response-time"](req, res)} ms`,
		tokens["remote-addr"](req, res),
	].join(" ");
	if (+status >= 400) {
		fileLogger(log, `${day}-${month}-${year}`);
		return chalk.redBright(log);
	}
	return chalk.green(log);
});
