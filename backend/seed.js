import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./models/Student.js";
import Subject from "./models/Subject.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Student.deleteMany();
await Subject.deleteMany();

await Student.insertMany([
  { name: "John Silva", grade: "Grade 10" },
  { name: "Kavindu", grade: "Grade 11" }
]);

await Subject.insertMany([
  { name: "Mathematics" },
  { name: "Science" },
  { name: "English" }
]);

console.log("Seeded!");
process.exit();