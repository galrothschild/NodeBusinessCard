import _ from "lodash";
import Card from "../models/mongodb/Card";

export const generateBizNumber: () => Promise<number | unknown> = async () => {
	try {
		const random = _.random(9_000_000, 10_000_000);
		const card = await Card.findOne({ random });
		if (card) {
			return generateBizNumber();
		}
		return random;
	} catch (error) {
		return error;
	}
};
