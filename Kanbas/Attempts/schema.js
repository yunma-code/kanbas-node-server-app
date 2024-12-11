import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema(
	{
		current_attempt: Number,
		score: Number,
		answers: Array, 
		user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
		quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
		course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },

	},
	{ collection: "attempts" } 
);
export default attemptsSchema;