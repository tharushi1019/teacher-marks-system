import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};