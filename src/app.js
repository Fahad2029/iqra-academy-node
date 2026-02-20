import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import testRoutes from "./routes/test.routes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Morgan logs all incoming requests in dev-friendly format
app.use(morgan("dev"));

// Example custom log for every request
app.use((req, res, next) => {
  logger.debug(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// ✅ routes
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/test", testRoutes);



export default app;
