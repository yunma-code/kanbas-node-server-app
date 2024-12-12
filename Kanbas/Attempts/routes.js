import * as attemptDao from "./dao.js";

export default function AttemptRoutes(app) {

	// create new attempt 
  app.post("/api/quizzes/attempts", async (req, res) => {
    const newAttempt = req.body;
    const status = await attemptDao.createAttempt(newAttempt);
    console.log("new attempt: ", newAttempt);
    res.send(status);
  });

	// update current attempt 
  app.post("/api/quizzes/attempts/:attemptId", async (req, res) => {
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
