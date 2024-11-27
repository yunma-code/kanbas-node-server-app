import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updatedQuiz = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(updatedQuiz);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    await quizzesDao.deleteQuiz(quizId);
    res.send({ message: "Quiz deleted successfully" });
  });

  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = req.body;
    const createdQuiz = await quizzesDao.createQuiz(newQuiz);
    res.status(201).send(createdQuiz);
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
		console.log("received request for ", courseId);
		try {
			const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
			console.log("Quizz fetched from dao: ", quizzes);
			res.json(quizzes);
		}catch(error){
			console.error("error fetching quiz");
			res.status(500).send(error.message);
		}
  });
	app.get("/api/quizzes/:quizzId", (req, res) => {
		const { quizzId } = req.params;
    try {
      const quizz = quizzesDao.findQuizzesForCourse(quizzId);
      if (!quizz) {
        return res.status(404).send("Quizzes not found.");
      }
      res.json(quizz);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
