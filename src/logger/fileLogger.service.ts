import fs from "node:fs";
import { currentTime } from "../common/time.service";

// date variable needs to be in the format of DD-MM-YYYY
export const fileLogger = (log: string, date: string) => {
	fs.appendFile(`./logs/${date}.log`, `${log}\n`, (err) => {
		if (err) {
			console.log(err);
		}
	});
};
