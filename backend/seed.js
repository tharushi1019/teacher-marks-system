import mongoose from "mongoose";
import dotenv from "dotenv";

import Student from "./models/Student.js";
import Subject from "./models/Subject.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// 🇱🇰 Sri Lankan names
const names = [
  "Kasun Perera", "Nadeesha Silva", "Tharindu Fernando",
  "Saman Kumara", "Dilani Jayasuriya", "Chamath Perera",
  "Nimali Fernando", "Ravindu Silva", "Ishara Perera",
  "Lakshan Jayawardena", "Sajith Kumara", "Nirosha Silva",
  "Thilini Fernando", "Kavindu Perera", "Sanduni Silva",
  "Amila Jayasinghe", "Piumi Fernando", "Gayan Perera",
  "Sachini Silva", "Dinesh Fernando"
];

// 📚 15 Subjects
const subjectsData = [
  { name: "Mathematics" },
  { name: "Science" },
  { name: "English" },
  { name: "Sinhala" },
  { name: "History" },
  { name: "Geography" },
  { name: "Buddhism" },
  { name: "ICT" },
  { name: "Commerce" },
  { name: "Tamil" },
  { name: "Art" },
  { name: "Music" },
  { name: "Drama" },
  { name: "Health Science" },
  { name: "Civic Education" }
];

const seedData = async () => {
  try {
    // clear old data
    await Student.deleteMany();
    await Subject.deleteMany();

    // insert subjects
    const subjects = await Subject.insertMany(subjectsData);

    // insert students (5 per grade)
    let students = [];

    for (let grade = 1; grade <= 13; grade++) {
      for (let i = 0; i < 5; i++) {
        students.push({
          name: names[Math.floor(Math.random() * names.length)],
          grade: grade.toString()
        });
      }
    }

    await Student.insertMany(students);

    console.log("🌱 Database seeded successfully!");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();