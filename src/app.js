import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import testRoutes from "./routes/test.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ routes
app.use("/api/enroll", enrollmentRoutes);
app.use("/api/test", testRoutes);
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

// ES Modules require this to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Directory Name ="+__dirname)
console.log("File Name ="+__filename)

// ✅ Correct React build path (backend ke bahar)
const frontendBuildPath = "C:/Users/Fahad Javed/Desktop/iqra-quran-academy/frontend/iqra-quran-academy-react/dist";

console.log("Front end build path ="+frontendBuildPath)

// Serve React build
app.use(express.static(frontendBuildPath));

// Express 5 SPA wildcard fix
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});




export default app;
