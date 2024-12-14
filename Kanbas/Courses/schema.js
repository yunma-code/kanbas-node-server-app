import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		name: String,
		number: String,
		credits: Number,
		description: String,
		img: { type: String, default: "images/react.png" },
	},
	{ collection: "courses" }
);
export default courseSchema;