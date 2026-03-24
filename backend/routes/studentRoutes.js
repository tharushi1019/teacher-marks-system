import express from "express";
import { 
  createStudent, 
  getStudents,
  deleteStudent 
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);

// ✅ NEW DELETE ROUTE
router.delete("/:id", deleteStudent);

export default router;