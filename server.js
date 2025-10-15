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
  const { name, email, phone, service, message } = req.body || {};

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  // Check environment variables
  const { EMAIL_USER, EMAIL_PASSWORD, EMAIL_TO } = process.env;
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error("Missing EMAIL_USER or EMAIL_PASSWORD env vars");
    return res.status(500).json({ ok: false, message: "Email not configured" });
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  });

  // Verify SMTP connection
  try {
    await transporter.verify();
  } catch (err) {
    console.error("SMTP verify failed:", err.response || err);
    return res.status(500).json({ 
      ok: false, 
      message: "SMTP verify failed", 
      detail: err.response || err.message 
    });
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `"Momentum Website" <${EMAIL_USER}>`,
      to: EMAIL_TO || EMAIL_USER,
      replyTo: email,
      subject: `New website inquiry${service ? ' — ' + service : ''}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone || '-'}</p><p><b>Service:</b> ${service || '-'}</p><p><b>Message:</b><br>${(message || '').replace(/\n/g, '<br>')}</p>`
    });

    return res.status(200).json({ ok: true, message: "Email sent" });
  } catch (err) {
    console.error("Email send failed:", err.response || err);
    return res.status(500).json({ 
      ok: false, 
      message: "Failed to send email", 
      detail: err.response || err.message 
    });
  }
});

// VAPI Configuration API endpoint
app.get('/api/vapi-config', (req, res) => {
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-store');
  
  // Check if VAPI environment variables are set
  const publicKey = process.env.VAPI_PUBLIC_KEY;
  const assistantId = process.env.VAPI_ASSISTANT_ID;
  
  console.log('VAPI Config Request - Public Key exists:', !!publicKey, 'Assistant ID exists:', !!assistantId);
  
  if (!publicKey || !assistantId) {
    console.error('Missing VAPI environment variables:', {
      hasPublicKey: !!publicKey,
      hasAssistantId: !!assistantId
    });
    return res.status(500).json({
      error: 'VAPI configuration not available',
      hasPublicKey: !!publicKey,
      hasAssistantId: !!assistantId
    });
  }
  
  // Return VAPI configuration
  res.json({
    publicKey: publicKey,
    assistantId: assistantId
  });
});

// Test endpoint to verify static file serving
app.get('/api/test-media', (req, res) => {
  const fs = require('fs');
  const mediaDir = path.join(__dirname, 'media');
  
  try {
    const files = fs.readdirSync(mediaDir);
    res.json({
      success: true,
      mediaFiles: files,
      mediaPath: mediaDir
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Serve static files AFTER API routes
app.use(express.static(__dirname, {
  setHeaders: (res, path) => {
    // Set proper headers for media files
    if (path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.png') || path.endsWith('.gif')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for images
    }
  }
}));

// Handle all other routes by serving index.html (for SPA routing if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Momentum Digital website is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
