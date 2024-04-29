import { validateCardWithJoi } from "./joi/ValidateCard";

const validator = process.env.VALIDATOR || "Joi";

export default function validateCard(card: unknown) {
	if (validator === "Joi") {
		return validateCardWithJoi(card);
	}
	return false;
}
