require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - JSON parsing enabled once
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Contact Form API endpoint - BEFORE static files
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: "Missing required fields (name, email, message)." });
    }

    // Env guardrails
    const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_TO } = process.env;
    if (!EMAIL_USER || !EMAIL_PASSWORD) {
      console.error("Missing EMAIL_USER or EMAIL_PASSWORD env vars");
      return res.status(500).json({ ok: false, message: "Email not configured on server." });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
    });

    // Optional connectivity check
    await transporter.verify();

    await transporter.sendMail({
      from: `"Momentum Website" <${EMAIL_USER}>`,
      to: EMAIL_TO || EMAIL_USER,
      replyTo: email,
      subject: `New website inquiry${service ? ` — ${service}` : ""}`,
      html: `
        <h3>New Lead</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Service:</b> ${service || "-"}</p>
        <p><b>Message:</b><br>${(message || "").replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ ok: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Contact API error:", err?.response || err);
    const detail = err?.response?.toString?.() || err?.message || "Unknown error";
    return res.status(500).json({ ok: false, message: "Failed to send email", detail });
  }
});

// VAPI Configuration API endpoint
app.get('/api/vapi-config', (req, res) => {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-store');
  
  // Return VAPI configuration
  res.json({
    publicKey: process.env.VAPI_PUBLIC_KEY,
    assistantId: process.env.VAPI_ASSISTANT_ID
  });
});

// Serve static files AFTER API routes
app.use(express.static(__dirname));

// Handle all other routes by serving index.html (for SPA routing if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Momentum Digital website is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
