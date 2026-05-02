import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import testRoutes from "./routes/test.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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

// ✅ Direct correct path (tumhare folder ke hisaab se)
const frontendBuildPath = path.join(__dirname, "../../iqra-academy-react/dist");

console.log("Frontend Path:", frontendBuildPath);
console.log(
  "Index exists:",
  fs.existsSync(path.join(frontendBuildPath, "index.html")),
);

// ✅ Serve static files
app.use(express.static(frontendBuildPath));

// ✅ SPA fallback
app.use((req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});
// console.log(import.meta.env.BACKEND_URL);
export default app;
