import model from "./model.js";

export function createAttempt(attempt) {
	delete attempt._id;
	return model.create(attempt);
}

export function updateAttempt(attemptId, attemptUpdates) {
	return model.updateOne(
    { _id: attemptId }, 
    { $set: {
				current_attempt: attemptUpdates.current_attempt, 
        score: attemptUpdates.score,
				answers: attemptUpdates.answers,             
      }
    }
  );
}

export function findAttemptByQuiz(qid) {
	return model.find({ id : qid });
}
