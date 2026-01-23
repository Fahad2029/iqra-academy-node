import express from "express";
import { createEnrollment } from "../controllers/enrollmentController.js";

const router = express.Router();

// POST http://localhost:5000/api/enroll
router.post("/", createEnrollment);

// GET test (very important for debugging)
router.get("/", (req, res) => {
  res.json({ message: "Enroll route working ✅" });
});

export default router;
