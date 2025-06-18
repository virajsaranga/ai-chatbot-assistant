# 🤖 AI Chatbot Assistant

A simple AI-powered chatbot built with **React** (frontend) and **Node.js/Express** (backend), integrating with the **Gemini API** (Google) for real-time conversation. OpenAI is supported as an optional fallback.

---

## 🎯 Project Overview

This project is a full-stack web application where users can chat with an AI assistant via a clean, responsive, and modern UI. It uses the **Gemini API** to generate responses and can optionally fall back to **OpenAI API** in case of quota issues.

---



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


🖥️ Tech Stack
Frontend: React + Vanilla CSS

Backend: Node.js + Express

AI API: Google Gemini API (with optional OpenAI fallback)