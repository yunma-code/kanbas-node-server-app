import Database from "../Database/index.js";

export function updateQuiz(quizId, quizUpdates) {
  const { quizzes } = Database;
  const quiz = quizzes.find((quiz) => quiz._id === quizId);
  if (!quiz) throw new Error("Quiz not found");
  Object.assign(quiz, quizUpdates);
  return quiz;
}

export function deleteQuiz(quizId) {
  const { quizzes } = Database;
  Database.quizzes = quizzes.filter((quiz) => quiz._id !== quizId);
}

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: Date.now().toString() };
  Database.quizzes = [...Database.quizzes, newQuiz];
  return newQuiz;
}

export function findQuizzesForCourse(courseId) {
  const { quizzes } = Database;
	console.log("All quizzes:", quizzes); 
  return quizzes.filter((quiz) => quiz.course === courseId);
}
