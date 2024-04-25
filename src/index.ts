import express, { Request, Response } from "express";
import router from "./router/router";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(3000, () => {
	console.log("Server is listening on http://localhost:3000");
});
