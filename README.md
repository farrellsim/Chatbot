# AI Learning Chatbot 🤖

An intelligent mobile learning assistant built with React Native and powered by Google Gemini AI. This chatbot helps students learn by providing clear explanations, answering questions, and supporting both text and voice interactions.

## Features ✨

- 💬 **Text-based Chat**: Type questions and get instant AI-powered responses
- 🎤 **Voice Input**: Hold the mic button to ask questions using your voice
- 🔊 **Text-to-Speech**: Long-press any message to hear it read aloud
- 📱 **Cross-platform**: Works on both iOS and Android devices
- 🎨 **Modern UI**: Clean, intuitive chat interface with message bubbles
- 🧠 **Context-aware**: Remembers conversation history for coherent discussions
- ⚡ **Real-time Responses**: Fast AI-powered answers for educational queries

## Tech Stack 🛠️

### Frontend (Mobile App)

- **React Native** with Expo - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **NativeWind/Tailwind CSS** - Utility-first styling
- **Expo AV** - Audio recording
- **Expo Speech** - Text-to-speech functionality

### Backend (API Server)

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API
- **Google Gemini API** - AI language model
- **Multer** - File upload handling
- **dotenv** - Environment variable management

## Prerequisites 📋

Before you begin, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo Go app** - Install on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **Google Gemini API Key** - [Get free key](https://aistudio.google.com)

## Installation 🚀

### 1. Clone the Repository (if applicable)

```bash
git clone <your-repo-url>
cd chatbot-project
```

### 2. Set Up the Backend

```bash
# Navigate to backend folder
cd chatbot-backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Set Up the Frontend

```bash
# Navigate to frontend folder (from project root)
cd CHATBOT

# Install dependencies
npm install
```

**Configure API URL in `src/services/api.ts`:**

```typescript
// For physical device, use your computer's IP address
const API_BASE_URL = "http://YOUR_COMPUTER_IP:3000/api";

// Examples:
// iOS Simulator: 'http://localhost:3000/api'
// Android Emulator: 'http://10.0.2.2:3000/api'
// Physical Device: 'http://192.168.1.XXX:3000/api'
```

**To find your computer's IP:**

- **Mac**: `ipconfig getifaddr en0`
- **Windows**: `ipconfig` (look for IPv4 Address)
- **Linux**: `hostname -I`

## Running the Application ▶️

### Start the Backend Server

```bash
cd chatbot-backend
npm run dev
```

You should see: `Server running on http://localhost:3000`

### Start the React Native App

```bash
cd CHATBOT
npx expo start
```

### Test on Your Device

1. Open **Expo Go** app on your phone
2. Scan the QR code shown in your terminal
3. Wait for the app to load
4. Start chatting!

**Important**: Make sure your phone and computer are on the same Wi-Fi network.

## Project Structure 📁

```
chatbot-project/
├── chatbot-backend/          # Backend API server
│   ├── src/
│   │   ├── index.js         # Entry point
│   │   ├── routes/
│   │   │   ├── chat.js      # Chat endpoint
│   │   │   └── transcribe.js # Voice transcription
│   │   ├── services/
│   │   │   └── gemini.js    # Gemini API integration
│   │   └── middleware/
│   │       └── upload.js    # File upload handler
│   ├── uploads/             # Temporary audio files
│   ├── .env                 # API keys (DO NOT COMMIT)
│   └── package.json
│
└── CHATBOT/                  # React Native app
    ├── app/
    │   ├── _layout.tsx      # Root layout
    │   └── index.tsx        # Main chat screen
    ├── src/
    │   ├── components/
    │   │   ├── ChatBubble.tsx
    │   │   ├── ChatInput.tsx
    │   │   └── VoiceButton.tsx
    │   ├── hooks/
    │   │   └── useAudioRecorder.ts
    │   ├── services/
    │   │   └── api.ts       # API calls
    │   └── types/
    │       └── chat.ts      # TypeScript types
    └── package.json
```

## API Documentation 📚

### POST /api/chat

Send a message and receive AI response.

**Request:**

```json
{
  "messages": [
    { "role": "user", "content": "Explain photosynthesis" },
    { "role": "assistant", "content": "Photosynthesis is..." }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "reply": "Photosynthesis is the process by which..."
}
```

### POST /api/transcribe

Convert audio to text.

**Request:**

- Content-Type: `multipart/form-data`
- Field: `audio` (audio file)

**Response:**

```json
{
  "success": true,
  "transcript": "What is photosynthesis?"
}
```

### GET /health

Check server status.

**Response:**

```json
{
  "status": "ok"
}
```

## Usage Guide 📖

### Text Chat

1. Type your question in the text input field
2. Press the send button (📤)
3. Wait for AI response
4. Continue the conversation

### Voice Input

1. Press and hold the microphone button (🎤)
2. Speak your question
3. Release the button to send
4. Audio is transcribed and sent automatically

### Listen to Messages

1. Long-press any message bubble
2. The text will be read aloud
3. Useful for pronunciation or hands-free learning

## Troubleshooting 🔧

### Backend won't start

- Check if port 3000 is already in use
- Verify `.env` file exists with valid API key
- Run `npm install` again

### App can't connect to backend

- Ensure backend is running (`npm run dev`)
- Check API_BASE_URL matches your computer's IP
- Verify both devices are on same Wi-Fi network
- Try accessing `http://YOUR_IP:3000/health` in phone browser

### "API key not valid" error

- Verify Gemini API is enabled in Google Cloud Console
- Regenerate API key at [aistudio.google.com](https://aistudio.google.com)
- Check for extra spaces in `.env` file
- Make sure no quotes around the API key

### Audio recording not working

- Grant microphone permissions when prompted
- Check `app.json` has `expo-av` plugin configured
- Try running `npx expo prebuild --clean`

### Rate limit errors

- Wait a few minutes before trying again
- Free tier has usage limits (60 requests/minute)
- Consider using a different Gemini model

## Development Tips 💡

- Use `npm run dev` (with nodemon) for auto-restart on backend changes
- Expo provides hot-reload for frontend - changes appear instantly
- Check backend terminal logs for API errors
- Use React Native Debugger for frontend debugging
- Test on real device for better performance

## Future Improvements 🚀

- [ ] Add conversation history persistence
- [ ] Support multiple languages
- [ ] Add user authentication
- [ ] Implement topic categories
- [ ] Add code syntax highlighting for programming questions
- [ ] Support image uploads for visual learning
- [ ] Add quiz/assessment features
- [ ] Deploy backend to cloud (Heroku, Railway, etc.)

## Contributing 🤝

Feel free to fork this project and submit pull requests for improvements!

## License 📄

This project is created for educational purposes.

## Support 💬

If you encounter issues:

1. Check the troubleshooting section above
2. Review backend terminal logs for errors
3. Verify all installation steps were completed
4. Ensure API keys are valid and properly configured

---

Built with ❤️ using React Native and Google Gemini AI
