import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// System prompt for your learning app
const SYSTEM_PROMPT = `You are a friendly and helpful learning assistant. 
Your role is to:
- Explain concepts clearly and simply
- Ask follow-up questions to check understanding
- Provide examples when helpful
- Encourage the student and be patient
- Keep responses concise but thorough

Adapt your explanations to the student's level.`;

// Chat completion with conversation history
export async function getChatResponse(messages) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  // Convert messages to Gemini format
  const history = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const chat = model.startChat({ history });

  // Get the last message (current user input)
  const lastMessage = messages[messages.length - 1].content;

  const result = await chat.sendMessage(lastMessage);
  return result.response.text();
}

// Transcribe audio using Gemini's multimodal capabilities
export async function transcribeAudio(filePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  // Read audio file as base64
  const audioData = fs.readFileSync(filePath);
  const base64Audio = audioData.toString("base64");

  // Determine mime type based on file extension
  const ext = filePath.split(".").pop().toLowerCase();
  const mimeTypes = {
    m4a: "audio/mp4",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    webm: "audio/webm",
  };
  const mimeType = mimeTypes[ext] || "audio/mp4";

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: mimeType,
        data: base64Audio,
      },
    },
    {
      text: "Transcribe this audio accurately. Only output the transcription, nothing else.",
    },
  ]);

  return result.response.text();
}
