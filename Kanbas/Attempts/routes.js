import * as attemptDao from "./dao.js";

export default function AttemptRoutes(app) {

	// create new attempt 
  app.post("/api/quizzes/attempts", async (req, res) => {
    const newAttempt = req.body;
    const status = await attemptDao.createAttempt(newAttempt);
    console.log("new attempt: ", newAttempt);
    res.send(status);
  });

	// update an existing attempt
  app.put("/api/quizzes/attempts/:attemptId", async (req, res) => {
    try {
      const { attemptId } = req.params;
      const attemptUpdates = req.body;

      const updatedAttempt = await attemptDao.updateAttempt(attemptId, attemptUpdates);
      if (!updatedAttempt) {
        return res.status(404).json({ error: "Attempt not found" });
      }

      res.status(200).send(updatedAttempt); 
    } catch (error) {
      console.error("Error updating attempt:", error);
      res.status(500).json({ error: "Failed to update attempt" });
    }
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
