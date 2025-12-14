import { GoogleGenerativeAI } from "@google/generative-ai";

// Paste your API key directly here (just for testing!)
const API_KEY = "test";

const genAI = new GoogleGenerativeAI(API_KEY);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say hello");
    console.log("SUCCESS:", result.response.text());
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

test();
