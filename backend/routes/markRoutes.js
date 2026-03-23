import express from "express";
import { addMark, getMarksByStudent, updateMark, deleteMark } from "../controllers/markController.js";

const router = express.Router();

router.post("/", addMark);
router.get("/:id", getMarksByStudent);
router.put("/:id", updateMark);
router.delete("/:id", deleteMark);

export default router;