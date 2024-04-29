import Joi from "joi";
import { urlRegex } from "../../../common/models";

const cardSchema = Joi.object({
	title: Joi.string().min(2).max(256).required(),
	subtitle: Joi.string().min(2).max(256).required(),
	description: Joi.string().min(2).max(1024).required(),
	phone: Joi.string()
		.ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
		.rule({ message: 'card "phone" mast be a valid phone number' })
		.required(),
	email: Joi.string()
		.ruleset.pattern(
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
		)
		.rule({ message: 'card "mail" mast be a valid mail' })
		.required(),

	web: Joi.string()
		.ruleset.regex(urlRegex)
		.rule({ message: 'card "web" mast be a valid url' }),

	image: Joi.object({
		url: Joi.string()
			.ruleset.regex(urlRegex)
			.rule({ message: 'card.image "url" mast be a valid url' })
			.allow(""),
		alt: Joi.string().min(2).max(256).allow(""),
	}).required(),
	address: Joi.object()
		.keys({
			state: Joi.string().allow(""),
			country: Joi.string().required(),
			city: Joi.string().required(),
			street: Joi.string().required(),
			houseNumber: Joi.number().required(),
			zip: Joi.number(),
		})
		.required(),
	bizNumber: Joi.number().allow(""),
	user_id: Joi.string().allow(""),
});

export const validateCardWithJoi = (card: unknown) => {
	return cardSchema.validate(card);
};
