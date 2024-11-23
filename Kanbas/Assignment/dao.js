import Database from "../Database/index.js";

export function updateAssignment(assignmentId, assignmentUpdate) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found.`);
  }
  Object.assign(assignment, assignmentUpdate);
  return assignment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  const assignmentExists = assignments.some((assignment) => assignment._id === assignmentId);
  if (!assignmentExists) {
    throw new Error(`Assignment with ID ${assignmentId} not found.`);
  }
  Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  return { success: true };
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function findAssignmentById(assignmentId) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found.`);
  }
  return assignment;
}
