import express from "express";
import { addMark, getMarksByStudent, updateMark, deleteMark, getAllMarks } from "../controllers/markController.js";

const router = express.Router();

router.post("/", addMark);
router.get("/", getAllMarks);
router.get("/:id", getMarksByStudent);
router.put("/:id", updateMark);
router.delete("/:id", deleteMark);

export default router;