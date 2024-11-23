// const express = require("express"); //equivalent to import
import express from "express";
import HelloRoutes from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config";
import session from "express-session";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignment/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

const app = express();
app.use(express.json());
// support cookies and restrict cross origin source
// configure cors first, then server sessions
app.use(cors({
	credentials: true,
	origin: process.env.NETLIFY_URL,
}));
// default session config
const sessionOptions = {
	secret: process.env.SESSION_SECRET || "kanbas",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
	session(sessionOptions)
);
UserRoutes(app);
EnrollmentRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);


Lab5(app);
HelloRoutes(app);

// node.js port
app.listen(process.env.PORT || 4000);