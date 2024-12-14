import mongoose from "mongoose";

const attemptsSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
		// course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
		quiz: String, // qid
		attempt_count: { type: Number, default: 1 },
		status: {type: String, default: "in-progress" },
		score: Number,
		answers: Array,
	},
	{ collection: "attempts" } 
);
export default attemptsSchema;