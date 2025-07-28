// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory history store (for demo only — not suitable for production)
let conversationHistory = [];

// Optional: Persona prompt templates
const systemPrompts = {
  default: "You're a helpful assistant.",
  friendly: "You're a cheerful and friendly chatbot who loves casual conversation.",
  expert: "You are a professional AI assistant that provides detailed and accurate answers.",
  coder: "You're a coding assistant. Answer with code samples when needed."
};

router.post('/', async (req, res) => {
  const { message, mode } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    // Build the message content with context
    const messages = [];

    // Add system instruction (based on selected mode)
    messages.push({ role: "user", parts: [{ text: systemPrompts[mode] || systemPrompts.default }] });

    // Include previous messages
    for (const msg of conversationHistory) {
      messages.push({
        role: msg.sender === 'user' ? "user" : "model",
        parts: [{ text: msg.text }]
      });
    }

    // Add the current user message
    messages.push({
      role: "user",
      parts: [{ text: message }]
    });

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

    const result = await model.generateContent({ contents: messages });
    const reply = result.response.text();


    conversationHistory.push({ sender: 'user', text: message });
    conversationHistory.push({ sender: 'bot', text: reply });

    // Limit history to last 10 exchanges
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    res.json({ reply });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'AI response failed. Try again later.' });
  }
});

module.exports = router;

