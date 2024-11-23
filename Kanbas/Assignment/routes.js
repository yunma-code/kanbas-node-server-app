import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    try {
      const assignments = assignmentDao.findAssignmentsForCourse(courseId);
      if (!assignments || assignments.length === 0) {
        return res.status(404).send("No assignments found for this course.");
      }
      res.json(assignments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    try {
      const assignment = assignmentDao.findAssignmentById(assignmentId);
      if (!assignment) {
        return res.status(404).send("Assignment not found.");
      }
      res.json(assignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.post("/api/assignments", (req, res) => {
    const assignment = req.body;
    try {
      const newAssignment = assignmentDao.createAssignment(assignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.put("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdate = req.body;
    try {
      const updatedAssignment = assignmentDao.updateAssignment(assignmentId, assignmentUpdate);
      if (!updatedAssignment) {
        return res.status(404).send("Assignment not found.");
      }
      res.json(updatedAssignment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  app.delete("/api/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    try {
      const status = assignmentDao.deleteAssignment(assignmentId);
      if (!status) {
        return res.status(404).send("Assignment not found.");
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
