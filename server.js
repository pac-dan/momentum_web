require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Email Configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Contact Form API endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  // Validation
  if (!name || !email || !service) {
    return res.status(400).json({ 
      success: false, 
      error: 'Please fill in all required fields.' 
    });
  }

  // Email content
  const mailOptions = {
    from: `"Momentum Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `New Contact Form Submission - ${service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Service Interested In:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
      <hr>
      <p><small>Submitted from Momentum Digital website</small></p>
    `,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
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

// Handle all other routes by serving index.html (for SPA routing if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Momentum Digital website is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
