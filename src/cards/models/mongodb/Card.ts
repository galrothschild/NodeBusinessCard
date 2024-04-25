import mongoose from "mongoose";
import { requiredString } from "../../../common/mongodb/mongoSchemas";

const cardSchema = new mongoose.Schema({
	title: requiredString,
	subtitle: requiredString,
});
