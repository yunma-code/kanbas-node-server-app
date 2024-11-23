import express from "express";
import * as enrollmentDao from "./dao.js";

export default function EnrollmentRoutes (app) {
  app.post("/api/enrollments", (req, res) => {
    // console.log("Received POST /api/enrollments");
    // console.log("Request Body:", req.body);
  
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      console.error("Missing userId or courseId");
      return res.status(400).send({ error: "userId and courseId are required." });
    }
  
    enrollmentDao.enrollUserInCourse(userId, courseId);
    console.log("Enrollment successful:", { userId, courseId });
    res.status(201).send({ message: "Enrollment successful." });
    
  });
  

  app.delete("/api/enrollments", (req, res) => {
    const { userId, courseId } = req.body;
    try {
      enrollmentDao.unenrollUserFromCourse(userId, courseId);
      res.status(200).send({ message: "User successfully unenrolled." });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/api/enrollments/:userId", (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = enrollmentDao.getEnrollmentsByUser(userId);
      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
}
