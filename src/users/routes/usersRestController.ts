import express, { type Response } from "express";
import {
	deleteUser,
	doesUserExist,
	getUserByID,
	getUsers,
	loginUser,
	registerUser,
	updateUser,
} from "../data/usersDataAccess.service";
import { handleError } from "../../common/handleError";
import { normalizeUser } from "../utils/normalizeUser";
import type { IUser, loginUserType } from "../models/IUser.model";
import {
	auth,
	type AuthenticatedRequest as Request,
} from "../../auth/auth.service";

const router = express.Router();

router.get("/", auth, async (req: Request, res: Response) => {
	try {
		const isAdmin = req.user?.isAdmin;
		if (!isAdmin) {
			return handleError(res, 403, "Forbidden", "getting users");
		}
		const users = await getUsers();
		return res.status(200).json(users);
	} catch (error: unknown) {
		return handleError(res, 500, error, "getting users");
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const user = req.body;
		const userExists = await doesUserExist(user.email, "email");
		if (userExists) {
			return handleError(res, 400, "User already exists", "registerring user");
		}
		const normalizedUser = normalizeUser(user);
		const newUser = await registerUser(normalizedUser);
		return res.status(201).json(newUser);
	} catch (error: unknown) {
		return handleError(res, 500, error, "registerring user");
	}
});

router.get("/:id", auth, async (req: Request, res: Response) => {
	try {
		const isAdmin = req.user?.isAdmin;
		const user_id = req.user?._id;
		if (isAdmin || user_id === req.params.id) {
			const user = await getUserByID(req.params.id);
			return res.status(200).json(user);
		}
		return handleError(res, 403, "Forbidden", "getting user");
	} catch (error: unknown) {
		console.log(error);
		return handleError(res, 404, error, "getting user");
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const user: loginUserType = req.body;
		const userExists = await doesUserExist(user.email, "email");
		if (!userExists) {
			return handleError(
				res,
				400,
				"Invalid Username or Password",
				"logging in user",
			);
		}
		const token = await loginUser(user);
		return res.status(200).send(token);
	} catch (error: unknown) {
		return handleError(res, 500, error, "logging in user");
	}
});

router.put("/:id", auth, async (req: Request, res: Response) => {
	try {
		const user = req.body;
		const id = req.params.id;
		const user_id = req.user?._id;
		const isAdmin = req.user?.isAdmin;
		if (isAdmin || user_id === id) {
			const updatedUser = await updateUser(id, user);
			return res.status(200).json(updatedUser);
		}
		return handleError(res, 403, "Forbidden", "updating user");
	} catch (error: unknown) {
		return handleError(res, 500, error, "updating user");
	}
});

router.delete("/:id", auth, async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user_id = req.user?._id;
		const isAdmin = req.user?.isAdmin;
		if (isAdmin || user_id === id) {
			const userExists = await doesUserExist(id, "id");
			if (!userExists) {
				return handleError(res, 404, "User not found", "deleting user");
			}
			const user = (await getUserByID(id)) as IUser;
			
			if (user.isAdmin) {
				return handleError(res, 403, "Can't delete an admin account", "deleting user");
			}
			await deleteUser(id);
			return res.status(204).send("User Deleted Successfully");
		}
		return handleError(res, 403, "Forbidden", "deleting user");
	} catch (error: unknown) {
		return handleError(res, 500, error, "deleting user");
	}
});

router.patch("/:id", auth, async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user_id = req.user?._id;
		const isAdmin = req.user?.isAdmin;
		if (isAdmin || user_id === id) {
			const user = (await getUserByID(id)) as IUser;
			if (!user) {
				return handleError(res, 404, "User not found", "updating user");
			}
			// Patch users business status
			const normalizedUser = {
				...normalizeUser(user),
				isBusiness: !user.isBusiness,
			};
			const patchedUser = await updateUser(id, normalizedUser);
			return res.status(200).send(patchedUser);
		}
		return handleError(res, 403, "Forbidden", "updating user");
	} catch (error: unknown) {
		return handleError(res, 500, error, "updating user");
	}
});

export default router;
