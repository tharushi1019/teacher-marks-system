import Student from "../models/Student.js";

// CREATE student (unchanged + safe)
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET students (WITH GRADE FILTER ✅)
export const getStudents = async (req, res) => {
  try {
    const { grade } = req.query;

    let students;

    if (grade) {
      students = await Student.find({ grade });
    } else {
      students = await Student.find();
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE student (NEW ✅)
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};