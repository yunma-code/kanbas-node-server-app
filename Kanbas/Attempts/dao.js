import model from "./model.js";

export function createAttempt(attempt) {
	delete attempt._id;
	return model.create(attempt);
}

export async function updateAttempt(attemptId, attemptUpdates) {
	return await model.findByIdAndUpdate(
		attemptId,
		{ $set: attemptUpdates },
		{ new: true }
	);
}

export async function findAttemptByQuiz(quizId) {
	return await model.find({ quiz: quizId });
}
