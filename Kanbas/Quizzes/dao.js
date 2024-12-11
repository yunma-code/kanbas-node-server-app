
// import Database from "../Database/index.js";
import model from "./model.js";

export function createQuiz(quiz) {
	delete quiz._id;
	return model.create(quiz);
}

export function updateQuiz(qid, quizUpdates) {
	return model.updateOne({ _id: qid }, { $set: quizUpdates });
}

export function deleteQuiz(qid) {
  return model.deleteOne({ _id: qid });
}

export function createQuiz(quiz) {
  delete quiz._id;
  return model.create(quiz);
}

export function findQuizzesForCourse(cid) {
  return model.find({ cid: cid });

}