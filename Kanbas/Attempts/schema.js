import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema(
	{
		current_attempt: { type: Number, default: 1 },
		score: Number,
		answers: Array, 
		user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
		quiz: String,
		course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },

	},
	{ collection: "attempts" } 
);
export default attemptsSchema;