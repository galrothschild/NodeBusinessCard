import chalk from "chalk";
import morgan from "morgan";
import { currentTime } from "../../common/time.service";
const logLevel = process.env.LOG_LEVEL || "ERROR";
export const morganLogger = morgan((tokens, req, res) => {
	const { year, month, day, hours, minutes, seconds } = currentTime();
	const currentDate = `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`;
	const status = tokens.status(req, res) || 500;
	if (logLevel === "ERROR" && +status < 400) {
		return;
	}
	return [
		chalk.hex("#34ace0").bold(currentDate),
		chalk.hex("#ffb142").bold(tokens.method(req, res)),
		chalk.hex(+status >= 400 ? "#ff5252" : "#2ed573").bold(status),
		chalk.hex("#2ed573").bold(tokens.url(req, res)),
		chalk.hex("#fffa65").bold(`${tokens["response-time"](req, res)} ms`),
		chalk.hex("#ff5252").bold(tokens["remote-addr"](req, res)),
	].join(" ");
});
