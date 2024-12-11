import * as quizzesDao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function QuizRoutes(app) {
  app.put("/api/quizzes/:quizId", async (req, res) => {
		const { quizId } = req.params;
		const quizUpdates = req.body;
		const updatedQuiz = await quizzesDao.updateQuiz(quizId, quizUpdates);
		console.log("updatedQuiz: ", updatedQuiz);
		res.send(updatedQuiz);
  });


  app.delete("/api/quizzes/:quizId", async (req, res) => {
		const { quizId } = req.params;
		const status = await quizzesDao.deleteQuiz(quizId);
		res.send(status);
  });


  app.post("/api/quizzes", async (req, res) => {
		const newQuiz = req.body;
		const status = await quizzesDao.createQuiz(newQuiz);
		console.log("createQuiz status",status);
		res.send(status);
  });


  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
		const { courseId } = req.params;
		//const course = await coursesDao.findCourseById(courseId);
		const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
		res.json(quizzes);
    
  });


  app.get("/api/quizzes/:quizId", async (req, res) => {   
		const { quizId } = req.params;
		const quiz = await quizzesDao.findQuizById(quizId);

		res.json(quiz);
  });
}
