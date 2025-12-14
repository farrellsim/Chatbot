import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";
import transcribeRouter from "./routes/transcribe.js";

dotenv.config();

console.log(
  "API Key loaded:",
  process.env.GEMINI_API_KEY
    ? "Yes (" + process.env.GEMINI_API_KEY.substring(0, 10) + "...)"
    : "NO - KEY NOT FOUND"
);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRouter);
app.use("/api/transcribe", transcribeRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
