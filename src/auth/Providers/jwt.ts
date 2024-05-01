import jwt from "jsonwebtoken";
import type { IUser } from "../../users/models/IUser.model";

const key = process.env.TOKEN_SECRET || "secret";
export const generateToken = (user: IUser) => {
	const { _id, isAdmin, isBusiness } = user;
	const token = jwt.sign({ _id, isAdmin, isBusiness }, key, {
		expiresIn: "1h",
	});
	return token;
};

export const verifyToken = (token: string) => {
	const decoded = jwt.verify(token, key);
	return decoded;
};
export type JwtPayload = {
	_id: string;
	isAdmin: boolean;
	isBusiness: boolean;
	exp: number;
	iat: number;
};
