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

// ✅ test route (browser / postman se check ke liye)
app.get("/", (req, res) => {
  res.send("Backend API is running ✅");
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
