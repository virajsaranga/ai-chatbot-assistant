🎯 Project Overview
A simple AI chatbot powered by Gemini (with OpenAI fallback), allowing real-time conversation in a clean web interface using React and Node.js.


⚙️ Setup Instructions

# 1. Clone the repo
git clone https://github.com/virajsaranga/ai-chatbot-assistant.git
cd ai-chatbot-assistant

# 2. Setup backend
cd backend
npm install


# 3. Setup frontend
cd ../frontend
npm install
npm start
🔐 Environment Variables (.env)


# In backend/.env
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key (optional fallback)


🔌 API Endpoint

POST /api/chat
Request Body: { "message": "your input" }
Response: { "reply": "AI's response" }
⚠️ Assumptions & Limitations
Gemini free tier has daily limits; OpenAI fallback is optional.

No database is used; all messages are stored in frontend state only.

Meant for educational/demo purposes only.