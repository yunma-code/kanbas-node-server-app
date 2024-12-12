import * as attemptDao from "./dao.js";

export default function AttemptRoutes(app) {

	// create attempt 
  app.post("/api/quizzes/attempt", async (req, res) => {
    const newAttempt = req.body;
    const status = await attemptDao.createAttempt(newAttempt);
    res.send(status);
  });
  

	// update attempt 
  app.put("/api/quizzes/attempt/:attemptId", async (req, res) => {
    const { attemptId } = req.params;
    const attemptUpdates = req.body;
		const updatedAttempt = await attemptDao.updateAttempt(attemptId, attemptUpdates);
		res.send(updatedAttempt);
  });


	// receive attempt 
  // app.get("/api/courses/:courseId/quizzes/:quizId/attempt", async (req, res) => {
  //   const { courseId, quizId } = req.params;
  //   const attempts = await attemptDao.findAttemptByQuiz(quizId);
  // });

  app.get("/api/quizzes/:quizId/attempt", async (req, res) => {
    const { quizId } = req.params;
		const attempts = await attemptDao.findAttemptByQuiz(quizId);
		res.json(attempts);
  });
}
