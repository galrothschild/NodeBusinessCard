import { generateToken } from "../../auth/Providers/jwt";
import type { IUser, inputIUser } from "../models/IUser.model";
import User from "../models/mongodb/User";
import bcrypt from "bcrypt";

const DB = process.env.DB || "MONGODB";

export const registerUser: (
	user: inputIUser,
) => Promise<IUser> | Promise<unknown> = async (user) => {
	if (DB === "MONGODB") {
		try {
			const newUser = new User(user);
			return Promise.resolve(await newUser.save());
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const updateUser: (
	id: string,
	inputUser: inputIUser,
) => Promise<IUser> | Promise<unknown> = async (id, inputUser) => {
	if (DB === "MONGODB") {
		try {
			const user = (await User.findByIdAndUpdate(id, inputUser, {
				new: true,
			})) as IUser;
			return Promise.resolve(user);
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
				const user = await User.findById(id);
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

const pepper = process.env.PEPPER || "pepper";

export const loginUser: (user: {
	email: string;
	password: string;
}) => Promise<string> = async (user) => {
	if (DB === "MONGODB") {
		const { email, password } = user;
		try {
			const userFromDB = (await User.findOne({
				email: email.toLowerCase(),
			}).select("+password")) as IUser;
			const isValidPassword = await bcrypt.compare(
				pepper + password,
				userFromDB.password,
			);
			if (isValidPassword) {
				const token = generateToken(userFromDB);
				return Promise.resolve(token);
			}
			return Promise.reject("Invalid Email or Password");
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const doesUserExist: (
	value: string,
	type: "email" | "id",
) => Promise<boolean> = async (value, type) => {
	if (DB === "MONGODB") {
		let searchObj: { email: string } | { _id: string } = { email: "" };
		if (type === "email") {
			searchObj = { email: value.toLowerCase() };
		} else if (type === "id") {
			searchObj = { _id: value };
		}
		try {
			const user = await User.findOne(searchObj);
			if (user) {
				return Promise.resolve(true);
			}
			return Promise.resolve(false);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};

export const deleteUser: (id: string) => Promise<IUser> | Promise<unknown> = (
	id,
) => {
	if (DB === "MONGODB") {
		try {
			return User.findByIdAndDelete(id);
		} catch (error: unknown) {
			return Promise.reject(error);
		}
	}
	return Promise.reject("DB not supported");
};
