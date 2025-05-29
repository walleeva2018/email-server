// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;