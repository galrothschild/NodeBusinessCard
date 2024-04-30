import type { IUser, inputIUser } from "../models/IUser.model";
import User from "../models/mongodb/User";

const DB = process.env.DB || "MONGODB";

export const registerUser: (
	user: inputIUser,
) => Promise<IUser> | Promise<unknown> = async (user) => {
	if (DB === "MONGODB") {
		try {
			const userExists = await User.findOne({ email: user.email });
			if (userExists) {
				return Promise.reject("A user with this email already exists.");
			}
			const newUser = new User(user);
			return Promise.resolve(await newUser.save());
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const getUserByID: (id: string) => Promise<IUser> | Promise<unknown> =
	async (id) => {
		if (DB === "MONGODB") {
			try {
				const user = (await User.findById(id)) as IUser;
				if (user) {
					return Promise.resolve(user);
				}
				return Promise.reject("User not found");
			} catch (error: unknown) {
				return Promise.reject({ error });
			}
		}
		return Promise.reject("DB not supported");
	};

export const getUsers: () => Promise<IUser[]> | Promise<unknown> = async () => {
	if (DB === "MONGODB") {
		try {
			const users = (await User.find()) as IUser[];
			return Promise.resolve(users);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};
