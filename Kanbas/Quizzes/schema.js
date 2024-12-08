import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
	{
		/* add quiz attributes */
		quiz: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
	},
	{ collection: "quizzes" }
);
export default quizSchema;