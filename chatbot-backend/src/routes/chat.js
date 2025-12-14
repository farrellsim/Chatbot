import express from "express";
import { getChatResponse } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages array is required",
      });
    }

    const reply = await getChatResponse(messages);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Failed to get response",
      details: error.message,
    });
  }
});

export default router;
