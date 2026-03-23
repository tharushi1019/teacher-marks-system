import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  },
  marks: { type: Number, required: true }
});

export default mongoose.model("Mark", markSchema);