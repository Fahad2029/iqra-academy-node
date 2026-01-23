import { db } from "../database.js";
import logger from "../logger.js";

export const createEnrollment = (req, res) => {
  const { name, phone, email, course } = req.body;
  console.log("BODY RECEIVED 👉", req.body);
  logger.info(`Received enrollment: ${JSON.stringify(req.body)}`);

  if (!name || !phone || !email || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "INSERT INTO enrollments (name, phone, email, course) VALUES (?, ?, ?, ?)";
  db.query(query, [name, phone, email, course], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Enrollment created", id: result.insertId });
  });
};
