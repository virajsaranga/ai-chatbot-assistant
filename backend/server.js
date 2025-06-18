// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// ✅ Use your actual GEMINI_API_KEY in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use the lighter model (helps avoid quota issues)
const MODEL_NAME = 'gemini-1.5-flash-latest'; // Flash uses fewer resources

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: userMessage }] }]
    });

    const text = result.response.text();
    res.json({ response: text });

  } catch (error) {
    // ⛔ Handle quota exceeded separately
    if (error.status === 429) {
      return res.status(429).json({
        error: 'Quota exceeded. Please wait and try again later, or upgrade your plan.',
        link: 'https://ai.google.dev/gemini-api/docs/rate-limits'
      });
    }

    console.error('Error from Gemini:', error);
    res.status(500).json({ error: 'Something went wrong on the server' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
