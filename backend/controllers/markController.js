import Mark from "../models/Mark.js";

export const addMark = async (req, res) => {
  const { studentId, subjectId, marks } = req.body;

  // Prevent duplicate subject per student
  const existing = await Mark.findOne({ studentId, subjectId });
  if (existing) {
    return res.status(400).json({ message: "Marks already added for this subject" });
  }

  // Validate marks
  if (marks < 0 || marks > 100) {
    return res.status(400).json({ message: "Marks must be between 0 and 100" });
  }

  const mark = await Mark.create({ studentId, subjectId, marks });
  res.json(mark);
};

export const updateMark = async (req, res) => {
  const { marks } = req.body;

  if (marks < 0 || marks > 100) {
    return res.status(400).json({ message: "Invalid marks" });
  }

  const updated = await Mark.findByIdAndUpdate(
    req.params.id,
    { marks },
    { new: true }
  );

  res.json(updated);
};

export const deleteMark = async (req, res) => {
  await Mark.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};

export const getMarksByStudent = async (req, res) => {
  const marks = await Mark.find({ studentId: req.params.id })
    .populate("subjectId");
  res.json(marks);
};

// Get ALL marks (for dashboard)
export const getAllMarks = async (req, res) => {
  try {
    const marks = await Mark.find()
      .populate("subjectId")
      .populate("studentId");

    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};