const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: message }] }]
    });

    const response = result.response.text();
    res.json({ reply: response });

  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

module.exports = router;
