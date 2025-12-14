import express from "express";
import fs from "fs";
import { transcribeAudio } from "../services/gemini.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No audio file provided",
      });
    }

    console.log("Received file:", req.file);
    const filePath = req.file.path;

    // Transcribe the audio
    const transcript = await transcribeAudio(filePath);

    // Clean up: delete the uploaded file
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    res.json({
      success: true,
      transcript,
    });
  } catch (error) {
    console.error("Transcription error:", error);
    res.status(500).json({
      error: "Failed to transcribe audio",
      details: error.message,
    });
  }
});

export default router;
