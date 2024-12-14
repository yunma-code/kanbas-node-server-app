import model from "./model.js";
/* wrap the attempt logics in server side:
1. check if there is existing attempt, else create new attempt
2. update status of user's attempt
3. include attempt routes in quiz routes file
*/

export async function createAttempt(userId, quizId, score, answers) {
	const existingAttempt = await model.findOne({ user: userId, quiz: quizId });

	if(existingAttempt) {
		return model.updateOne(
			{ user: userId, quiz: quizId },
			{ $inc: { attempt_count: 1}, //increment curr attempt
				$set: { 
					status: "in-progress",
				  score: score,
				  answers: answers
				} 
			}
		);
	} else {
		return model.create({
			user: userId,
			quiz: quizId,
			attempt_count: 1,
			status: "in-progress",
			score: score,
			answers: answers
		});
	}
}

export async function getAttemptCount(userId, quizId) {
	const attempt = await model.findOne({ user: userId, quiz: quizId });
	return attempt ? attempt.attempt_count : 0;
}


export async function updateAttempt(userId, quizId, status, score, answers){
	return await model.findByIdAndUpdate(
		{ user: userId, quiz: quizId },
		{ $set: { status, score, answers } }
	);
}

// export async function findAttemptByQuiz(quizId) {
// 	if(typeof quizId !== "string") {
// 		throw new Error("quizId must be a string");
// 	}
// 	return await model.findOne({ quiz: quizId });
// }
