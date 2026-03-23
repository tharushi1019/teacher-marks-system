import Subject from "../models/Subject.js";

export const createSubject = async (req, res) => {
  const subject = await Subject.create(req.body);
  res.json(subject);
};

export const getSubjects = async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
};