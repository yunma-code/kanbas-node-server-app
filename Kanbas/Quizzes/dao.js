
// import Database from "../Database/index.js";
import model from "./model.js";

export function createQuiz(quiz) {
	delete quiz._id;
	return model.create(quiz);
}

export function updateQuiz(qid, quizUpdates) {
	return model.updateOne({ id: qid }, { $set: quizUpdates });
}

export function deleteQuiz(qid) {
  return model.deleteOne({ id: qid });
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findQuizById(qid) {
	return model.findOne({ id : qid });
}