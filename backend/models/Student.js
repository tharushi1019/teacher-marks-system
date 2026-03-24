import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { 
    type: String, 
    required: true,
    enum: Array.from({ length: 13 }, (_, i) => (i + 1).toString()) // ✅ Grade 1–13
  }
}, { timestamps: true }); // ✅ optional (good practice)

export default mongoose.model("Student", studentSchema);