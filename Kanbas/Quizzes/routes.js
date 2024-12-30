import * as quizzesDao from "./dao.js";
import * as attemptsDao from "../Attempts/dao.js";

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

  app.patch('/api/quizzes/:quizId', async (req, res) => {
	const { quizId } = req.params;
	const { is_published } = req.body;
	try {
	  const result = await quizzesDao.updateQuiz(quizId, { is_published });
	  if (result.matchedCount === 0) {
		return res.status(404).send('Quiz not found');
	  };
	} catch (error) {
	  console.error('Error updating quiz:', error);
	  res.status(500).send('Error updating quiz');
	}
  });
  
	//attempt routes here
	
	//function to check if user has remaining attempts
	async function checkAttempts(req, res, next) {
		const { quizId } = req.params;
		const userId = req.user.id;
		const quiz = await quizzesDao.findQuizById(quizId);

		if(!quiz) {
			return res.status(404).send("Quiz is not found at checkAttempts");
		}

		const maxAttempt = quiz.attempts_number;
		const attemptCount = await attemptsDao.getAttemptCount(userId, quizId);

		if(attemptCount > maxAttempt){
			return res.status(400).send("You used up all attempts for this quiz");
		}
		next();
	}

	// routes to start an attempt in quiz
	app.post('/api/quizzes/:quizId/attempts', async (req, res) => {
		const { quizId } = req.params;
		const userId = req.user.id;

		try {
			await attemptsDao.createAttempt(userId, quizId);
		} catch (error) {
			console.error("Error starting quiz attempt: ", error);
			res.status(500).send("Error starting quiz attempt");
		}
	});

	// routes to finish an attempt
	app.patch('/api/quizzes/:quizId/attempts', async (req, res) => {
		const { quizId } = req.params;
		const userId = req.user.id;
		const { status } = req.body;

		try {
			await attemptsDao.updateAttempt(userId, quizId, status);
		} catch (error) {
			console.error("error updating quiz attempt status: ", error);
			res.status(500).send("error updating quiz attempt status");

		}
	});


}
  

