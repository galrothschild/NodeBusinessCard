import type { inputIUser } from "../models/IUser.model";

export const normalizeUser = (user: inputIUser) => {
	const image = {
		url:
			user.image.url ||
			"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
		alt: user.image.alt || "User Profile Picture",
	};
	const normalizedUser = {
		name: user.name,
		phone: user.phone,
		email: user.email,
		password: user.password,
		address: user.address,
		image: image,
		isAdmin: false,
		isBusiness: user.isBusiness,
	};
	return normalizedUser;
};
